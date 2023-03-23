import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from 'src/auth/services/bcrypt.service';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { UserServices } from './service/user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
],
  controllers: [UserController],
  providers: [UserServices, BcryptService]
  
})
export class UserModule {}
