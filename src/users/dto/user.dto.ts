import { IsEmail, MinLength } from "class-validator"

export class UserDto {
    @IsEmail()
    readonly email: string

    @MinLength(6, {message: 'Password must be more 6 symbols'})
    readonly password: string
}

