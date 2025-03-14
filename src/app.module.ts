import { APP_INTERCEPTOR, APP_GUARD } from "@nestjs/core";
import {
  Module,
  MiddlewareConsumer,
  NestModule,
  NestMiddleware,
  Logger,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogginInterceptor } from "./shared/logging.interceptor";
import { AuthModule } from "./auth/auth.module";
import { ChaveModule } from "./chave/chave.module";
import { ConfigModule } from "@nestjs/config";
import { AtendimentoModule } from "./atendimento/atendimento.module";
import { MonitorModule } from "./monitor/monitor.module";
import { TableModule } from "./table/table.module";
import { TicketModule } from "./ticket/ticket.module";
import { AgendaModule } from "./agenda/agenda.module";
import * as fs from "fs";
import * as path from "path";
import { CadastroSubscriber } from "./shared/cadastro.subscriber";
import { FilesModule } from "./files/files.module";
import { FilaEsperaModule } from "./fila-espera/fila-espera.module";
import { WebsocketModule } from "./websocket/websocket.module";
import { VersionControlMiddleware } from "./shared/version-control.middleware";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const dbUrl = process.env.DB_URL;
        // Verificar se é uma conexão local
        const isLocalDatabase =
          dbUrl.includes("localhost") || dbUrl.includes("127.0.0.1");

        try {
          return {
            type: "postgres" as const,
            url: dbUrl,
            // Se for banco local, desativa SSL completamente
            ssl: isLocalDatabase
              ? false
              : {
                  ca: fs.readFileSync(
                    path.join(__dirname, "ca-certificate.crt")
                  ),
                  rejectUnauthorized: true,
                },
            entities: [__dirname + "/dist/../**/**.entity{.ts,.js}"],
            synchronize: true,
            logging: ["error"],
            connectTimeoutMS: 5000,
            retryAttempts: 3,
            retryDelay: 1000,
          };
        } catch (error) {
          console.error(
            "Erro na configuração do banco de dados:",
            error.message
          );
          console.log(
            "🔧 Continuando com modo de desenvolvimento limitado sem banco de dados 🔧"
          );

          return {
            type: "postgres" as const,
            dropSchema: false,
            synchronize: false,
            logging: false,
            entities: [__dirname + "/dist/../**/**.entity{.ts,.js}"],
            keepConnectionAlive: true,
            ssl: false,
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "test",
          };
        }
      },
    }),
    ServeStaticModule.forRoot({
      serveRoot: "/api/static-images",
      rootPath: process.env.PROD
        ? join(__dirname, "anexos", "images")
        : join(__dirname, "..", "anexos", "images"),
    }),
    AuthModule,
    ChaveModule,
    AtendimentoModule,
    MonitorModule,
    TableModule,
    TicketModule,
    AgendaModule,
    FilesModule,
    FilaEsperaModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogginInterceptor,
    },
    CadastroSubscriber,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VersionControlMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
