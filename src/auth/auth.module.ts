import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { diskStorage } from "multer";
import { extname } from "path";
import { JWTStrategy } from "src/core/strategy/jwt.strategy";
import { User } from "src/user/entity/user.entity";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./services/auth.service";
import { BcryptService } from "./services/bcrypt.service";
import { jwtConstants } from "./services/jwtConstant";

@Module({
    imports: [
        // MulterModule.register({
        //     dest: './upload', // the directory where uploaded files will be saved
        //   }),
        MulterModule.register({
          storage: diskStorage({
            destination: './upload',
            filename: (req, file, cb) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              return cb(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
        }),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1day' },
          }),

     
    ],
    providers: [AuthService ,BcryptService, JWTStrategy],
    controllers : [AuthController],
})
export class AuthModule{};