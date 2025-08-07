import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ example: 'username', required: false })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsOptional()
    username?: string;

    @ApiProperty({ example: 'name', required: false })
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    @IsOptional()
    name?: string;

    @ApiProperty({ example: '+71112223344', required: false })
    @IsPhoneNumber()
    @MaxLength(30)
    @IsOptional()
    phone?: string;

    @ApiProperty({
        example: 'example@email.com',
        description: 'Email of user',
        required: false
    })
    @IsEmail()
    @MaxLength(255)
    @IsOptional()
    email?: string;

    @ApiProperty({
        example: 'Pass#123',
        description: 'Password of user',
        required: false
    })
    @MinLength(8, {
        message: 'password too short',
    })
    @MaxLength(20, {
        message: 'password too long',
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    @IsOptional()
    password?: string;
}

export interface IUpdateUserRequest {
    username?: string;
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
}