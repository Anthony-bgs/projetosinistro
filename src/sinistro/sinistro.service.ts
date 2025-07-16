import { Inject, Injectable } from '@nestjs/common';
import { sinistro } from './sinistro.interface';
import { Constantes } from 'src/constantes'
import { Model } from 'mongoose';
import { sinistrodto } from './sinistrodto';

@Injectable()
export class sinistro_service {
  constructor(
    @Inject(Constantes.modelo_sinistro)
    private sinistro_model: Model<sinistro>,
  	) { }
    async create(createsinistro: sinistro): Promise<string> {
      const created = new this.sinistro_model(createsinistro);
      await created.save();
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
		return this.sinistro_model.find({ data_preenchimento: { $gt: Data_Final, $lt:Data_Atual } })
	}
}

