import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { Constantes } from "src/constantes";
import { Autenticacao_Service } from "./autenticacao.service";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./jwt.strategy";
import { Usuario_Service } from "src/usuario/usuario.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Usuario_Schema } from "src/usuario/usuario.schema";
import { Usuario_Controller } from "src/usuario/usuario.controller";
import { Usuario_Module } from "src/usuario/usuario.module";
import { ComunicacaoModule } from "src/comunicacao/comunicacao.module";
import { Autenticacao_Controller } from "./autenticacao.controller";
import { AuditoriaModule } from "src/auditoria/auditoria.module";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || '',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    Usuario_Module,
    ComunicacaoModule,
    AuditoriaModule
  ],
  controllers: [Autenticacao_Controller],
  providers: [JwtStrategy, Autenticacao_Service],
  exports: [Autenticacao_Service],
})
export class Autenticacao_Module {}