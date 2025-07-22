import { SetMetadata } from "@nestjs/common";
import { Regras_Perfil } from "src/constantes";

export const ROLES_KEY = "perfil";
export const Roles = (...perfil: string[]) => SetMetadata("perfil",perfil);