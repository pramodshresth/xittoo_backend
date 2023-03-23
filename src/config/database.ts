import { User } from "src/user/entity/user.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'pramod',
    database: 'xittoo',
    entities: [User],
    synchronize: true,  
    migrationsRun: true,
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migrations_history',
});