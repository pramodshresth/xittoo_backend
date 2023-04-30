// import { otification } from "src/notification/entity/notification.entity";
import { NotificationEntity } from "src/notification/entity/notification.entity";
import { Otp } from "src/otp/entity/otp.entity";
import { Problem } from "src/problem/entity/problem.entity";
import { User } from "src/user/entity/user.entity";
import { Vendor } from "src/vendor/entity/vendor.entity";
import { WorkHistory } from "src/workhistory/entity/workhistory.entity";
import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";
import { DataSource, DataSourceOptions } from "typeorm";

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User1682006247244 } from "src/migrations/1682006247244-User";
import { details1682039251377 } from "src/migrations/1682039251377-details";
import { otp1682831953394 } from "src/migrations/1682831953394-otp";
import { services1682833231463 } from "src/migrations/1682833231463-services";
import { problem1682837218427 } from "src/migrations/1682837218427-problem";
// export const dbconfig = {
//     type: 'postgres',
//     host: '127.0.0.1',
//     port: 5432,
//     username: 'postgres',
//     password: 'pramod',
//     database: 'xittoo',
//     entities: ['dist/**/*.entity{.ts,.js}'],
//     autoLoadEntities: true,
//     synchronize: false,
//     migrationsRun: true,
//     migrations: ['dist/migrations/*.js'],
//     migrationsTableName: 'migrations_history',
// //   synchronize: process.env.APP_ENV === 'development',
// } as TypeOrmModuleOptions;
export const dataSourceOption: DataSourceOptions ={
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'pramod',
    database: 'xittoo',
    
    // entities: [User, XittooServices, Problem, Vendor, WorkHistory, NotificationEntity, Otp],
    // entities: ["dist/user/entity/user.entity.js"],
    // entities: ['src/*/*/*.entity.ts'],
    // entities: ['dist/**/*.entity.js'],
    entities: [User,Otp, XittooServices,Problem],

    synchronize: false,  
    migrationsRun: false,
    // migrations: ['src/migrations/*.ts'],
    // migrations: ['dist/migrations/*.js'],
    migrations: [User1682006247244,otp1682831953394, services1682833231463,problem1682837218427] || ['dist/src/migrations/*.js'],
    migrationsTableName: 'migrations_history',

};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;