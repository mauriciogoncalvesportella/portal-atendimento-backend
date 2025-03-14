import { AuthService } from "./auth.service";
import { Response } from "express";
export declare class AuthController {
    private authService;
    private readonly logger;
    constructor(authService: AuthService);
    login(req: any, res: any): Promise<any>;
    logout(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
