"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_state_service_1 = require("./socket-state/socket-state.service");
let WebsocketGateway = class WebsocketGateway {
    constructor(socketStateService) {
        this.socketStateService = socketStateService;
    }
    handleConnection(socket) {
        try {
            if (!socket.auth || !socket.auth.idlogin) {
                common_1.Logger.warn(`[WebsocketGateway/handleConnection] Conexão sem ID de login`, socket.id);
                socket.disconnect(true);
                return;
            }
            common_1.Logger.log(`[WebsocketGateway/handleConnection] Usuário conectado: ${socket.auth.idlogin}`);
        }
        catch (error) {
            common_1.Logger.error(`[WebsocketGateway/handleConnection] Erro na conexão: ${error.message}`, error.stack);
        }
    }
    handleDisconnect(socket) {
        try {
            if (socket.auth && socket.auth.idlogin) {
                common_1.Logger.log(`[WebsocketGateway/handleDisconnect] Usuário desconectado: ${socket.auth.idlogin}`);
            }
        }
        catch (error) {
            common_1.Logger.error(`[WebsocketGateway/handleDisconnect] Erro na desconexão: ${error.message}`, error.stack);
        }
    }
    joinRoom(room, socket) {
        try {
            if (!room) {
                common_1.Logger.warn("[WebsocketGateway/joinRoom] Tentativa de entrar em sala sem nome");
                return;
            }
            if (!socket.auth || !socket.auth.idlogin) {
                common_1.Logger.warn("[WebsocketGateway/joinRoom] Tentativa de entrar em sala sem autenticação");
                return;
            }
            common_1.Logger.log(`[WebsocketGateway/joinRoom] ${room} ${socket.auth.idlogin}`);
            this.socketStateService.joinRoom(socket, room);
        }
        catch (error) {
            common_1.Logger.error(`[WebsocketGateway/joinRoom] Erro ao entrar na sala: ${error.message}`, error.stack);
        }
    }
    notifyUser(event, data, cduser) {
        var _a;
        try {
            if (!cduser) {
                common_1.Logger.warn("[WebsocketGateway/notifyUser] Tentativa de notificar usuário sem ID");
                return;
            }
            const sockets = (_a = this.socketStateService.getSocketsByCd(cduser)) !== null && _a !== void 0 ? _a : [];
            sockets.forEach((socket) => {
                socket.emit(event, data);
            });
        }
        catch (error) {
            common_1.Logger.error(`[WebsocketGateway/notifyUser] Erro ao notificar usuário: ${error.message}`, error.stack);
        }
    }
    notifyAll(event, data) {
        try {
            this.server.emit(event, data);
        }
        catch (error) {
            common_1.Logger.error(`[WebsocketGateway/notifyAll] Erro ao notificar todos: ${error.message}`, error.stack);
        }
    }
    notifyRoom(room, event, data, cduser) {
        try {
            if (!room || !event) {
                common_1.Logger.warn("[WebsocketGateway/notifyRoom] Tentativa de notificar sala sem nome ou evento");
                return;
            }
            event = `${room}/${event}`;
            const sockets = this.socketStateService.getByRoom(room);
            if (sockets === null || sockets === void 0 ? void 0 : sockets.length) {
                sockets.forEach((socket) => socket.emit(event, data));
            }
        }
        catch (error) {
            common_1.Logger.error(`[WebsocketGateway/notifyRoom] Erro ao notificar sala: ${error.message}`, error.stack);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], WebsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("JoinRoom"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "joinRoom", null);
WebsocketGateway = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        path: "/api/socketio",
        transports: ["websocket", "polling"],
    }),
    __metadata("design:paramtypes", [socket_state_service_1.SocketStateService])
], WebsocketGateway);
exports.WebsocketGateway = WebsocketGateway;
//# sourceMappingURL=websocket.gateway.js.map