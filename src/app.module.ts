import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProblemModule } from './problem/problem.module';
import { UserModule } from './user/user.module';
import { VendorModule } from './vendor/vendor.module';
import { XittooServiceModule } from './xittoo_services/xittoo_services.module';
import { WorkHistoryModule } from './workhistory/workhistory.module';
import { NotificationModule } from './notification/notification.module';
import { OtpModule } from './otp/otp.module';
import dataSource, { dataSourceOption } from './config/database';
// import dataSource, { AppDataSource } from './config/database';



@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    UserModule,
    AuthModule,
    XittooServiceModule,
    ProblemModule,
    VendorModule,
    WorkHistoryModule,
    NotificationModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
