import { Status_Sinistro } from "src/constantes"

export interface sinistro {
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
  status?: Status_Sinistro

}

export enum Tipo_de_documento {

    cnh = "CNH",
    ID_estrangeiro = "ID estrangeiro"
}