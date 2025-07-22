import { Document } from 'mongoose';
import { Tipo_de_documento } from './sinistro.interface';

export interface Sinistro_Dto extends Document {
  tipo_documento: Tipo_de_documento,
  numero_documento: string,
  nome_motorista: string,
  placa_veiculo: string,
  numero_telefone: string,
  nome_transportadora: string,
  data_sinistro: Date,
  descricao_sinistro: string,
  responsavel_nome_preechimento: string,
  responsavel_email_preenchimento: string,
  data_preenchimento: Date,
  documentos_anexo: string[]
}