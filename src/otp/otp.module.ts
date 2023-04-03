import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Otp } from "./entity/otp.entity";
import { OtpService } from "./service/otp.service";
import { OtpController } from "./controller/otp.controller";



@Module({
    imports: [
        TypeOrmModule.forFeature([Otp])
    ],
    providers: [OtpService],
    exports:[],
    controllers:[OtpController]
})
export class OtpModule{}