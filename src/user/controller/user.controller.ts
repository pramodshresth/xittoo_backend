import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { RegisterDto } from "../dtos/register.dto";
import { UserServices } from "../service/user.service";
import { ChangePasswordDto } from "../dtos/chnage_password.dto";
import { ChangePwDto } from "../dtos/chnage_pw.dto";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/core/guard/jwt-guard";

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

    
    @Delete('delete/:id')
    // @UsePipes(ValidationPipe)
    deleteUser(@Param('id') id: string) {
      return this.userService.deleteUser(id);
    }


    @Get('all')
    // @UsePipes(ValidationPipe)
    getAllUser() {
      return this.userService.getAllUser();
    }


    @Post('chanage-password')
    @UseGuards(JwtAuthGuard)
    chnangeUserPassword(@Req() req, @Body() changePwDto: ChangePwDto) {
      return this.userService.chnagePw(changePwDto, req.user.userId);
    }

    @Post('chanage-password-withphone')
    // @UsePipes(ValidationPipe)
    chnangeUserPasswodWithPhone(@Body() chnageDto: ChangePasswordDto) {
      return this.userService.chnangeUserPasswordWithPhone(chnageDto);
    }
}