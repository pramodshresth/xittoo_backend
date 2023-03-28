import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, MulterModule } from "@nestjs/platform-express";
import * as sharp from "sharp";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   @Post('login')
   //    @UsePipes(ValidationPipe)
   loginUser(@Body() loginDto: LoginDto) {
      return this.authService.loginUser(loginDto.phone, loginDto.password);
   }

   @Post('file')
   //    @UsePipes(ValidationPipe)
   @UseInterceptors(FileInterceptor('file'))
   async fileup(@UploadedFile(
      new ParseFilePipe({
         validators: [
            new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
         ],
      }),
   ) file: Express.Multer.File, @Body() manila: any) {
      // Resize and compress the image
         return {
            filename: file.filename,
            id: file.path
            // buffer: file.buffer.byteLength,
          };
   }
}

