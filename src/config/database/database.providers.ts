import { DataSource } from 'typeorm';
import * as process from 'process';
import { User } from '../../entity/users/user.entity';
import { Role } from '../../entity/roles/role.entity';

export const databaseProviders = {
  provide: 'DATA_SOURCE',
  useFactory: async (): Promise<DataSource> => {
    const dataSource: DataSource = new DataSource({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE_NAME,
      entities: [User, Role],
      synchronize: true,
      logging: true,
    });
    return dataSource.initialize();
  },
};
