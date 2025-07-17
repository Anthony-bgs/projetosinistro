import { Regras_Perfil } from "src/constantes";

export interface Usuario_Dto extends Document {
   nome: string,
   email: string,
   senha: string,
   perfil: Regras_Perfil,
}