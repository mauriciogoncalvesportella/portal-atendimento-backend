import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";
import { INestApplicationContext } from "@nestjs/common";
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
export declare class CustomWebSocketAdapter extends IoAdapter {
    private app;
    constructor(app: INestApplicationContext);
    createIOServer(port: number, options?: CustomServerOptions): any;
}
export {};
