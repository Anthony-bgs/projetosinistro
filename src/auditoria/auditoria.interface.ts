export interface Auditoria {
  usuario: string;
  acao: string;
  endpoint?: string;
  detalhes?: any;
  data?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}
