import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(userDto: UserDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                email: userDto.email
            }
        })
        if (existUser) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }
        const user = await this.userRepository.save({
            email: userDto.email,
            password: await bcrypt.hash(userDto.password, 5)
        })
        return user
    }

    async getAllUsersByEmail() {
        return await this.userRepository.find()
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOneBy({email})
        if(!user) {
            throw new NotFoundException('Пользователь с таким email не существует')
        }
        return user
       
    }
}
