import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly logger;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(idlogin: string, idsenha: string): Promise<any>;
    login(user: any): Promise<string>;
    logout(req: any): {
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    };
    validateToken(token: string): boolean;
    decode(token: string): any;
}
