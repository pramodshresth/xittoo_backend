import { IsNotEmpty } from "class-validator";


 export class ChangePasswordDto{
    
    @IsNotEmpty()
    phone: string

      
    @IsNotEmpty()
    password: string
}