"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.setGlobalPrefix("api");
        app.enableCors({
            origin: "http://localhost:8080",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            credentials: true,
            allowedHeaders: "Content-Type,Authorization,version-control,Accept",
        });
        await app.listen(process.env.PORT || 3000);
        console.log(`Aplicação rodando em: http://localhost:${process.env.PORT || 3000}`);
    }
    catch (error) {
        console.error("Erro ao iniciar a aplicação:", error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map