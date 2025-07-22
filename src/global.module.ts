import { Module } from '@nestjs/common';
import { Usuario_Module } from './usuario/usuario.module';
import { Autenticacao_Module } from './autenticacao/autenticacao.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Sinistro_Module } from './sinistro/sinistro.module';
import { DocumentosModule } from './documentos/documentos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb+srv://anthony_test:ML2WAYi3HNUDRlQK@project-name-teste.mwouclu.mongodb.net/"),
    Usuario_Module, Autenticacao_Module, Sinistro_Module,DocumentosModule
  ],
  controllers: [],
  providers: [],
})
export class Global_Module { }