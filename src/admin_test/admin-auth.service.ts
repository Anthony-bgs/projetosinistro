// Serviço de autenticação de admin com Google Authenticator (TOTP)
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

// Em produção, salve o secret no banco de dados!
const adminTotpSecrets: { [email: string]: string } = {};

@Injectable()
export class AdminAuthService {
  // Gera e retorna QR code para cadastro do Google Authenticator
  async gerarQrCode(email: string, senha: string): Promise<{ qrCode: string, secret: string }> {
    // Exige senha de admin para gerar QR code
    if (senha !== 'admin123') {
      throw new UnauthorizedException('Senha inválida para gerar QR code');
    }
    const secret = speakeasy.generateSecret({ name: 'SistemaSinistro-Admin-Teste' });
    adminTotpSecrets[email] = secret.base32;
    const qrCode = await qrcode.toDataURL(secret.otpauth_url);
    return { qrCode, secret: secret.base32 };
  }

  // Login de admin com verificação TOTP
  async loginAdmin(email: string, senha: string, token2fa: string): Promise<any> {
    // Simulação: senha fixa para teste
    if (senha !== 'admin123') {
      throw new UnauthorizedException('Senha inválida');
    }
    // Verifica se o admin tem secret cadastrado
    const secret = adminTotpSecrets[email];
    if (!secret) {
      throw new UnauthorizedException('Admin não possui 2FA cadastrado');
    }
    // Valida token TOTP
    const valido = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: token2fa
    });
    if (!valido) {
      throw new UnauthorizedException('Código 2FA inválido');
    }
    // Login OK
    return { mensagem: 'Login de admin com 2FA realizado com sucesso!' };
  }
}
