import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { bool } from "sharp";
import { User } from "src/user/entity/user.entity";
import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";
import { Repository } from "typeorm";
import { CreateVendortDto } from "../dto/createvendor.dto";
import { Vendor } from "../entity/vendor.entity";

@Injectable()
export class VendorService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(XittooServices) private readonly xittoServiceRepo: Repository<XittooServices>,
        @InjectRepository(Vendor) private readonly vendorRepo: Repository<Vendor>,
    ) {}

    async createVendor(createVendorDto: CreateVendortDto){
      try {
        let service = await this.xittoServiceRepo
        .createQueryBuilder()
        .where('id = :id', {
            id: createVendorDto.service_id,
        })
        .getOne();

        let user = await this.userRepo
        .createQueryBuilder()
        .where('id = :id', {
            id: createVendorDto.user_id,
        })
        .getOne();


        const nVendor = await this.vendorRepo.create({
            ...createVendorDto,
            xitto_service: [service],
            user: user
        });
       const rVendor = await this.vendorRepo.save(nVendor);
        return {
            data: rVendor,
        }

      } catch (error) {
        return {
            message: error.message,
        }
      }
    }


    async getAllVendor(){
        const allVendors = await this.vendorRepo.find({relations:['xitto_service','user'],})
        return {
            data: allVendors,
            status: true,
            statusCode: HttpStatus.OK,
            total: allVendors.length,
            
        }
    }


    
    async getOneVendor(id: string){
        const allVendors = await this.vendorRepo.findOne({where: {
            id: id,
        },relations:['xitto_service','user'],})
        return {
            data: allVendors,
            status: true,
            statusCode: HttpStatus.OK
        }
    }

    async addServiceOfVendor(vendor_id: string, service_id: string){
      try {
        const vendor = await this.vendorRepo.findOne({where:{
            id: vendor_id
        },relations:['xitto_service']});
        

        let service = await this.xittoServiceRepo
        .createQueryBuilder()
        .where('id = :id', {
            id: service_id,
        })
        .getOne();

        await vendor.xitto_service.push(service);
        let data = await this.vendorRepo.save(vendor);
        
        return {
            data
        }
      } catch (error) {
        return {
            message : error.message
        }
      } 
    }


}