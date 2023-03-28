import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { XittooServices } from "src/xittoo_services/entity/xittoo_services.entity";

@Module({
    imports: [TypeOrmModule.forFeature([XittooServices])],
    controllers: [],
    providers: []
  })
  export class OrderModule {}
  