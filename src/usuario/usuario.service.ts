const bcrypt = require('bcryptjs');
import { EmailService } from 'src/comunicacao/email.service';
// Armazenamento temporário dos códigos 2FA (em memória)
const codigos2FA: { [email: string]: { codigo: string, expira: number, usuario: Usuario_Dto } } = {};
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
    // Gera código 2FA
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    codigos2FA[createusuario.email] = { codigo, expira: Date.now() + 5 * 60 * 1000, usuario: createusuario };
    // Envia o código por e-mail
    await this.emailService.sendMail(
      createusuario.email,
      'Código de verificação 2FA',
      `Seu código de verificação é: ${codigo}`
    );
    // Retorna info para o frontend pedir o código
    return { email: createusuario.email, twoFactorRequired: true };
  }

  // Método para validar o código 2FA e finalizar criação
  async validarCodigo2FA(email: string, codigo: string): Promise<string> {
    const registro = codigos2FA[email];
    if (!registro || registro.codigo !== codigo || Date.now() > registro.expira) {
      throw new BadRequestException('Código 2FA inválido ou expirado');
    }
    // Código válido, remove da memória e cria usuário
    const usuario = registro.usuario;
    delete codigos2FA[email];
    const created = new this.usuario_model(usuario);
    await created.save();
    return Mensagens_Constantes.sucesso_usuario;
  }
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
