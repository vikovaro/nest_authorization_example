import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenDto } from './dto/token.dto';
import { IUser } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<TokenDto> {
        const existingUserByEmail = await this.usersRepository.getByEmail(signUpDto.email);
        if (existingUserByEmail) {
            throw new ConflictException('Пользователь с таким email уже существует');
        }

        const user = await this.usersRepository.createUser(signUpDto);

        return this.generateToken(user);
    }

    async signIn(username: string, password: string): Promise<TokenDto> {
        const user = await this.usersRepository.getByUsername(username);
        if (!user) {
            throw new UnauthorizedException('Неверные учетные данные');
        }

        const userPassword = await this.usersRepository.getPassword(user.id);

        const isPasswordValid = await this.validatePassword(password, userPassword);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Неверные учетные данные');
        }

        return this.generateToken(user);
    }

    private async validatePassword(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    private generateToken(user: IUser): TokenDto {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            token: this.jwtService.sign(payload),
        };
    }
}
