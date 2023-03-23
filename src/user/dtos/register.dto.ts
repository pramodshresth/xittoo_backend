import {IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterDto{
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    gender: string

    @IsNotEmpty()
    district: string

    @IsNotEmpty()
    address: string

    invite_code: string

}