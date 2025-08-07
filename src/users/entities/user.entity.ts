import { ERole, TRole } from '../enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class User implements IUser {
    @ApiProperty({ example: '4da06a83-abf8-4f00-9423-fc06acd0f21d' })
    @Expose()
    id: number;

    @ApiProperty({ example: 'username' })
    @Expose()
    username: string;

    @ApiProperty({ example: 'name' })
    @Expose()
    name: string;

    @ApiProperty({ example: '+71112223344' })
    @Expose()
    phone: string;

    @ApiProperty({ example: 'example@gmail.com' })
    @Expose()
    email: string;

    @ApiProperty({ enum: ERole })
    @Expose()
    role: ERole;

    @ApiProperty()
    @Expose()
    createdAt: Date;
}

export interface IUser {
    id: number;
    username: string;
    name: string;
    phone: string;
    email: string;
    role: TRole;
    createdAt: Date;
}
