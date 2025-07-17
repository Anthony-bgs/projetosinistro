import { Module } from "@nestjs/common";
import { Usuario_Controller } from "./usuario.controller";
import { usuarioprovider } from "./usuario.provider";
import { Usuario_Service } from "./usuario.service";
import { DatabaseModule } from "src/database/db.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Usuario_Schema } from "./usuario.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Usuario', schema: Usuario_Schema }]),
  ],
  controllers: [Usuario_Controller],
  providers: [Usuario_Service],
  exports: [Usuario_Service, MongooseModule],
})
export class Usuario_Module {}