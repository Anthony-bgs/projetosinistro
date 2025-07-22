import { Inject, Injectable } from '@nestjs/common';
import { sinistro } from './sinistro.interface';
import { Constantes } from 'src/constantes'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class Sinistro_Service {
  constructor(
    @InjectModel("Sinistro") private readonly sinistro_model: Model<sinistro>,
    private readonly email_service: EmailService
    ) { }
    async create(createsinistro: sinistro): Promise<string> {
      const created = new this.sinistro_model(createsinistro);
      await created.save();
      // Envia email após criar o sinistro
      this.email_service.sendMail(created.responsavel_email_preenchimento,
        'Registro de Sinistro',
        `Seu sinistro foi registrado com sucesso. Referência: ${created._id.toString()}`)
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
}

