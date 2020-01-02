import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString() @MinLength(4) @MaxLength(20) @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {message: 'Password is too weak'},
    )
    password: string;
    // this is what this regular expression means
    // Passwords will contain at least 1 upper case letter
    // Passwords will contain at least 1 lower case letter
    // Passwords will contain at least 1 number or special character
    // There is no length validation (min, max) in this regex!
}
