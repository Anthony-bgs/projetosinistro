import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auditoria } from './auditoria.interface';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectModel('Auditoria') private readonly auditoriaModel: Model<Auditoria>,
  ) {}

  async registrar(usuario: string, acao: string, endpoint?: string, detalhes?: any) {
    const log = new this.auditoriaModel({ usuario, acao, endpoint, detalhes });
    await log.save();
    return log;
  }

  async listarTodos(): Promise<Auditoria[]> {
    return this.auditoriaModel.find().sort({ data: -1 }).exec();
  }
}
