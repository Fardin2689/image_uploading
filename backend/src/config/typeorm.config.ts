import { TypeOrmModule } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'projects',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
