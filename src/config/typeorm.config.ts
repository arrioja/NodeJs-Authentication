import { TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

/* En las siquientes lineas se usan las variables de entorno:
process.env.RDS_
Estas son proveídas por AWS, que es donde se va a montar la app.
En caso de que no se provean, se usan las que proporcionamos.
*/
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
