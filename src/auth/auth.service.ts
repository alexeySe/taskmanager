import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'

export interface IUser {
    id: string,
    email: string
}

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService) { }

    async login(user: IUser) {
        const {id, email} = user
        return {
            id, email, token: this.jwtService.sign({id: user.id, email: user.email})
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email)
        const passwordEquals = await bcrypt.compare(password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Некорректный емайл или пароль' })
    }


}
