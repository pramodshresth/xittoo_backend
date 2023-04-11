import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { OtpDto } from "../dto/otp.dto";
import { log } from "console";
import { InjectRepository } from "@nestjs/typeorm";
import { Otp } from "../entity/otp.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entity/user.entity";



@Injectable()
export class OtpService{
    constructor(
      @InjectRepository(Otp) private readonly otpRepo: Repository<Otp>,
      @InjectRepository(User) private readonly userRepo: Repository<User>,
    ){}

    async sendOtp(phone: string){
      // const nepaliRegax = '(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7};      '
      let otp = generateOTP();
      console.log(otp);
      const nOtp = await this.otpRepo.create({phone_number: phone,otp: otp});
      const rOtp = await this.otpRepo.save(nOtp);
      return{
        status: true,
        data: rOtp,
        message: "Otp Send Sucessfully",
        statusCode: HttpStatus.OK,
      }
      
    }


    async verifyOtp(otpDto : OtpDto){
      try {
        let otp = await this.otpRepo.createQueryBuilder()
        .where('otp = :otp', {
            otp: otpDto.otp,
        }).andWhere('phone_number= :phone',{
          phone : otpDto.phone_number
        }).getOne();
  
        let date = new Date();
        let diff = getSecondsDifference( new Date(date),new Date(otp.created_at.toLocaleString()));  
        if(diff>120){
          return{
            status: false,
            message: "Otp is only valid for 2 min",
            statusCode: HttpStatus.BAD_REQUEST,
          }
        }else{
          return{
            status: true,
            message: "Otp Validate Sucessfully",
            statusCode: HttpStatus.OK
          }
        }
      } catch (error) {
        return{
          status: false,
          message: "Something Went Wrong",
          statusCode: HttpStatus.BAD_REQUEST
        }
      }
    };

    async checkUserAndSendOtp(phone: string){
      try {
        const getUser = await this.userRepo
            .createQueryBuilder()
            .where('phone= :phone', {
                phone: phone,
            }).getOne();

          if(getUser){
           return this.sendOtp(phone);
          }else{
            return{
              status: false,
              message: "Please Enter the valid number",
              statusCode: HttpStatus.BAD_REQUEST
            }
          }
      } catch (error) {        
        return{
          status: false,
          message: "Something Went Wrong",
          statusCode: HttpStatus.BAD_REQUEST
        }
      }
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

  function  getSecondsDifference(date1: Date, date2: Date): number {
    const time1 = date1.getTime();
    const time2 = date2.getTime();
    const diffInMs = Math.abs(time2 - time1);
    const diffInSec = Math.floor(diffInMs / 1000);
    return diffInSec;
  }