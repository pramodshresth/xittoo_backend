import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppDataSource } from './config/database';
import { UserModule } from './user/user.module';
import { XittooServiceModule } from './xittoo_services/xittoo_services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options,),
    UserModule,
    AuthModule,
    XittooServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
