import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenDto } from './dto/token.dto';
import { IUser } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<TokenDto> {
        const existingUserByEmail = await this.usersService.findByEmail(signUpDto.email);
        if (existingUserByEmail) {
            throw new ConflictException('Пользователь с таким email уже существует');
        }

        const user = await this.usersService.createUser({
            email: signUpDto.email,
            name: signUpDto.name,
            password: signUpDto.password,
        });

        return this.generateToken(user);
    }

    async signIn(username: string, password: string): Promise<TokenDto> {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new UnauthorizedException('Неверные учетные данные');
        }

        const isPasswordValid = await this.validatePassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверные учетные данные');
        }

        return this.generateToken(user);
    }

    private async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    private generateToken(user: IUser): TokenDto {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}