import { EmailService } from 'src/comunicacao/email.service';
// Armazenamento temporário dos códigos 2FA (em memória)
const codigos2FA: { [email: string]: { codigo: string, expira: number } } = {};
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Constantes, Mensagens_Constantes } from 'src/constantes';
import { Usuario_Service } from 'src/usuario/usuario.service';

@Injectable()
export class Autenticacao_Service {
    constructor(
        private readonly usuario_service: Usuario_Service,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
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

    async validateUser(email: string, senha: string): Promise<any> {
        console.log('[2FA] validateUser - email recebido:', email);
        const usuario = await this.usuario_service.findlogin(email, senha);
        if (!usuario) {
            console.log('[2FA] Usuário não encontrado ou senha inválida');
            throw new UnauthorizedException(Mensagens_Constantes.usuario_erro_login);
        }
        // Gera código 2FA
        const codigo = Math.floor(100000 + Math.random() * 900000).toString();
        codigos2FA[email] = { codigo, expira: Date.now() + 5 * 60 * 1000 };
        console.log('[2FA] Código gerado:', codigo, 'para email:', email);
        // Envia o código por e-mail
        await this.emailService.sendMail(
            usuario.email,
            'Código de verificação 2FA',
            `Seu código de verificação é: ${codigo}`
        );
        // Retorna info para o frontend pedir o código
        return { userId: usuario._id, email: usuario.email, perfil: usuario.perfil, twoFactorRequired: true };
    }

    // Endpoint para validar o código 2FA
    async validarCodigo2FA(email: string, codigo: string): Promise<any> {
        console.log('[2FA] validarCodigo2FA - email recebido:', email, 'código recebido:', codigo);
        const registro = codigos2FA[email];
        console.log('[2FA] Registro salvo:', registro);
        if (!registro || registro.codigo !== codigo || Date.now() > registro.expira) {
            console.log('[2FA] Código inválido ou expirado para email:', email);
            throw new UnauthorizedException('Código 2FA inválido ou expirado');
        }
        // Código válido, remove da memória
        delete codigos2FA[email];
        // Retorna dados do usuário para login
        const usuario = await this.usuario_service.findemail(email);
        if (!usuario) {
            console.log('[2FA] Usuário não encontrado ao validar 2FA:', email);
            throw new UnauthorizedException('Usuário não encontrado');
        }
        console.log('[2FA] Código validado com sucesso para email:', email);
        return { userId: usuario._id, email: usuario.email, perfil: usuario.perfil };
    }
    }