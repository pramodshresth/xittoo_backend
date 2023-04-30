import { HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entity/user.entity";
import { Repository } from "typeorm";
import { BcryptService } from "./bcrypt.service";

export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        private readonly bcryptService: BcryptService,
        private jwtService: JwtService,
    ) { }
    async loginUser(phone: string, password: string) {
        const user = await this.userRepo.createQueryBuilder('user').where('user.phone = :phone', {phone: phone}).getOne();
        if(user){
         const isMatchPassword = await this.bcryptService.comparePassword(user.password, password);
         if(isMatchPassword){
            const payload = { username: user.username, id: user.id, role: user.role};
               return {
                status: true,
                data : {
                    ...user,
                   token : this.jwtService.sign(payload),
                },
                statusCode : HttpStatus.OK 
               }
         } else{
            return {
                message: "Please Enter the valid password",
                status: false,
                statusCode: HttpStatus.BAD_REQUEST
               }
         }
        }else{
            return {
                status: false,
                message: "User Not Found",
                statusCode: HttpStatus.BAD_REQUEST,
            }
        }
        
    }
}