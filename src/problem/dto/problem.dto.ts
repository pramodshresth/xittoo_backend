import { IsNotEmpty } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class ProblemDto{    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    per_price: string;

    @IsNotEmpty()
    description : string;

    @IsNotEmpty()
    brand: string[];

    
    @IsNotEmpty()
    service_id: string;
    
    @IsNotEmpty()
    facilate_charge: number
    
}