import mongoose, { Schema } from "mongoose";
import { ref } from "process";

export const sinistro_schema = new Schema({
       nome_motorista: {type: String},
       tipo_de_documento: {type: String},
       documento: {type: String},
       placa_veiculo: {type: String},
       numero_tel: {type: String},
       nome_transportadora: {type: String},
       descricao_sinistro: {type: String},
       data_preenchimento: {type: Date},
       data_sinistro: {type: Date},
       nome_resp_preechimento: {type: String},
       email_resp: {type: String},
       anex_documento: {type: [String]}
   
},

    {
        timestapms: true,
        collection: "Sinistro"
    })