import { Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { IUser } from './entities/user.entity';
import { SignUpDto } from '../auth/dto/sign-up.dto';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaClient) {}

    BASE_USER_SELECT = {
        id: true,
        email: true,
        username: true,
        role: true,
        name: true,
        phone: true,
        createdAt: true,
    };

    async getById(id: number): Promise<IUser | null> {
        return this.prisma.user.findUnique({
            where: { id: id },
            select: this.BASE_USER_SELECT,
        });
    }

    async getByEmail(email: string): Promise<IUser | null> {
        return this.prisma.user.findUnique({
            where: { email: email },
            select: this.BASE_USER_SELECT,
        });
    }

    async getByUsername(username: string): Promise<IUser | null> {
        return this.prisma.user.findUnique({
            where: { username: username },
            select: this.BASE_USER_SELECT,
        });
    }

    async getPassword(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        return user!.password;
    }

    async createUser(signUpDto: SignUpDto): Promise<IUser> {
        return this.prisma.user.create({
            data: {
                username: signUpDto.username,
                name: signUpDto.name,
                email: signUpDto.email,
                phone: signUpDto.phone,
                password: signUpDto.password,
                role: Role.User,
            },
            select: this.BASE_USER_SELECT,
        });
    }

    async updateUser(
        updateData: Partial<IUser & { password?: string }>,
        userId: number,
    ): Promise<IUser> {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                username: updateData.username,
                name: updateData.name,
                phone: updateData.phone,
                email: updateData.email,
                password: updateData.password,
            },
            select: this.BASE_USER_SELECT,
        });
    }

    async deleteUser(userId: number): Promise<void> {
        await this.prisma.user.delete({
            where: { id: userId },
        });
    }
}
