import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private readonly configService: ConfigService) { }

    async createUser(userDto: UserDto) {

        const existUser = await this.userRepository.findOne({
            where: {
                email: userDto.email
            }
        })

        if (existUser) {
            throw new HttpException('User with this email exists', HttpStatus.BAD_REQUEST)
        }
        const hmac = crypto.createHmac('sha256', this.configService.get('HASH_SECRET'));
        hmac.update(userDto.password);
        const hashedPassword = hmac.digest('hex');
        try {
            const user = await this.userRepository.save({
                email: userDto.email,
                password: hashedPassword
            })
            return user
        } catch (error) {
            throw new Error(error)
        }

    }

    async getAllUsersByEmail() {
        try {
            return await this.userRepository.find()
        } catch (error) {
            throw new Error(error)
        }

    }

    async updateUser(userDto: UserDto, id: number) {
        try {
            let user = await this.userRepository.findOneBy({ id })

            const hmac = crypto.createHmac('sha256', this.configService.get('HASH_SECRET'));
            hmac.update(userDto.password);
            const hashedPassword = hmac.digest('hex');

            user.email = userDto.email;
            user.password = hashedPassword;

            const updatedUser = await this.userRepository.save(user);
            return updatedUser;
        } catch (error) {
            throw new Error(error)
        }

    }

    async deleteUser(id: number) {

        let user = await this.userRepository.findOneBy({ id })
        if (!user) { throw new NotFoundException('User not found')}
        await this.userRepository.delete(user);
        throw new HttpException('User deleted', HttpStatus.OK)

    }
}
