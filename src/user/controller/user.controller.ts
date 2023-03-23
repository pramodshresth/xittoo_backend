import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "../dtos/register.dto";
import { UserServices } from "../service/user.service";

@Controller('user')
export class UserController{
    constructor(
        private readonly userService : UserServices
    ){ }

    @Post('create')
    // @UsePipes(ValidationPipe)
    createUser(@Body() user: RegisterDto) {
     console.log(user.invite_code == null);
      return this.userService.createUser(user);
    }
}