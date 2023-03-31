import { Body, Controller, Delete, FileTypeValidator, Get, HttpException, HttpStatus, Param, ParseFilePipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import path from "path";
import { XittooServices1 } from "../service/xittoo_service.service";
import { JwtAuthGuard } from "src/core/guard/jwt-guard";
import { AdminGuard } from "src/core/guard/admin-guard";

@Controller('xittoo-service')
// @UseInterceptors(FileInterceptor('file'))
export class XittoServiceController {
    constructor(private readonly xittoService: XittooServices1) { }

    @Post('add')
    //    @UsePipes(ValidationPipe)
   @UseInterceptors(FileInterceptor('image'))
    addService(@UploadedFile(
        new ParseFilePipe({
           validators: [
              new FileTypeValidator({ fileType: '.(png|jpeg|jpg)'}),
           ],
        }),
     ) image: Express.Multer.File, @Body() addDto) {
        return this.xittoService.addXittoService(image.path, addDto.name, image.filename);
    }

    @Get('get-all')
    //    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    getAllXittooService(@Req() req) {
      console.log(req.user);
       return this.xittoService.getAllXittooService();
    }


    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard, AdminGuard)
    deleteService(@Param('id') id: string) {
       return this.xittoService.deleteService(id);
          }

}