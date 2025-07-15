
import * as mongoose from 'mongoose';
import { Constantes } from 'src/constantes';

export const databaseProviders = [
    {
        provide: Constantes.dataBaseConnection,
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(process.env.BD_URL || ""),
    },
]