import { Injectable, UnauthorizedException, Logger } from "@nestjs/common";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super({
      usernameField: "username", // Corresponde ao campo de login
      passwordField: "password", // Corresponde ao campo de senha
    });
  }

  // Em src/auth/local.strategy.ts

  async validate(username: string, password: string): Promise<any> {
    this.logger.log(`Tentativa de login: ${username}`);

    // Bypass temporário - aceitar qualquer login com estas credenciais
    if (username === "admin" && password === "admin") {
      this.logger.log(`Login de emergência bem-sucedido para: ${username}`);
      return {
        idlogin: "admin",
        cd: 1,
        idcolor: "#3498db",
        grupoacesso: { jsroles: ["admin", "user"] },
      };
    }

    if (username === "programacao" && password === "123456") {
      this.logger.log(`Login de emergência bem-sucedido para: ${username}`);
      return {
        idlogin: "programacao",
        cd: 2,
        idcolor: "#2ecc71",
        grupoacesso: { jsroles: ["user"] },
      };
    }

    // Tentativa normal via AuthService (caso precise)
    try {
      const user = await this.authService.validateUser(username, password);
      if (user) {
        this.logger.log(`Login bem-sucedido para usuário: ${username}`);
        return user;
      }
    } catch (error) {
      this.logger.error(`Erro na validação: ${error.message}`);
    }

    this.logger.warn(`Login falhou para usuário: ${username}`);
    throw new UnauthorizedException("Credenciais inválidas"); // ADICIONE ESTA LINHA
  }
}
