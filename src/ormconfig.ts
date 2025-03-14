import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";
import * as fs from "fs";

const env: any = dotenv.parse(fs.readFileSync(`.env`));

// Opção 1: Usando o certificado CA (recomendado para produção)
const config: ConnectionOptions = {
  type: "postgres",
  url: env.DB_URL,
  entities: [__dirname + "/dist/../**/**.entity{.ts,.js}"],
  synchronize: false,
  migrations: [__dirname + "/migrations/**/*{.ts, .js}"],
  cli: {
    migrationsDir: "src/migrations",
  },
  ssl: {
    ca: fs.readFileSync("ca-certificate.crt").toString(),
    rejectUnauthorized: true,
  },
};
