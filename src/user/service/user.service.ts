import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BcryptService } from "src/auth/services/bcrypt.service";
import { Repository } from "typeorm";
import { RegisterDto } from "../dtos/register.dto";
import { User } from "../entity/user.entity";

@Injectable()
export class UserServices{
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private readonly bcryptService: BcryptService,
        ){}

        async checkConflict(user: RegisterDto) {
            const getUserEmail = await this.userRepo
              .createQueryBuilder('user')
              .where('phone= :u_phone', {
                u_phone: user.phone,
              })
              .getMany();
        
            if (getUserEmail.length > 0 ) {
              return true;
            } else {
              return false;
            }
        
          }

        async checkUserWithInvitationCode(invite_code: string) {
            const getUser = await this.userRepo
              .createQueryBuilder('user')
              .where('invite_code= :code', {
                code: invite_code,
              }).getOne();
              return getUser;
          }

        //create user
        async createUser(registerDto : RegisterDto){
            const alreadyUser = await this.checkConflict(registerDto);
            if(alreadyUser){
               return {
                message: 'User Already Created',
                status: false,
                statusCode : HttpStatus.BAD_REQUEST,
               }
            }else{
                const hashPassword = await this.bcryptService.hashPassword(
                    registerDto.password,
                  ); 
                const n_user = this.userRepo.create({...registerDto, password: hashPassword});
            if(registerDto.invite_code == null){
                const r_user = await this.userRepo.save({...n_user, invite_code : generateUniqueString()});
                return { 
                message: 'User registered Successfully',
                data: { ...r_user },
                status: true,
                statusCode : HttpStatus.CREATED,
              };
            }else{
                const user = await this.checkUserWithInvitationCode(registerDto.invite_code);
                if(!user){
                    return {
                        message: 'Please Enter Valid Invitation Code',
                        status: false,
                        statusCode : HttpStatus.BAD_REQUEST,  
                    }
                }else{
                    await this.userRepo.createQueryBuilder('user').update(User).set(
                        {
                            reward_points: (user).reward_points + 10,
                            updated_at: Date.now(),
                        }
                    ).where("id = :id", { id: (user).id }).execute();
                      const r_user = await this.userRepo.save({...n_user, invite_code : generateUniqueString()});
                    return {
                    message: 'User registered Successfully',
                    data: { ...r_user },
                    status: true,
                    statusCode : HttpStatus.CREATED,
                  };
                }
            }
            }
          
        }
}

function generateUniqueString(): string {
    let result = '';
       const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
       const charactersLength = characters.length;
       for (let i = 0; i < 8; i++) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
}