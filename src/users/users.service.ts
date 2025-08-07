import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUser } from './entities/user.entity';

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
}
