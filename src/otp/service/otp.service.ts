import { Injectable } from "@nestjs/common";
import { OtpDto } from "../dto/otp.dto";
import { log } from "console";



@Injectable()
export class OtpService{
    constructor(){}


    async sendOtp(){
      console.log(generateOTP());
      
    }


    async verifyOtp(otpDto : OtpDto){

    }

}

function generateOTP(): string {
    const chars = '0123456789';
    let otp = '';
    for(let i = 0; i < 6; i++) {
      otp += chars[Math.floor(Math.random() * chars.length)];
    }
    return otp;
  }