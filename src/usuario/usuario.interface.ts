import { ObjectId } from "mongoose";

export interface Usuario {
    nome: string,
    email: string,
    senha: string,
    perfil: string,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date,
    _id?: ObjectId
}