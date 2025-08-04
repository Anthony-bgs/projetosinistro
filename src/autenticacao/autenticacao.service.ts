import { EmailService } from 'src/comunicacao/email.service';
// Armazenamento temporário dos códigos 2FA (em memória)
const codigos2FA: { [email: string]: { codigo: string, expira: number } } = {};
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Constantes, Mensagens_Constantes } from 'src/constantes';
import { Usuario_Service } from 'src/usuario/usuario.service';
import { AuditoriaService } from 'src/auditoria/auditoria.service';

@Injectable()
export class Autenticacao_Service {
    constructor(
        private readonly usuario_service: Usuario_Service,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
        private readonly auditoriaService: AuditoriaService,
    ) { }

    async login(user: any) {
        const usuario = {  sub: user.userId,
        email: user.email,
        perfil: user.perfil,
        };
        return {
            access_token: this.jwtService.sign(usuario),
        };
    }

    // Método único para enviar código 2FA (usado tanto no login quanto na criação)
    async enviarCodigo2FA(usuario: any, acao: 'login' | 'criacao') {
        const email = usuario.email;
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        codigos2FA[email] = { codigo, expira: Date.now() + 5 * 60 * 1000 };
        await this.emailService.sendMail(
            email,
            'Código de verificação 2FA',
            `Seu código de verificação é: ${codigo}`
        );
        await this.auditoriaService.registrar(email, `${acao}_2fa_enviado`, `autenticacao/${acao}`, { perfil: usuario.perfil });
        return { userId: usuario._id, email: usuario.email, perfil: usuario.perfil, twoFactorRequired: true };
    }

    // Login chama o método único de envio de código 2FA
    async validateUser(email: string, senha: string): Promise<any> {
        const usuario = await this.usuario_service.findlogin(email, senha);
        if (!usuario) {
            await this.auditoriaService.registrar(email, 'tentativa_login_falha', 'autenticacao/login', { motivo: 'Usuário ou senha inválidos' });
            throw new UnauthorizedException(Mensagens_Constantes.usuario_erro_login);
        }
        return this.enviarCodigo2FA(usuario, 'login');
    }

    // Endpoint para validar o código 2FA
    async validarCodigo2FA(email: string, codigo: string): Promise<any> {
        const registro = codigos2FA[email];
        if (!registro || registro.codigo !== codigo || Date.now() > registro.expira) {
            await this.auditoriaService.registrar(email, 'login_2fa_falha', 'autenticacao/validar', { motivo: 'Código inválido ou expirado' });
            throw new UnauthorizedException('Código 2FA inválido ou expirado');
        }
        // Código válido, remove da memória
        delete codigos2FA[email];
        // Retorna dados do usuário para login
        const usuario = await this.usuario_service.findemail(email);
        if (!usuario) {
            await this.auditoriaService.registrar(email, 'login_2fa_falha', 'autenticacao/validar', { motivo: 'Usuário não encontrado' });
            throw new UnauthorizedException('Usuário não encontrado');
        }
        await this.auditoriaService.registrar(email, 'login_2fa_sucesso', 'autenticacao/validar', { perfil: usuario.perfil });
        return { userId: usuario._id, email: usuario.email, perfil: usuario.perfil };
    }
    }