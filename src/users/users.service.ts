import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    async findAll(): Promise<User[]> {
        return this.usersRepository.findAll();
    }

    async findById(id: number): Promise<User> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findByEmail(email);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findByUsername(username);
    }

    async createUser(userData: {
        email: string;
        name: string;
        password: string;
        role?: UserRole;
        username?: string;
        phone?: string;
    }): Promise<User> {
        // По умолчанию роль - USER
        const role = userData.role || UserRole.USER;
        return this.usersRepository.createUser({
            ...userData,
            role,
        });
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        const updatedUser = await this.usersRepository.updateUser(id, userData);
        if (!updatedUser) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return updatedUser;
    }

    async deleteUser(id: number): Promise<void> {
        const deleted = await this.usersRepository.deleteUser(id);
        if (!deleted) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
