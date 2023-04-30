import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";
import { Repository } from "typeorm";
import { ProblemDto } from "../dto/problem.dto";
import { Problem } from "../entity/problem.entity";


@Injectable()
export class ProblemService {
    constructor(
        @InjectRepository(Problem) private readonly problemRepo: Repository<Problem>,
        @InjectRepository(XittooServices) private readonly xittoServiceRepo: Repository<XittooServices>,
    ) { }
    async addProblem(image_path: string, problemDto: ProblemDto, image_filename: string) {
        try {
            let service = await this.xittoServiceRepo
                .createQueryBuilder()
                .where('id = :id', {
                    id: problemDto.service_id,
                })
                .getOne();

            const nProblem = this.problemRepo.create({
                name: problemDto.name,
                per_price: problemDto.per_price,
                description: problemDto.description,
                image_url: `http://localhost:3000/${image_path}`,
                image_id: image_filename,
                xitto_service: service,
                brand: problemDto.brand,
                facilate_charge: problemDto.facilate_charge
            });
            const r_user = await this.problemRepo.save({ ...nProblem });
            return {
                data: r_user
            }
        } catch (error) {
            return {
                message: error.message,
            }
        }
    }

    async getProblems(uuid: string) {
        try {
        let problem = await this.problemRepo
            .createQueryBuilder('problem').where('problem.service_id = :id', {
                id: uuid,
            }).innerJoin('problem.xitto_service','id')
            .getMany();
        return {
            data: problem,
            status: true,
            statusCode: HttpStatus.OK,
            total: problem.length
        }
        } catch (error) {
            return {
                message: "Somthing went wrong",
                status: false,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }  
        }
    }


    async deleteProblem(id: string){
        try {
            const result = await this.problemRepo.delete({
              id: id,
            });
            if (result.affected) {
                return {
                    message: "Problem deleted sucessfully",
                    status: true,
                    statusCode: HttpStatus.CREATED,
                } 
            } else {
              return {
                status: false,
                message: "Sorry, couldn't delete problem",
                statusCode: HttpStatus.BAD_REQUEST,
              };
            }
          } catch (e) {
            return {
                status: false,
                message: "Sorry, couldn't delete problem",
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              };
          }
      
    }

}