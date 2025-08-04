import { Inject, Injectable } from '@nestjs/common';
import { sinistro } from './sinistro.interface';
import { Constantes, Status_Sinistro } from 'src/constantes'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EmailService } from 'src/comunicacao/email.service';
import { ZapService } from 'src/comunicacao/zap.service';

@Injectable()
export class Sinistro_Service {
  constructor(
    @InjectModel("Sinistro") private readonly sinistro_model: Model<sinistro>,
    private readonly email_service: EmailService, private readonly zap_service: ZapService
  ) { }
  async create(createsinistro: sinistro): Promise<string | Response> {
    const created = new this.sinistro_model(createsinistro);
    await created.save();
    // this.zap_service.sendWhatsappMessage(created.numero_telefone, `Novo sinistro registrado: ${created._id.toString()}`);
    // this.email_service.sendMail(created.responsavel_email_preenchimento,
    //   'Registro de Sinistro',
    //   `Seu sinistro foi registrado com sucesso. Referência: ${created._id.toString()}`)
    return Response.json({
      message: 'Sinistro registrado com sucesso',
    });
    // Retorna o ID do sinistro criado
    return created._id.toString()
  }
  async find(_id: string): Promise<sinistro | null> {
    return this.sinistro_model.findById({ _id: _id }).exec();
  }
  async findAll(): Promise<sinistro[]> {
    return this.sinistro_model.find()
  }
  async find6meses(): Promise<sinistro[]> {
    var Data_Atual = new Date()
    var Data_Final = new Date()
    Data_Final.setMonth(Data_Final.getMonth() - 6);
    return this.sinistro_model.find({ data_preenchimento: { $gt: Data_Final, $lt: Data_Atual } })
  }
  // Atualiza o status do sinistro de forma segura
  async updateStatus(id: string, status: Status_Sinistro, usuarioId?: string): Promise<sinistro | null> {
    // Busca o sinistro
    const sinistroDoc = await this.sinistro_model.findById(id);
    if (!sinistroDoc) {
      throw new Error('Sinistro não encontrado');
    }
    // Salva status anterior para auditoria
    const statusAnterior = sinistroDoc.status;
    sinistroDoc.status = status;
    await sinistroDoc.save();
    return sinistroDoc;
  }
}
