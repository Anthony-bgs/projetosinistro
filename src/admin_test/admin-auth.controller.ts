import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin-test-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  // Endpoint para gerar QR code do Google Authenticator
  @Post('gerar-qrcode')
  async gerarQrCode(@Body() body: { email: string, senha: string }) {
    return this.adminAuthService.gerarQrCode(body.email, body.senha);
  }

  // Endpoint para login de admin com TOTP
  @Post('login')
  async loginAdmin(@Body() body: { email: string, senha: string, token2fa: string }) {
    return this.adminAuthService.loginAdmin(body.email, body.senha, body.token2fa);
  }
}
