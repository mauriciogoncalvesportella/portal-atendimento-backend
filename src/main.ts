import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Configuração de prefixo global para rotas
    app.setGlobalPrefix("api");

    // Configuração de validação global
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    );

    // Configuração CORS mais abrangente
    app.enableCors({
      origin: [
        "http://localhost:8080",
        "https://localhost:8080",
        "http://127.0.0.1:8080",
        "https://127.0.0.1:8080",
        /^http(s)?:\/\/(.*\.)?localhost(:\d+)?$/,
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With",
        "version-control",
      ],
    });

    await app.listen(process.env.PORT || 3000);
    console.log(
      `Aplicação rodando em: http://localhost:${process.env.PORT || 3000}`
    );
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
    process.exit(1);
  }
}

bootstrap();
