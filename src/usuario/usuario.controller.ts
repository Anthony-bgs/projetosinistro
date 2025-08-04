import { Body, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { Usuario_Service } from "./usuario.service";
import { Usuario_Dto } from "./usuario.dto";
import { AuthGuard } from "@nestjs/passport";
import { RolesInterceptor } from "src/autenticacao/regra.interceptor";
import { Roles } from "src/autenticacao/regra.decorator";
import { Regras_Perfil } from "src/constantes";

@Controller("usuario")
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(RolesInterceptor)
export class Usuario_Controller {
  constructor(private readonly appService: Usuario_Service) {
  }
  @Post("/")
  @Roles(Regras_Perfil.admin)
  async create(@Body() createusuariodto: Usuario_Dto): Promise<any> {
    return this.appService.create(createusuariodto)
  }
}