import { Injectable } from '@nestjs/common';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
    private users: User[] = [];
    private idCounter = 1;

    constructor() {
        this.createUser({
            email: 'admin@example.com',
            name: 'Admin',
            username: 'admin',
            phone: '+71112223344',
            password: 'admin123',
            role: UserRole.ADMIN,
        });
        this.createUser({
            email: 'user@example.com',
            name: 'User',
            username: 'user',
            phone: '+71112223355',
            password: 'user123',
            role: UserRole.USER,
        });
    }

    async findAll(): Promise<User[]> {
        return this.users.map((user) => new User(user));
    }

    async findById(id: number): Promise<User | undefined> {
        const user = this.users.find((user) => user.id === id);
        return user ? new User(user) : undefined;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find((user) => user.email === email);
        return user ? new User(user) : undefined;
    }

    async findByUsername(username: string): Promise<User | undefined> {
        const user = this.users.find((user) => user.username === username);
        return user ? new User(user) : undefined;
    }

    async createUser(userData: {
        email: string;
        name: string;
        password: string;
        role: UserRole;
        username?: string;
        phone?: string;
    }): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUser = new User({
            id: this.idCounter++,
            email: userData.email,
            name: userData.name,
            password: hashedPassword,
            role: userData.role,
            username: userData.username || userData.email, // Если username не указан, используем email
            phone: userData.phone || '', // Если phone не указан, используем пустую строку
        });

        this.users.push(newUser);
        return new User(newUser);
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
        const userIndex = this.users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return undefined;
        }

        // Если обновляется пароль, хешируем его
        if (userData.password) {
            const salt = await bcrypt.genSalt();
            userData.password = await bcrypt.hash(userData.password, salt);
        }

        this.users[userIndex] = {
            ...this.users[userIndex],
            ...userData,
        };

        return new User(this.users[userIndex]);
    }

    async deleteUser(id: number): Promise<boolean> {
        const initialLength = this.users.length;
        this.users = this.users.filter((user) => user.id !== id);
        return initialLength !== this.users.length;
    }
}