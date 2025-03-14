import { Module, Global, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { AppModule } from "src/app.module";

export const jwtModule = JwtModule.registerAsync({
  useFactory: async () => ({
    secret: process.env.SECRET,
    signOptions: {
      expiresIn: `${process.env.EXPIRATION_TIME}s`,
    },
  }),
});

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: "local" }), // Adicione esta linha
    jwtModule,
    forwardRef(() => AppModule),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, jwtModule],
})
export class AuthModule {}
