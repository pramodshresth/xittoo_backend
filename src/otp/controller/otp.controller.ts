import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { OtpService } from "../service/otp.service";
import { OtpDto } from "../dto/otp.dto";
import { User } from "src/user/entity/user.entity";


@Controller('otp')
export class OtpController{
    constructor(
        private readonly otpService: OtpService,
    ){}


    @Post('send')
    async sendOtp(@Body() body){
        if(body.phone==null || body.phone ==""){
            return{
                status: false,
                message: "Please Enter a Number",
                statusCode: HttpStatus.BAD_REQUEST,

            }
        }else{
            return this.otpService.sendOtp(body.phone);
        }
    }
    
    @Post('verify')
    async verifyOtp(@Body() otpDto: OtpDto){
            return this.otpService.verifyOtp(otpDto);
    }


    
    @Post('forgot-otp')
    async forgotOtp(@Body() body){
        if(body.phone==null || body.phone ==""){
            return{
                status: false,
                message: "Please Enter a Number",
                statusCode: HttpStatus.BAD_REQUEST,
            }
        }else{
            return this.otpService.checkUserAndSendOtp(body.phone);
        }
    }

}
