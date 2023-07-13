import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @Post('/login')
    login(@Body() userDto: UserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: UserDto) {
        return this.authService.registration(userDto)
    }
}