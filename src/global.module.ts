import { Module } from '@nestjs/common';
import { Usuario_Module } from './usuario/usuario.module';
import { Autenticacao_Module } from './autenticacao/autenticacao.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Sinistro_Module } from './sinistro/sinistro.module';
import { DocumentosModule } from './documentos/documentos.module';
import { AdminAuthModule } from './admin_test/admin-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || ""),
    Usuario_Module, Autenticacao_Module, Sinistro_Module,DocumentosModule,AdminAuthModule
  ],
  controllers: [],
  providers: [],
})
export class Global_Module { }