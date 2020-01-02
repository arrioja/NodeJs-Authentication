import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from '../user/user.entity';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorators';
import { RolesAllowed } from '../roles.obfuscation';
import { UserSignUpDto } from './dto/user-signup.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) userSignUpDto: UserSignUpDto): Promise<void> {
        return this.authService.signUp(userSignUpDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(RolesAllowed.ADMIN, RolesAllowed.ROOT)
    test(@GetUser() user: User) {
        // tslint:disable-next-line: no-console
        console.log(user);
    }

}
