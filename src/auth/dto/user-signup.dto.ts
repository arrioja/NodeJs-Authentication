import { IsEmail } from 'class-validator';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class UserSignUpDto extends AuthCredentialsDto {
    @IsEmail()
    email: string;

}
