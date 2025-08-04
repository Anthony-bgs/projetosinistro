import { Schema } from 'mongoose';

export const AuditoriaSchema = new Schema({
  usuario: { type: String, required: true }, // id ou email
  acao: { type: String, required: true }, // ex: 'criação', 'alteração', 'exclusão', 'login'
  endpoint: { type: String },
  detalhes: { type: Object }, // campos alterados, antes/depois
  data: { type: Date, default: Date.now },
}, {
  timestamps: true,
  collection: 'Auditoria'
});
