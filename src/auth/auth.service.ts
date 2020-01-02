import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserSignUpDto } from './dto/user-signup.dto';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(userSignUpDto: UserSignUpDto): Promise<void> {
        return this.userRepository.signUp(userSignUpDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!user) {
            throw new UnauthorizedException('Invalid Credentials');
        }

        const {id, username, email, roles} = user;

        const payload: JwtPayload = { id, username, email, roles };
        const accessToken = await this.jwtService.sign(payload);

//        this.logger.debug(`Generated JWT Token with Payload ${JSON.stringify(payload)}`);
        this.logger.debug(`Logged user, generated JWT Token`);

        return { accessToken };
    }
}
