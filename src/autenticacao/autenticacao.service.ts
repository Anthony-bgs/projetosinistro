import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Constantes, Mensagens_Constantes } from 'src/constantes';
import { Usuario_Service } from 'src/usuario/usuario.service';

@Injectable()
export class Autenticacao_Service {
    constructor(
        private readonly usuario_service: Usuario_Service,
        private readonly jwtService: JwtService,
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
        const usuario = await this.usuario_service.findlogin(email)
       
        if (usuario !== null && (email === usuario.email && senha === usuario.senha)) {
            return { userId: usuario._id, email: usuario.email, perfil: usuario.perfil  };
        }

        throw new UnauthorizedException(Mensagens_Constantes.usuario_erro_login)
    }
}