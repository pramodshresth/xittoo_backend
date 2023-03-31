import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateVendortDto } from "../dto/createvendor.dto";
import { VendorService } from "../service/vendor.service";

@Controller('vendor')
export class VendorController{
    constructor(
        private readonly vendorService : VendorService
    ){}

    @Post('create')
    async createVendor(@Body() createVendorDto : CreateVendortDto){    
      return this.vendorService.createVendor(createVendorDto);
     }  

     @Get('get-all')
     async getAllVendor(){    
       return this.vendorService.getAllVendor();
      }  
  

      @Get('get-one/:id')
      async getOneVendor(@Param('id') id:string){    
        return this.vendorService.getOneVendor(id);
       }  

      
     @Post('add-service/:id')
     async addVendorService(@Param('id') vendor_id:string, @Body() body ){     
       return this.vendorService.addServiceOfVendor(vendor_id, body.service_id);
      }  
  

}