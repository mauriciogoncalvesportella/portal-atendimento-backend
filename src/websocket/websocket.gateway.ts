import { Logger, Injectable } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { AuthenticatedSocket } from "./socket-state/socket-state.adapter";
import { SocketStateService } from "./socket-state/socket-state.service";
import { Server } from "socket.io";

@Injectable()
@WebSocketGateway({
  path: "/api/socketio",
  transports: ["websocket", "polling"],
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private socketStateService: SocketStateService) {}

  handleConnection(socket: AuthenticatedSocket) {
    try {
      // Verifica se o socket tem autenticação
      if (!socket.auth || !socket.auth.idlogin) {
        Logger.warn(
          `[WebsocketGateway/handleConnection] Conexão sem ID de login`,
          socket.id
        );
        socket.disconnect(true);
        return;
      }

      Logger.log(
        `[WebsocketGateway/handleConnection] Usuário conectado: ${socket.auth.idlogin}`
      );
    } catch (error) {
      Logger.error(
        `[WebsocketGateway/handleConnection] Erro na conexão: ${error.message}`,
        error.stack
      );
    }
  }

  handleDisconnect(socket: AuthenticatedSocket) {
    try {
      if (socket.auth && socket.auth.idlogin) {
        Logger.log(
          `[WebsocketGateway/handleDisconnect] Usuário desconectado: ${socket.auth.idlogin}`
        );
      }
    } catch (error) {
      Logger.error(
        `[WebsocketGateway/handleDisconnect] Erro na desconexão: ${error.message}`,
        error.stack
      );
    }
  }

  @SubscribeMessage("JoinRoom")
  joinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() socket: AuthenticatedSocket
  ) {
    try {
      // Verificações adicionais de segurança
      if (!room) {
        Logger.warn(
          "[WebsocketGateway/joinRoom] Tentativa de entrar em sala sem nome"
        );
        return;
      }

      if (!socket.auth || !socket.auth.idlogin) {
        Logger.warn(
          "[WebsocketGateway/joinRoom] Tentativa de entrar em sala sem autenticação"
        );
        return;
      }

      Logger.log(`[WebsocketGateway/joinRoom] ${room} ${socket.auth.idlogin}`);
      this.socketStateService.joinRoom(socket, room);
    } catch (error) {
      Logger.error(
        `[WebsocketGateway/joinRoom] Erro ao entrar na sala: ${error.message}`,
        error.stack
      );
    }
  }

  notifyUser(event: string, data: any, cduser: number) {
    try {
      if (!cduser) {
        Logger.warn(
          "[WebsocketGateway/notifyUser] Tentativa de notificar usuário sem ID"
        );
        return;
      }

      const sockets = this.socketStateService.getSocketsByCd(cduser) ?? [];
      sockets.forEach((socket) => {
        socket.emit(event, data);
      });
    } catch (error) {
      Logger.error(
        `[WebsocketGateway/notifyUser] Erro ao notificar usuário: ${error.message}`,
        error.stack
      );
    }
  }

  notifyAll(event: string, data: any) {
    try {
      this.server.emit(event, data);
    } catch (error) {
      Logger.error(
        `[WebsocketGateway/notifyAll] Erro ao notificar todos: ${error.message}`,
        error.stack
      );
    }
  }

  notifyRoom(room: string, event: string, data: any, cduser?: number) {
    try {
      if (!room || !event) {
        Logger.warn(
          "[WebsocketGateway/notifyRoom] Tentativa de notificar sala sem nome ou evento"
        );
        return;
      }

      event = `${room}/${event}`;
      const sockets = this.socketStateService.getByRoom(room);

      if (sockets?.length) {
        sockets.forEach((socket) => socket.emit(event, data));
      }
    } catch (error) {
      Logger.error(
        `[WebsocketGateway/notifyRoom] Erro ao notificar sala: ${error.message}`,
        error.stack
      );
    }
  }
}
