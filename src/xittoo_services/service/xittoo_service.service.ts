import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as fs from 'fs';
import { XittooServices } from "../entity/xittoo_services.entity";

export class XittooServices1{
    constructor(
        @InjectRepository(XittooServices) private readonly xittoService: Repository<XittooServices>,
    ){}

    async addXittoService(image_path: string, name: string, image_id: string){
       try {
        const new_service = this.xittoService.create({
            name: name,
            icon_url: `http://localhost:3000/${image_path}`,
            icon_id: image_id,
        });
        const savedService = await this.xittoService.save({...new_service});
        return {
            message: 'Xittoo Service Added Successfully',
            data: { ...savedService },
            status: true,
            statusCode: HttpStatus.CREATED,
        }
       } catch (error) {
        return {
            message: error.message,
            status: false,
            statusCode: HttpStatus.BAD_REQUEST,
        }
       }  
    }

    async getAllXittooService(){
        const allServices = await this.xittoService.createQueryBuilder('xittoo-services').getMany();
        return {
            data: allServices,
            status: true,
            statusCode: HttpStatus.OK,
            total: allServices.length,
            
        }
    }


    async deleteService(id: string){
        try {
            const service = await this.xittoService
            .createQueryBuilder('xittoo-services')
            .where('id= :service_id', {
                service_id: id,
            }).getOne();
          const filePath = `./upload/xittoo-service/${service.icon_id}` // assuming images are stored in the uploads directory
          fs.unlinkSync(filePath);// delete the file from the file system
          await this.xittoService.delete(id);
          return { 
            message: 'File deleted successfully!',
            status: true,
            statusCode: HttpStatus.OK
         };
        } catch (error) {
          throw new HttpException('Could not delete Service', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}