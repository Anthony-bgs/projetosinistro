import { Schema } from "mongoose";
import { Status_Usuario } from "src/constantes";

export const Usuario_Schema = new Schema({
    nome: { type: String },
    email: { type: String },
    senha: { type: String },
    perfil: { type: String },
    status: { type: String,
        default: Status_Usuario.ativo
    },
}, {
    timestamps: true,
    collection: "Usuario"
})