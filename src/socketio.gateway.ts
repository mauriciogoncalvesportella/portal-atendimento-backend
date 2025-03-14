import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { AuthService } from "./auth/auth.service";
import { Server, Socket } from "socket.io";
import { Logger, Inject, forwardRef } from "@nestjs/common";

class Client {
  constructor(
    public socket: Socket,
    public user: any,
    public rooms: any = {}
  ) {}

  joinedAtRoom(room: string) {
    return this.rooms.includes(room);
  }
}

class ClientList {
  private clients: Array<Client> = [];
  private clientsByRoom: { [id: string]: Client[] } = {};

  private getFromID(id: string) {
    return this.clients.find((client) => client.socket.id === id);
  }

  private getFromCD(cd: number) {
    return this.clients.find((client) => client.user.cd === cd);
  }

  getClient(identifier: number | string) {
    if (typeof identifier === "string") {
      return this.getFromID(identifier);
    } else if (typeof identifier === "number") {
      return this.getFromCD(identifier);
    }
  }

  getIndex(identifier: number | string) {
    switch (typeof identifier) {
      case "string":
        return this.clients.findIndex(
          (client) => client.socket.id === identifier
        );
      case "number":
        return this.clients.findIndex(
          (client) => client.user.cd === identifier
        );
      default:
        return null;
    }
  }

  add(client: Client) {
    // Remove any existing client with same ID before adding
    const existingIndex = this.getIndex(client.socket.id);
    if (existingIndex >= 0) {
      this.clients.splice(existingIndex, 1);
    }
    this.clients.push(client);
  }

  joinRoom(identifier: string | number, room: string) {
    const client = this.getClient(identifier);
    if (client) {
      client.rooms[room] = true;
      this.clientsByRoom[room] = this.clientsByRoom[room] ?? [];

      // Avoid duplicates in room
      const existingInRoom = this.clientsByRoom[room].findIndex(
        (c) => c.socket.id === client.socket.id
      );
      if (existingInRoom < 0) {
        this.clientsByRoom[room].push(client);
      }
    }
  }

  notify(event: string, msg: any, user: any | null, room: string = null) {
    let clients: Client[] = room ? this.clientsByRoom[room] : this.clients;
    for (const client of clients) {
      if (client && client.user && client.user.cd !== user.cd) {
        const ev = room ? `${room}/${event}` : event;
        try {
          client.socket.emit(ev, msg);
        } catch (e) {
          // Ignore errors when trying to emit to disconnected sockets
        }
      }
    }
  }

  leaveRoom(identifier: string | number, room: string) {
    const client = this.getClient(identifier);
    if (client) {
      delete client.rooms[room];
    }
  }

  // IMPORTANTE: modificado para NÃO desconectar clientes
  disconnect(identifier: string | number) {
    const index = this.getIndex(identifier);
    if (index >= 0) {
      this.clients.splice(index, 1);
      // NOTA: Não desconectamos ativamente o cliente
    }
  }
}

@WebSocketGateway({
  path: "/api/socketio",
  transports: ["websocket", "polling"],
  pingTimeout: 120000, // 2 minutos
  pingInterval: 30000, // 30 segundos
  cors: true,
})
export class SocketioGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SocketioGateway.name);

  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  @WebSocketServer()
  private server: Server;
  private clients: ClientList = new ClientList();

  async handleConnection(client: Socket) {
    try {
      this.logger.log(`Nova conexão de socket: ${client.id}`);

      // Criar usuário fictício para cada conexão
      const mockUser = {
        idlogin: "mock-user-" + Math.floor(Math.random() * 9999),
        cd: Math.floor(Math.random() * 9999),
        roles: ["user", "admin"],
      };

      // Substituir método disconnect original para evitar desconexões automáticas
      const originalDisconnect = client.disconnect;
      client.disconnect = function() {
        console.log("[Socket] Tentativa de desconexão bloqueada");
        return client; // Não desconecta realmente
      };

      this.clients.add(new Client(client, mockUser));
      this.logger.log(`Usuário fictício adicionado: ${mockUser.idlogin}`);

      // Adicionar ao servidor a capacidade de responder a pings
      client.on("ping", () => {
        client.emit("pong");
      });

      // Monitorar conexão
      const intervalId = setInterval(() => {
        if (client.connected) {
          this.logger.debug(`Cliente ${client.id} ainda conectado`);
        } else {
          this.logger.warn(`Cliente ${client.id} perdeu conexão`);
          clearInterval(intervalId);
        }
      }, 10000);
    } catch (error) {
      this.logger.error(`Erro ao conectar: ${error.message}`);
      // Não desconectar mesmo em caso de erro
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente ${client.id} desconectado naturalmente`);
    // Remover da lista mas não desconectar ativamente
    const index = this.clients.getIndex(client.id);
    if (index >= 0) {
      this.clients["clients"].splice(index, 1);
    }
  }

  disconnect(user: any) {
    this.logger.log(
      `Ignorando pedido para desconectar ${user?.idlogin ||
        "usuário desconhecido"}`
    );
    // Não fazer nada - impedir desconexões ativas
  }

  notify(event: string, data: any, user: any, room: string = null) {
    try {
      this.logger.log(`Evento ${event} para ${user?.idlogin || "usuário"}`);
      this.clients.notify(event, data, user, room);
    } catch (e) {
      this.logger.error(`Erro ao notificar: ${e.message}`);
    }
  }

  getClientSocket(identifier: number | string): Client {
    return this.clients.getClient(identifier);
  }

  @SubscribeMessage("JoinFilaEspera")
  handleEvent(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    try {
      this.clients.joinRoom(client.id, "FilaEspera");
      this.logger.log(`Cliente ${client.id} entrou na sala FilaEspera`);
      return { event: "joined", data: "FilaEspera" };
    } catch (e) {
      this.logger.error(`Erro ao entrar na sala: ${e.message}`);
      return { event: "error", data: e.message };
    }
  }
}
