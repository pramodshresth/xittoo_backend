import {IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVendortDto{
    @IsNotEmpty()
    user_id: string

    @IsNotEmpty()
    service_id: string

    @IsNotEmpty()
    availability: string

    @IsNotEmpty()
    level_of_assistance: string

    @IsNotEmpty()
    daily_bill: string

    @IsNotEmpty()
    experience: string
    
}