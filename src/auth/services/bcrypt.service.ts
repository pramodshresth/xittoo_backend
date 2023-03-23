import * as bcrypt from 'bcrypt';

export class BcryptService {
    private static readonly saltRound = 2;

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, BcryptService.saltRound);
    }


    async comparePassword(
        req_password: string,
        ex_password: string,
    ): Promise<boolean> {
        return bcrypt.compare(ex_password, req_password);
    }

}