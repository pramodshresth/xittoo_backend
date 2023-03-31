import { HttpException, HttpStatus, Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";
import { extname } from "path";
import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";
import { ProblemController } from "./controller/problem.controller";
import { Problem } from "./entity/problem.entity";
import { ProblemService } from "./service/problem.service";

@Module({
    imports: [
      MulterModule.register({
        fileFilter: (req, image, cb) => {
            if (!image.originalname.match(/\.(png|jpeg|jpg)$/)) {
              return cb(new HttpException('Only PNG files are allowed!', HttpStatus.BAD_REQUEST), false);
            }
            cb(null, true);
          },
        storage: diskStorage({
          destination: './upload/problem',
          filename: (req, image, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            return cb(null, `${randomName}${extname(image.originalname)}`);
          },     
        }),
      }),
      TypeOrmModule.forFeature([XittooServices, Problem])],
    controllers: [ProblemController],
    providers: [ProblemService]
  })
  export class ProblemModule {}
  