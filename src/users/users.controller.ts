import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() usersDto: UserDto) {
        return this.usersService.createUser(usersDto)
    }

    @Get()
    findUserByEmail(@Body() usersDto: UserDto) {
        return this.usersService.getUserByEmail(usersDto.email)
    }

    @Get()
    findAllUsersByEmail() {
        return this.usersService.getAllUsersByEmail()
    }
}
