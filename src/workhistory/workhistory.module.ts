import { Module } from "@nestjs/common";
import { WorkHistoryService } from "./service/workhistory.service";
import { WorkHistoryController } from "./controller/workhistory.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkHistory } from "./entity/workhistory.entity";
import { User } from "src/user/entity/user.entity";
import { Vendor } from "src/vendor/entity/vendor.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([WorkHistory,User,Vendor])
    ],
    exports: [],
    providers: [WorkHistoryService],
    controllers:[WorkHistoryController],
})
export class WorkHistoryModule{}