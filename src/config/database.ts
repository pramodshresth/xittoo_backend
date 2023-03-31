import { Problem } from "src/problem/entity/problem.entity";
import { User } from "src/user/entity/user.entity";
import { Vendor } from "src/vendor/entity/vendor.entity";
import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'pramod',
    database: 'xittoo',
    entities: [User, XittooServices, Problem, Vendor],
    // entities: ['dist/entities/*.entity.{ts,js}', 'src/entities/*.entity.{ts,js}'],
    synchronize: true,  
    migrationsRun: true,
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migrations_history',
});