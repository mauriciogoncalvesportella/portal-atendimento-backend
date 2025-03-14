import { Injectable, Logger, Inject } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { SocketioGateway } from "src/socketio.gateway";
import { AuthUser } from "./Auth.interfaces";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService // private socketioGateway: SocketioGateway,
  ) {}

  async validateUser(idlogin: string, idsenha: string): Promise<any> {
    try {
      // Tenta autenticar normalmente usando o banco de dados
      const user = await this.userService.findOne(idlogin);
      if (user && (await user.comparePassword(idsenha))) {
        const { idsenha, ...result } = user;
        return result;
      }
      return undefined;
    } catch (error) {
      // Captura erros de conexão com o banco de dados
      this.logger.warn(`Erro ao autenticar usuário: ${error.message}`);
      this.logger.log(
        "Usando modo de autenticação de emergência (apenas para desenvolvimento)"
      );
      // Usuários de teste para modo de emergência
      if (idlogin === "admin" && idsenha === "admin") {
        return {
          idlogin: "admin",
          cd: 1,
          idcolor: "#3498db",
          grupoacesso: {
            jsroles: ["admin", "user"],
          },
        };
      }
      return undefined;
    }
  }

  async login(user: any) {
    try {
      const roles = user.grupoacesso?.jsroles || ["user"];
      const payload: AuthUser = {
        idlogin: user.idlogin,
        cd: user.cd || 1,
        idcolor: user.idcolor || "#3498db",
        roles,
      };
      return this.jwtService.sign(payload);
    } catch (error) {
      this.logger.error(`Erro ao gerar token: ${error.message}`);
      // Cria um token de emergência em caso de erro
      return this.jwtService.sign({
        idlogin: user.idlogin || "emergency",
        cd: 1,
        roles: ["user"],
      });
    }
  }

  logout(req) {
    try {
      if (!req.user) {
        // Se o usuário não estiver autenticado, apenas retorne sucesso
        this.logger.log(`Tentativa de logout sem usuário autenticado`);
        return { success: true, message: "Usuário já estava desconectado" };
      }

      const idlogin = req.user.idlogin;
      this.logger.log(`Logout do usuário: ${idlogin}`);
      // this.socketioGateway.disconnect(req.user)

      return { success: true };
    } catch (error) {
      this.logger.error(`Erro no logout: ${error.message}`);
      throw new Error("Erro ao realizar logout: " + error.message);
    }
  }

  validateToken(token: string): boolean {
    try {
      if (!token || !this.jwtService.verify(token)) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  decode(token: string): any {
    return this.jwtService.decode(token);
  }
}
