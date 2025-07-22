import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { Sinistro_Service } from './sinistro.service';
import { Sinistro_Dto } from './sinistrodto';
import { sinistro } from './sinistro.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesInterceptor } from 'src/autenticacao/regra.interceptor';
import { Roles } from 'src/autenticacao/regra.decorator';
import { Regras_Perfil } from 'src/constantes';
import { get } from 'mongoose';
import { EmailService } from 'src/email/email.service';


@Controller("sinistro")
export class Sinistro_Controller {
  constructor(private readonly appService: Sinistro_Service, private readonly emailservice: EmailService) { }

  @Post("/")
  async create(@Body() createsinistrodto: Sinistro_Dto): Promise<string> {
    return this.appService.create(createsinistrodto)
  }
  @Get("findAll")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(RolesInterceptor)
 @Roles(Regras_Perfil.admin,Regras_Perfil.operador)
  async findALL(): Promise<sinistro[]> {
    return this.appService.findAll()
  }
  @Get("find/:id")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(RolesInterceptor)
 @Roles(Regras_Perfil.admin,Regras_Perfil.operador)
  async findOne(@Param("id") id: string): Promise<sinistro | null> {
    return this.appService.find(id)
  }
  @Get("/ultimosmeses")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(RolesInterceptor)
  @Roles(Regras_Perfil.admin,Regras_Perfil.operador)
  async findvencimento(): Promise<sinistro[]> {
    return this.appService.find6meses()
  }
  @Get("teste")
  async teste(): Promise<string> {
    return this.emailservice.sendMail("","","")
  }
}



