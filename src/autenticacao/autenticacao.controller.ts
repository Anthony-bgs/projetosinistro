import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { Autenticacao_Service } from './autenticacao.service';

@Controller('autenticacao')
export class Autenticacao_Controller {
  constructor(private autenticacao_service: Autenticacao_Service) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const user = await this.autenticacao_service.validateUser(body.email, body.senha);
    return this.autenticacao_service.login(user);
  }
}