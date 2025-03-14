import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";
import { INestApplicationContext } from "@nestjs/common";

// Interface estendida para incluir todas as propriedades personalizadas
interface CustomServerOptions extends ServerOptions {
  connectTimeout?: number;
  allowEIO3?: boolean;
  pingTimeout?: number;
  pingInterval?: number;
  cors?: {
    origin?: string | string[];
    methods?: string[];
    credentials?: boolean;
  };
}

export class CustomWebSocketAdapter extends IoAdapter {
  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: CustomServerOptions): any {
    // Forçar configurações que impedem desconexões
    const customOptions: CustomServerOptions = {
      ...options,
      pingTimeout: 600000, // 10 minutos
      pingInterval: 30000,
      connectTimeout: 300000, // 5 minutos
      allowEIO3: true,
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      },
    };

    // Criar servidor com opções customizadas
    const server = super.createIOServer(port, customOptions);

    // Interceptar comportamento padrão
    const originalHandleConnection = server.engine.handleConnection.bind(
      server.engine
    );
    server.engine.handleConnection = function(conn, req) {
      console.log("[WebSocketAdapter] Nova conexão interceptada:", conn.id);
      return originalHandleConnection(conn, req);
    };

    // Impedir desconexões automáticas
    const originalClose = server.engine.close.bind(server.engine);
    server.engine.close = function(reason) {
      console.log(
        "[WebSocketAdapter] Tentativa de fechamento bloqueada:",
        reason
      );
      // Não chamar originalClose para evitar desconexões
    };

    return server;
  }
}
