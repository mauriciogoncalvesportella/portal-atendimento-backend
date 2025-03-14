import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  Get,
  Logger,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Req() req, @Res() res) {
    const token = await this.authService.login(req.user);
    const cookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${
      process.env.EXPIRATION_TIME
    }; ${!process.env.PROD ? "SameSite=None; Secure" : ""}`;
    res.setHeader("Set-Cookie", cookie);
    return res.send({ token });
  }

  // @UseGuards(JwtAuthGuard)
  @Get("logout")
  async logout(@Req() req, @Res() res: Response) {
    try {
      // Passa o req completo para o service em vez de apenas req.user
      const result = await this.authService.logout(req);
      res.clearCookie("Authentication");
      return res.status(200).json(result);
    } catch (error) {
      this.logger.error("Erro no controller de logout:", error);
      return res.status(500).json({
        message: "Erro ao realizar logout",
        error: error.message,
      });
    }
  }
}
