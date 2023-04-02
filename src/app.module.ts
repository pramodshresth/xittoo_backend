import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppDataSource } from './config/database';
import { ProblemModule } from './problem/problem.module';
import { UserModule } from './user/user.module';
import { VendorModule } from './vendor/vendor.module';
import { XittooServiceModule } from './xittoo_services/xittoo_services.module';
import { WorkHistoryModule } from './workhistory/workhistory.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options,),
    UserModule,
    AuthModule,
    XittooServiceModule,
    ProblemModule,
    VendorModule,
    WorkHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
