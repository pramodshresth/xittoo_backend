import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entity/user.entity";
import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";
import { VendorController } from "./controller/vendor.controller";
import { Vendor } from "./entity/vendor.entity";
import { VendorService } from "./service/vendor.service";

@Module({
    imports: [
      TypeOrmModule.forFeature([XittooServices, User,Vendor])
    ],
    exports: [],
    controllers: [VendorController],
    providers: [VendorService],
})
export class VendorModule{}