"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs = require("fs");
const env = dotenv.parse(fs.readFileSync(`.env`));
const config = {
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
//# sourceMappingURL=ormconfig.js.map