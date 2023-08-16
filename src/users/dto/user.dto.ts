import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, MinLength } from "class-validator"

export class UserDto {
    @ApiProperty({example: 'user@mail.com'})
    @IsEmail()
    readonly email: string

    @ApiProperty({example: '123456'})
    @MinLength(6, {message: 'Password must be more 6 symbols'})
    readonly password: string
}

