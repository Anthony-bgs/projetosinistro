import { Connection } from "mongoose";
import { Constantes } from "src/constantes";
import { Usuario_Schema } from "./usuario.schema";

export const usuarioprovider = [
  {
    provide: Constantes.modelo_usuario,
    useFactory: (connection: Connection) => connection.model(Constantes.modelo_usuario, Usuario_Schema),
    inject: [Constantes.dataBaseConnection],
  },
];