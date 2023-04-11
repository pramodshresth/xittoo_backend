import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BcryptService } from "src/auth/services/bcrypt.service";
import { Repository } from "typeorm";
import { RegisterDto } from "../dtos/register.dto";
import { User } from "../entity/user.entity";
import { ChangePasswordDto } from "../dtos/chnage_password.dto";
import { log } from "console";
import { ChangePwDto } from "../dtos/chnage_pw.dto";

@Injectable()
export class UserServices {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private readonly bcryptService: BcryptService,
    ) { }

    async checkConflict(user: RegisterDto) {
        const getUserEmail = await this.userRepo
            .createQueryBuilder('user')
            .where('phone= :u_phone', {
                u_phone: user.phone,
            })
            .getMany();

        if (getUserEmail.length > 0) {
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
    async createUser(registerDto: RegisterDto) {
        try {
            const alreadyUser = await this.checkConflict(registerDto);
            if (alreadyUser) {
                return {
                    message: 'User Already Created',
                    status: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                }
            } else {
                const hashPassword = await this.bcryptService.hashPassword(
                    registerDto.password,
                );
                const n_user = this.userRepo.create({ ...registerDto, password: hashPassword });
                if (registerDto.invite_code == null || registerDto.invite_code == "") {
                    const r_user = await this.userRepo.save({ ...n_user, invite_code: generateUniqueString() });
                    return {
                        message: 'User registered Successfully',
                        data: { ...r_user },
                        status: true,
                        statusCode: HttpStatus.CREATED,
                    };
                } else {
                    const user = await this.checkUserWithInvitationCode(registerDto.invite_code);
                    if (!user) {
                        return {
                            message: 'Please Enter Valid Invitation Code',
                            status: false,
                            statusCode: HttpStatus.BAD_REQUEST,
                        }
                    } else {
                        await this.userRepo.createQueryBuilder('user').update(User).set(
                            {
                                reward_points: (user).reward_points + 10,
                            }
                        ).where("id = :id", { id: (user).id }).execute();
                        const r_user = await this.userRepo.save({ ...n_user, invite_code: generateUniqueString() });
                        return {
                            message: 'User registered Successfully',
                            data: { ...r_user },
                            status: true,
                            statusCode: HttpStatus.CREATED,
                        };
                    }
                }
            }
        } catch (error) {
            return {
                message: error.message,
                status: false,
                statusCode: HttpStatus.BAD_REQUEST,
            }
        }
    }


    async deleteUser(id: string) {
        try {
            await this.userRepo.delete({ id: id });
            return {
                status: true,
                statusCode: HttpStatus.OK,
                message: "User Deleted Sucessfully"
            }
        } catch (e) {
            return {
                status: false,
                statusCode: HttpStatus.BAD_REQUEST,
                message: e.message
            }
        }
    }

    async getAllUser() {
        let data = await this.userRepo.find();
        return {
            data: data
        }
    }


    async chnagePw(changePwDto: ChangePwDto, id: string){
        console.log(changePwDto.currentPassword);
        console.log(changePwDto.newPassword);
        const user = await this.userRepo
        .createQueryBuilder('user')
        .where('id= :id', {
            id: id,
        }).getOne();
        const isMatchPassword = await this.bcryptService.comparePassword(user.password, changePwDto.currentPassword);
    
        if(user){
            const isMatchPassword = await this.bcryptService.comparePassword(user.password, changePwDto.currentPassword);
           if(isMatchPassword){
            const hashPassword = await this.bcryptService.hashPassword(
                changePwDto.newPassword,
            );
            await this.userRepo.createQueryBuilder('user').update(User).set(
                {
                    password: hashPassword,
                }
            ).where("id = :id", { id: id }).execute();
            return{
                message: "Your password changed sucessfully",
                status: true,
                statusCode: HttpStatus.OK,
            }
           }else{
            return{
                status: false,
                message: "Your Password does not matched with current password",
                statusCode: HttpStatus.BAD_REQUEST
            }
           }
        }else{
            return{
                message: "Something went wrong",
                status: false,
                statusCode: HttpStatus.BAD_REQUEST,
            }
        }
                
    }


    async chnangeUserPasswordWithPhone(chnageDto: ChangePasswordDto) {
      try {
        console.log(chnageDto.phone);
        
        const getUser = await this.userRepo
        .createQueryBuilder('user')
        .where('phone= :phone', {
            phone: chnageDto.phone,
        }).getOne();

    if (getUser) {
        const hashPassword = await this.bcryptService.hashPassword(
            chnageDto.password,
        );
        await this.userRepo.createQueryBuilder('user').update(User).set(
            {
                password: hashPassword,
            }
        ).where("phone = :phone", { phone: chnageDto.phone }).execute();
        return {
            status: true,
            statusCode: HttpStatus.OK,
            message: "Password Chnaged Sucessfully"
        }
    }else{
        return{
            status: false,
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Please Enter the valid Number"
        }
    }
      } catch (error) {
        return{
            status: false,
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Something went wrong"
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