import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, Request, BadRequestException } from '@nestjs/common';
import { Sinistro_Service } from './sinistro.service';
import { Sinistro_Dto } from './sinistrodto';
import { sinistro } from './sinistro.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesInterceptor } from 'src/autenticacao/regra.interceptor';
import { Roles } from 'src/autenticacao/regra.decorator';
import { Regras_Perfil, Status_Sinistro } from 'src/constantes';
import { get } from 'mongoose';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/comunicacao/email.service';


@Controller("sinistro")
export class Sinistro_Controller {
  constructor(
    private readonly appService: Sinistro_Service,
    private readonly emailservice: EmailService,
    private readonly configService: ConfigService
  ) {}

  @Post("/")
  async create(@Body() createsinistrodto: Sinistro_Dto): Promise<string> {
    return this.appService.create(createsinistrodto)
  }

  // Atualização segura do status do sinistro
  @Put('status/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(RolesInterceptor)
  @Roles(Regras_Perfil.admin, Regras_Perfil.operador)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: Status_Sinistro,
    @Body('timestamp') timestamp: string,
    @Request() req
  ): Promise<void> {
    const signature = req.headers['x-signature'] as string;
    const secret = this.configService.get<string>('HMAC_SECRET');
    const baseString = `${id}:${status}:${timestamp}`;
    const hash = crypto.createHmac('sha256', secret!).update(baseString).digest('hex');
    if (hash !== signature) {
      throw new BadRequestException('Assinatura digital inválida!');
    }
    // Validação extra: status permitido (Enum)
    // Se tiver Enum, valide aqui
    // Auditoria: pode salvar req.user.id, status anterior, timestamp
    await this.appService.updateStatus(id, status, req.user?.id);
    
  }
  @Get("findAll")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(RolesInterceptor)
  @Roles(Regras_Perfil.admin,Regras_Perfil.operador)
  async findALL(): Promise<sinistro[]> {
    return this.appService.findAll();
  }
  @Get("find/:id")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(RolesInterceptor)
  @Roles(Regras_Perfil.admin,Regras_Perfil.operador)
  async findOne(@Param("id") id: string): Promise<sinistro | null> {
    return this.appService.find(id);
  }
  @Get("/ultimosmeses")
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(RolesInterceptor)
  @Roles(Regras_Perfil.admin,Regras_Perfil.operador)
  async findvencimento(): Promise<sinistro[]> {
    return this.appService.find6meses();
  }
}



