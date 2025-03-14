import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { AuthenticatedSocket } from "./socket-state/socket-state.adapter";
import { SocketStateService } from "./socket-state/socket-state.service";
import { Server } from "socket.io";
export declare class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private socketStateService;
    server: Server;
    constructor(socketStateService: SocketStateService);
    handleConnection(socket: AuthenticatedSocket): void;
    handleDisconnect(socket: AuthenticatedSocket): void;
    joinRoom(room: string, socket: AuthenticatedSocket): void;
    notifyUser(event: string, data: any, cduser: number): void;
    notifyAll(event: string, data: any): void;
    notifyRoom(room: string, event: string, data: any, cduser?: number): void;
}
