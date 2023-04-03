import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { otification } from "./entity/notification.entity";
import { NotificationController } from "./controller/notification.controller";
import { AppGateway } from "./gateway/notification.gateway";
import { NotificationService } from "./service/notification.service";


@Module({
    imports: [TypeOrmModule.forFeature([otification])],
    controllers: [NotificationController],
    providers: [AppGateway, NotificationService]
    
})
export class NotificationModule{}