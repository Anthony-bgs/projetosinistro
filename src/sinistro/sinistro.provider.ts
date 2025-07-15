import { Connection } from 'mongoose';
import { sinistro_schema } from './sinistro_schema';
import { Constantes } from 'src/constantes';


export const sinistroprovider = [
  {
    provide: Constantes.modelo_sinistro,
    useFactory: (connection: Connection) => connection.model('sinistro', sinistro_schema),
    inject: [Constantes.dataBaseConnection],},
];