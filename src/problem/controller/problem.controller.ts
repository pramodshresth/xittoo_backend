import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProblemDto } from "../dto/problem.dto";
import { ProblemService } from "../service/problem.service";

@Controller('problem')
export class ProblemController{
    constructor(
        private readonly problemService : ProblemService
    ){}

  @UseInterceptors(FileInterceptor('image'))
  @Post('add')
  async addProblem(@UploadedFile() image: Express.Multer.File, @Body() problemDto: ProblemDto){
   return this.problemService.addProblem(image.path,problemDto,image.filename);
  }  


  @Get('get/:id')
  async getProblem(@Param('id') id: string){    
    return this.problemService.getProblems(id);
   }  

}