import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() usersDto: UserDto) {
        return this.usersService.createUser(usersDto)
    }
   
    @UseGuards(JwtAuthGuard)
    @Get()
    findAllUsersByEmail() {
        return this.usersService.getAllUsersByEmail()
    }
    @UseGuards(JwtAuthGuard)
    @Put()
    updateUser(@Body()userDto:UserDto, @Req() req){
        return this.usersService.updateUser(userDto, +req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() req){
        return this.usersService.deleteUser(+req.user.id)
    }
}
