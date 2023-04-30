import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors,UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ProblemDto } from "../dto/problem.dto";
import { ProblemService } from "../service/problem.service";
import { JwtAuthGuard } from "src/core/guard/jwt-guard";

@Controller('problem')
export class ProblemController{
    constructor(
        private readonly problemService : ProblemService
    ){}

  @UseGuards(JwtAuthGuard) 
  @UseInterceptors(FileInterceptor('image'))
  @Post('add')
  async addProblem(@UploadedFile() image: Express.Multer.File, @Body() problemDto: ProblemDto){
   return this.problemService.addProblem(image.path,problemDto,image.filename);
  }  

  @UseGuards(JwtAuthGuard) 
  @Get('get/:id')
  async getProblem(@Param('id') id: string){    
    return this.problemService.getProblems(id);
   }  

   @UseGuards(JwtAuthGuard) 
   @Delete('delete/:id')
   async deleteProblem(@Param('id') id: string){    
     return this.problemService.deleteProblem(id);
    }  

}