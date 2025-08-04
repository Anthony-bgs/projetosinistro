const bcrypt = require('bcryptjs');
import { EmailService } from 'src/comunicacao/email.service';
// Removido: Armazenamento temporário dos códigos 2FA
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Usuario } from './usuario.interface';
import { Constantes, Mensagens_Constantes, Status_Usuario } from 'src/constantes';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario_Dto } from './usuario.dto';


@Injectable()
export class Usuario_Service {
  constructor(
    @InjectModel("Usuario") private readonly usuario_model: Model<Usuario>,
    private readonly emailService: EmailService,
  ) { }
  async create(createusuario:Usuario_Dto): Promise<any> {
    const emailExiste = await this.findemail(createusuario.email);
    if (emailExiste) {
      throw new BadRequestException(Mensagens_Constantes.usuario_email_existente);
    }
    // Gera hash da senha antes de salvar
    if (createusuario.senha) {
      const salt = await bcrypt.genSalt(10);
      createusuario.senha = await bcrypt.hash(createusuario.senha, salt);
    }
    // Retorna dados para o serviço de autenticação enviar o código 2FA
    return createusuario;
  }

  // Removido: Método para validar o código 2FA e finalizar criação
  async findlogin(email: string, senha: string): Promise<Usuario | null> {
    const usuario = await this.usuario_model.findOne({ email: email, status: Status_Usuario.ativo }, ["email", "senha", "_id", "perfil"]).exec();
    if (!usuario) return null;
    // Valida senha com bcryptjs
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return null;
    return usuario;
  }
  async findemail(email: string): Promise<Usuario | null> {
    return this.usuario_model.findOne({ email: email }, ["email"]).exec();
  }
}
