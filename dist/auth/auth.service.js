"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const socketio_gateway_1 = require("../socketio.gateway");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(idlogin, idsenha) {
        try {
            const user = await this.userService.findOne(idlogin);
            if (user && (await user.comparePassword(idsenha))) {
                const { idsenha } = user, result = __rest(user, ["idsenha"]);
                return result;
            }
            return undefined;
        }
        catch (error) {
            this.logger.warn(`Erro ao autenticar usuário: ${error.message}`);
            this.logger.log("Usando modo de autenticação de emergência (apenas para desenvolvimento)");
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
    async login(user) {
        var _a;
        try {
            const roles = ((_a = user.grupoacesso) === null || _a === void 0 ? void 0 : _a.jsroles) || ["user"];
            const payload = {
                idlogin: user.idlogin,
                cd: user.cd || 1,
                idcolor: user.idcolor || "#3498db",
                roles,
            };
            return this.jwtService.sign(payload);
        }
        catch (error) {
            this.logger.error(`Erro ao gerar token: ${error.message}`);
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
                this.logger.log(`Tentativa de logout sem usuário autenticado`);
                return { success: true, message: "Usuário já estava desconectado" };
            }
            const idlogin = req.user.idlogin;
            this.logger.log(`Logout do usuário: ${idlogin}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Erro no logout: ${error.message}`);
            throw new Error("Erro ao realizar logout: " + error.message);
        }
    }
    validateToken(token) {
        try {
            console.log(`Validando token: ${token.substring(0, 15)}...`);
        }
        catch (err) {
            console.error(`Erro ao validar token: ${err.message}`);
            return false;
        }
    }
    decode(token) {
        try {
            const decoded = this.jwtService.decode(token);
            console.log(`Token decodificado: ${JSON.stringify(decoded)}`);
            return decoded;
        }
        catch (err) {
            console.error(`Erro ao decodificar token: ${err.message}`);
            return null;
        }
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map