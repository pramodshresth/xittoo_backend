import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from "src/app.service";
import { NotificationService } from "../service/notification.service";
import { Observable, of } from "rxjs";

@Controller('notification')
export class NotificationController{
   
    constructor(
        private readonly notServ : NotificationService
    ){ }
    @Post()
    sendNotification(){
      this.notServ.createNotification("My Name is Pramod");
    }

    @Get()
    streamData(): Observable<string> {
      const stream = of('data1', 'data2', 'data3');
      return stream;
    }
}


