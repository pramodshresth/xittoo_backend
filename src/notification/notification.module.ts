import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { NotificationService } from "./service/notification.service";
import { NotificationGateway } from "./gateway/notification.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationEntity } from "./entity/notification.entity";
import { NotificationController } from "./controller/notification.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([NotificationEntity])
    ],
    controllers: [NotificationController],
    providers: [NotificationGateway]
    
})
export class NotificationModule{}