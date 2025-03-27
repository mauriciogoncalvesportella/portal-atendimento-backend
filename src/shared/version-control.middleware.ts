import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class VersionControlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers["authorization"] === process.env.TOKEN) {
      return next();
    }

    res.setHeader("Access-Control-Expose-Headers", "version-control");
    res.setHeader("version-control", process.env.VERSION);

    const byPassUrl = ["3cx", "auth", "commerce", "files", "image", "atividades"];

    const byPass = byPassUrl.some((url) => req.baseUrl.includes(url));

    if (req.headers["version-control"] === process.env.VERSION || byPass) {
      return next();
    }

    return res.status(426).send("Nova versão disponível!");
  }
}
