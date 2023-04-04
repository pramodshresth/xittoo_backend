import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from "src/app.service";
// import { NotificationService } from "../service/notification.service";
import { Observable, of } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationEntity } from "../entity/notification.entity";
import { NotificationGateway } from "../gateway/notification.gateway";

@Controller('notification')
export class NotificationController{
    constructor(
      @InjectRepository(NotificationEntity) private readonly notiRepo: Repository<NotificationEntity>,
      private readonly appGateway : NotificationGateway
    ){ }
    @Post()
    async sendNotification(){
      const n_user = this.notiRepo.create({message: "Pramod"});
      const data = await this.notiRepo.save(n_user);
      this.appGateway.onNewMessage({id: data.id, msg: data.message});
      
    }

    @Get()
    streamData(): Observable<string> {
      const stream = of('data1', 'data2', 'data3');
      return stream;
    }
}


