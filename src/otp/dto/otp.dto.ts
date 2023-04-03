import { IsNotEmpty } from "class-validator"


export class OtpDto{
    @IsNotEmpty()
    phone_number: string

    @IsNotEmpty()
    otp: string
}