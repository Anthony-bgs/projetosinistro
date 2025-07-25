import mongoose, { Schema } from "mongoose";
import { Status_Sinistro } from "src/constantes";

export const Sinistro_Schema = new Schema({
  tipo_documento: { type: String },
  numero_documento: { type: String },
  nome_motorista: { type: String },
  placa_veiculo: { type: String },
  numero_telefone: { type: String },
  nome_transportadora: { type: String },
  data_sinistro: { type: Date },
  descricao_sinistro: { type: String },
  responsavel_nome_preechimento: { type: String },
  responsavel_email_preenchimento: { type: String },
  data_preenchimento: { type: Date },
  documentos_anexo: { type: [String] },
  status: {
    type: String, enum: Status_Sinistro, default: Status_Sinistro.aberto
  }
},
  {
    timestamps: true,
    collection: "Sinistro"
  }
)