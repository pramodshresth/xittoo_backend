import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Otp } from "./entity/otp.entity";
import { OtpService } from "./service/otp.service";
import { OtpController } from "./controller/otp.controller";
import { User } from "src/user/entity/user.entity";



@Module({
    imports: [
        TypeOrmModule.forFeature([Otp, User])
    ],
    providers: [OtpService],
    exports:[],
    controllers:[OtpController]
})
export class OtpModule{}