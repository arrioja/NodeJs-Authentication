import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserSignUpDto } from '../auth/dto/user-signup.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(userSignUpDto: UserSignUpDto): Promise<void> {
        const { username, password, email } = userSignUpDto;

        const user = new User();
        user.username = username;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        } catch (error) {
           if (error.code === '23505') { // duplicate username error code
               throw new ConflictException('Username already exists');
           } else {
               throw new InternalServerErrorException();
           }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
