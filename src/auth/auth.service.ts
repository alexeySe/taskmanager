import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export interface IUser {
    id: string,
    email: string
}

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
        private readonly configService: ConfigService) { }

    async login(user: IUser) {
        const { id, email } = user
        return {
            id, email, token: this.jwtService.sign({ id: user.id, email: user.email })
        }
    }

    async validateUser(email: string, password: string) {
        const hmac = crypto.createHmac('sha256', this.configService.get('HASH_SECRET'));
        hmac.update(password);
        const hashedPassword = hmac.digest('hex');

        const user = await this.getUserByEmail(email)

        if (user && hashedPassword === user.password) {
            return user
        }
        throw new UnauthorizedException({ message: 'Incorrect email or password' })
    }

    async getUserByEmail(email: string) {
            const user = await this.userRepository.findOneBy({ email })
            if (!user) {
                throw new NotFoundException('Пользователь с таким email не существует')
            }
            return user
    }
}