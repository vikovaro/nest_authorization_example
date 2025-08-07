import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async getUserById(userId: number): Promise<IUser> {
        const user = await this.usersRepository.getById(userId);

        if (!user) {
            throw new NotFoundException('user-not-found');
        }

        return user;
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<IUser> {
        const user = await this.getUserById(userId);

        let hashedPassword: string | undefined;
        if (updateUserDto.password) {
            const salt = await bcrypt.genSalt();
            hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
        }

        return this.usersRepository.updateUser(
            {
                ...updateUserDto,
                password: hashedPassword,
            },
            userId,
        );
    }

    async deleteUser(userId: number): Promise<void> {
        const user = await this.getUserById(userId);

        await this.usersRepository.deleteUser(userId);
    }
}
