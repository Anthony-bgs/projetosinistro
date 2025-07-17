import { Module } from '@nestjs/common';
import { Usuario_Module } from './usuario/usuario.module';
import { Autenticacao_Module } from './autenticacao/autenticacao.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { sinistro_module } from './sinistro/sinistro.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb+srv://anthony_test:ML2WAYi3HNUDRlQK@project-name-teste.mwouclu.mongodb.net/"),
    Usuario_Module, Autenticacao_Module, sinistro_module
  ],
  controllers: [],
  providers: [],
})
export class Global_Module { }