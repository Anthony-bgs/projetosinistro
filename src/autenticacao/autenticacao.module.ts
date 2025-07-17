import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { Constantes, jwtConstants } from "src/constantes";
import { Autenticacao_Service } from "./autenticacao.service";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./jwt.strategy";
import { Usuario_Service } from "src/usuario/usuario.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Usuario_Schema } from "src/usuario/usuario.schema";
import { Usuario_Controller } from "src/usuario/usuario.controller";
import { Usuario_Module } from "src/usuario/usuario.module";
import { Autenticacao_Controller } from "./autenticacao.controller";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    Usuario_Module
  ],
  controllers: [Autenticacao_Controller],
  providers: [JwtStrategy, Autenticacao_Service],
  exports: [Autenticacao_Service],
})
export class Autenticacao_Module {}