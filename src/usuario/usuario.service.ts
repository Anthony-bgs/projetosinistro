import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Usuario } from './usuario.interface';
import { Constantes, Mensagens_Constantes, Status_Usuario } from 'src/constantes';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class Usuario_Service {
  constructor(
    @InjectModel("Usuario") private readonly usuario_model: Model<Usuario>,
  ) { }
  async create(createusuario: Usuario): Promise<string> {
    const emailExiste = await this.findemail(createusuario.email);
    if (emailExiste) {
      throw new BadRequestException(Mensagens_Constantes.usuario_email_existente);
    }
    const created = new this.usuario_model(createusuario);
    await created.save();
    return Mensagens_Constantes.sucesso_usuario
  }
  async findlogin(email: string): Promise<Usuario | null> {
    return this.usuario_model.findOne({ email: email, status: Status_Usuario.ativo }, ["email", "senha", "_id", "perfil"]).exec();
  }
  async findemail(email: string): Promise<Usuario | null> {
    return this.usuario_model.findOne({ email: email }, ["email"]).exec();
  }
}
