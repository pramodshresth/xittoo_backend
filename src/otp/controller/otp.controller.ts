import { Body, Controller, Post } from "@nestjs/common";
import { OtpService } from "../service/otp.service";


@Controller('otp')
export class OtpController{
    constructor(
        private readonly otpService: OtpService
    ){}


    @Post('send')
    async sendOtp(@Body() body){
        if(body.phone==null || body.phone ==""){
            return{
                status: false,
                message: "Please Enter a Number"
            }
        }else{
            return this.otpService.sendOtp();
        }
    }
}
