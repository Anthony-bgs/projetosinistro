import { Connection } from 'mongoose';
import { Sinistro_Schema } from './sinistro.schema';
import { Constantes } from 'src/constantes';


export const Sinistro_Provider = [
  {
    provide: Constantes.modelo_sinistro,
    useFactory: (connection: Connection) => connection.model('sinistro', Sinistro_Schema),
    inject: [Constantes.dataBaseConnection],},
];