import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");

    // Configuração CORS
    app.enableCors({
      origin: "http://localhost:8080",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
      allowedHeaders: "Content-Type,Authorization,version-control,Accept",
    });

    await app.listen(process.env.PORT || 3000);
    console.log(
      `Aplicação rodando em: http://localhost:${process.env.PORT || 3000}`
    );
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
    process.exit(1); // Sair com erro em vez de tentar criar segunda instância
  }
}

bootstrap();
