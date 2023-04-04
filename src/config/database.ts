// import { otification } from "src/notification/entity/notification.entity";
import { NotificationEntity } from "src/notification/entity/notification.entity";
import { Problem } from "src/problem/entity/problem.entity";
import { User } from "src/user/entity/user.entity";
import { Vendor } from "src/vendor/entity/vendor.entity";
import { WorkHistory } from "src/workhistory/entity/workhistory.entity";
import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'pramod',
    database: 'xittoo',
    entities: [User, XittooServices, Problem, Vendor, WorkHistory, NotificationEntity],
    // entities: ["dist/user/entity/user.entity.js"],
    // entities: ['src/*/*/*.entity.js'],
    synchronize: true,  
    migrationsRun: true,
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migrations_history',
});