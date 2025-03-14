"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWebSocketAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class CustomWebSocketAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app) {
        super(app);
        this.app = app;
    }
    createIOServer(port, options) {
        const customOptions = Object.assign(Object.assign({}, options), { pingTimeout: 600000, pingInterval: 30000, connectTimeout: 300000, allowEIO3: true, cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                credentials: true,
            } });
        const server = super.createIOServer(port, customOptions);
        const originalHandleConnection = server.engine.handleConnection.bind(server.engine);
        server.engine.handleConnection = function (conn, req) {
            console.log("[WebSocketAdapter] Nova conexão interceptada:", conn.id);
            return originalHandleConnection(conn, req);
        };
        const originalClose = server.engine.close.bind(server.engine);
        server.engine.close = function (reason) {
            console.log("[WebSocketAdapter] Tentativa de fechamento bloqueada:", reason);
        };
        return server;
    }
}
exports.CustomWebSocketAdapter = CustomWebSocketAdapter;
//# sourceMappingURL=websocket.adapter.js.map