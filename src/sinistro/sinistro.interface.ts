
export interface sinistro {
    nome_motorista: string,
    tipo_de_documento: Tipo_de_documento,
    documento: string,
    placa_veiculo: string,
    numero_tel: string,
    nome_transportadora: string,
    descricao_sinistro: string,
    data_preenchimento: Date,
    nome_resp_preechimento: string,
    email_resp: string,
    anex_documento:[string] 

}

export enum Tipo_de_documento {

    cnh = "CNH",
    ID_estrangeiro = "ID estrangeiro"
}