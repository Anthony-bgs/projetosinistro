import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { Autenticacao_Service } from './autenticacao.service';

@Controller('autenticacao')
export class Autenticacao_Controller {
  constructor(private autenticacao_service: Autenticacao_Service) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    // Primeiro passo: valida usuário e envia código 2FA
    // NÃO retorna o token, apenas info para o frontend pedir o código
    return await this.autenticacao_service.validateUser(body.email, body.senha);
  }

  // Endpoint para validar código 2FA no login
  @Post('validar')
  async validar2fa(@Body() body: { email: string, codigo: string }) {
    // Segundo passo: valida código e retorna token
    const user = await this.autenticacao_service.validarCodigo2FA(body.email, body.codigo);
    // Agora sim, gera e retorna o token JWT
    return this.autenticacao_service.login(user);
  }
}