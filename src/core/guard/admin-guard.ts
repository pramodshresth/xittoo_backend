import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const user = await this.userRepo
        .createQueryBuilder('user')
        .where('id= :id', {
          id: request.user.userId,
        }).getOne();
      if (user.role === "admin") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
    // Check if the user is an admin
  }
}