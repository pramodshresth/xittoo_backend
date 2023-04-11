import { IsNotEmpty } from "class-validator";

export class ChangePwDto{
    @IsNotEmpty()
    currentPassword: string

    @IsNotEmpty()
    newPassword: string
}