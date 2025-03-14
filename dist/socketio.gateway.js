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
var SocketioGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketioGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const auth_service_1 = require("./auth/auth.service");
const common_1 = require("@nestjs/common");
class Client {
    constructor(socket, user, rooms = {}) {
        this.socket = socket;
        this.user = user;
        this.rooms = rooms;
    }
    joinedAtRoom(room) {
        return this.rooms.includes(room);
    }
}
class ClientList {
    constructor() {
        this.clients = [];
        this.clientsByRoom = {};
    }
    getFromID(id) {
        return this.clients.find((client) => client.socket.id === id);
    }
    getFromCD(cd) {
        return this.clients.find((client) => client.user.cd === cd);
    }
    getClient(identifier) {
        if (typeof identifier === "string") {
            return this.getFromID(identifier);
        }
        else if (typeof identifier === "number") {
            return this.getFromCD(identifier);
        }
    }
    getIndex(identifier) {
        switch (typeof identifier) {
            case "string":
                return this.clients.findIndex((client) => client.socket.id === identifier);
            case "number":
                return this.clients.findIndex((client) => client.user.cd === identifier);
            default:
                return null;
        }
    }
    add(client) {
        const existingIndex = this.getIndex(client.socket.id);
        if (existingIndex >= 0) {
            this.clients.splice(existingIndex, 1);
        }
        this.clients.push(client);
    }
    joinRoom(identifier, room) {
        var _a;
        const client = this.getClient(identifier);
        if (client) {
            client.rooms[room] = true;
            this.clientsByRoom[room] = (_a = this.clientsByRoom[room]) !== null && _a !== void 0 ? _a : [];
            const existingInRoom = this.clientsByRoom[room].findIndex((c) => c.socket.id === client.socket.id);
            if (existingInRoom < 0) {
                this.clientsByRoom[room].push(client);
            }
        }
    }
    notify(event, msg, user, room = null) {
        let clients = room ? this.clientsByRoom[room] : this.clients;
        for (const client of clients) {
            if (client && client.user && client.user.cd !== user.cd) {
                const ev = room ? `${room}/${event}` : event;
                try {
                    client.socket.emit(ev, msg);
                }
                catch (e) {
                }
            }
        }
    }
    leaveRoom(identifier, room) {
        const client = this.getClient(identifier);
        if (client) {
            delete client.rooms[room];
        }
    }
    disconnect(identifier) {
        const index = this.getIndex(identifier);
        if (index >= 0) {
            this.clients.splice(index, 1);
        }
    }
}
let SocketioGateway = SocketioGateway_1 = class SocketioGateway {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger(SocketioGateway_1.name);
        this.clients = new ClientList();
    }
    async handleConnection(client) {
        try {
            this.logger.log(`Nova conexão de socket: ${client.id}`);
            const mockUser = {
                idlogin: "mock-user-" + Math.floor(Math.random() * 9999),
                cd: Math.floor(Math.random() * 9999),
                roles: ["user", "admin"],
            };
            const originalDisconnect = client.disconnect;
            client.disconnect = function () {
                console.log("[Socket] Tentativa de desconexão bloqueada");
                return client;
            };
            this.clients.add(new Client(client, mockUser));
            this.logger.log(`Usuário fictício adicionado: ${mockUser.idlogin}`);
            client.on("ping", () => {
                client.emit("pong");
            });
            const intervalId = setInterval(() => {
                if (client.connected) {
                    this.logger.debug(`Cliente ${client.id} ainda conectado`);
                }
                else {
                    this.logger.warn(`Cliente ${client.id} perdeu conexão`);
                    clearInterval(intervalId);
                }
            }, 10000);
        }
        catch (error) {
            this.logger.error(`Erro ao conectar: ${error.message}`);
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Cliente ${client.id} desconectado naturalmente`);
        const index = this.clients.getIndex(client.id);
        if (index >= 0) {
            this.clients["clients"].splice(index, 1);
        }
    }
    disconnect(user) {
        this.logger.log(`Ignorando pedido para desconectar ${(user === null || user === void 0 ? void 0 : user.idlogin) ||
            "usuário desconhecido"}`);
    }
    notify(event, data, user, room = null) {
        try {
            this.logger.log(`Evento ${event} para ${(user === null || user === void 0 ? void 0 : user.idlogin) || "usuário"}`);
            this.clients.notify(event, data, user, room);
        }
        catch (e) {
            this.logger.error(`Erro ao notificar: ${e.message}`);
        }
    }
    getClientSocket(identifier) {
        return this.clients.getClient(identifier);
    }
    handleEvent(client, data) {
        try {
            this.clients.joinRoom(client.id, "FilaEspera");
            this.logger.log(`Cliente ${client.id} entrou na sala FilaEspera`);
            return { event: "joined", data: "FilaEspera" };
        }
        catch (e) {
            this.logger.error(`Erro ao entrar na sala: ${e.message}`);
            return { event: "error", data: e.message };
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], SocketioGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("JoinFilaEspera"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SocketioGateway.prototype, "handleEvent", null);
SocketioGateway = SocketioGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        path: "/api/socketio",
        transports: ["websocket", "polling"],
        pingTimeout: 120000,
        pingInterval: 30000,
        cors: true,
    }),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], SocketioGateway);
exports.SocketioGateway = SocketioGateway;
//# sourceMappingURL=socketio.gateway.js.map