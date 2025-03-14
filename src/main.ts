// modificado, se precisar reverta
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");

    // Configuração CORS corrigida para permitir o header 'version-control'
    app.enableCors({
      origin: "http://localhost:8080", // Ou use true para permitir qualquer origem em desenvolvimento
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
    // Configuração de emergência
    const app = await NestFactory.create(AppModule, {
      logger: false,
      abortOnError: false,
    });
    app.setGlobalPrefix("api");

    // Mesmo para o modo de emergência, correção do CORS
    // app.enableCors({
    //   origin: "http://localhost:8080",
    //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    //   credentials: true,
    //   allowedHeaders: "Content-Type,Authorization,version-control,Accept",
    // });

    app.use(
      cors({
        origin: "http://localhost:8080", // ou qual URL seu frontend está usando
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "version-control,accept",
        ], // Adicione version-control aqui
      })
    );

    await app.listen(process.env.PORT || 3000);
    console.log(
      `Aplicação rodando em modo de emergência: http://localhost:${process.env
        .PORT || 3000}`
    );
  }
}
bootstrap();
function cors(arg0: {
  origin: string; // ou qual URL seu frontend está usando
  methods: string[];
  allowedHeaders: string[]; // Adicione version-control aqui
}): any {
  throw new Error("Function not implemented.");
}
