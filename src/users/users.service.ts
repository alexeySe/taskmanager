import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(dto: UserDto) {
        const user = await this.userRepository.save(dto)
        return user
    }

    async getAllUsersByEmail() {
        return await this.userRepository.find()
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOneBy({email})
        return user
       
    }
}
