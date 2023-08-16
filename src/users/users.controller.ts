import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Create user'})
    @Post()
    create(@Body() usersDto: UserDto) {
        return this.usersService.createUser(usersDto)
    }
   
    @ApiOperation({summary: 'Get all users'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    findAllUsersByEmail() {
        return this.usersService.getAllUsersByEmail()
    }

    @ApiOperation({summary: 'Update user'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put()
    updateUser(@Body()userDto:UserDto, @Req() req){
        return this.usersService.updateUser(userDto, +req.user.id)
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() req){
        return this.usersService.deleteUser(+req.user.id)
    }
}
