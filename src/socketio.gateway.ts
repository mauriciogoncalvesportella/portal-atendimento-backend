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
    this.clients.push(client);
  }

  joinRoom(identifier: string | number, room: string) {
    const client = this.getClient(identifier);
    if (client) {
      client.rooms[room] = true;
      this.clientsByRoom[room] = this.clientsByRoom[room] ?? [];
      this.clientsByRoom[room].push(client);
    }
  }

  notify(event: string, msg: any, user: any | null, room: string = null) {
    let clients: Client[] = room ? this.clientsByRoom[room] : this.clients;
    for (const client of clients) {
      if (client.user.cd !== user.cd) {
        const ev = room ? `${room}/${event}` : event;
        client.socket.emit(ev, msg);
      }
    }
  }

  leaveRoom(identifier: string | number, room: string) {
    const client = this.getClient(identifier);
    delete client.rooms[room];
  }

  disconnect(identifier: string | number) {
    const client = this.getClient(identifier);
    const index = this.getIndex(identifier);
    if (index >= 0 && client) {
      this.clients.splice(index, 1);
      client.socket.disconnect();
    }
  }
}

@WebSocketGateway({
  path: "/api/socketio",
  transports: ["websocket", "polling"],
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
      this.logger.log("Nova tentativa de conexão de socket");

      const token =
        client.handshake.headers.authorization?.split(" ")[1] ||
        client.handshake.auth?.token;

      this.logger.log(`Token recebido: ${token}`);

      if (!token) {
        this.logger.warn("Conexão rejeitada: Sem token");
        client.disconnect(true);
        return;
      }

      const isValidToken = this.authService.validateToken(token);

      if (!isValidToken) {
        this.logger.warn("Conexão rejeitada: Token inválido");
        client.disconnect(true);
        return;
      }

      const user = this.authService.decode(token);

      if (!user) {
        this.logger.warn("Conexão rejeitada: Usuário não encontrado");
        client.disconnect(true);
        return;
      }

      this.clients.add(new Client(client, user));

      this.logger.log(`Usuário ${user.idlogin} conectado ao socket`);
    } catch (error) {
      this.logger.error("Erro na conexão do socket", error);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    this.clients.disconnect(client.id);
    this.logger.log(`${client.id} desconectado`);
  }

  disconnect(user: any) {
    this.clients.disconnect(user.cd);
    this.logger.log(`${user.idlogin} forçado a desconectar`);
  }

  notify(event: string, data: any, user: any, room: string = null) {
    this.logger.log(`${event}, ${user.idlogin}`);
    this.clients.notify(event, data, user, room);
  }

  getClientSocket(identifier: number | string): Client {
    return this.clients.getClient(identifier);
  }

  @SubscribeMessage("JoinFilaEspera")
  handleEvent(@ConnectedSocket() client: Socket) {
    const { user } = this.clients.getClient(client.id);
    this.logger.log(`${user?.idlogin} entrou na sala FilaEspera`);
    this.clients.joinRoom(client.id, "FilaEspera");
  }
}
