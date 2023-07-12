import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(userDto:UserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email)
        if (user.email && user.password === userDto.email && userDto.password) {
            const {password, ...result} = user
            return result
        }
        
        return null
    }
}
