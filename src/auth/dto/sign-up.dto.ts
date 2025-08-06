import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto implements ISignUpRequest {
    @ApiProperty({ example: 'username' })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    username: string;

    @ApiProperty({ example: 'name' })
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    name: string;

    @ApiProperty({ example: '+71112223344' })
    @IsPhoneNumber()
    @IsNotEmpty()
    @MaxLength(30)
    phone: string;

    @ApiProperty({
        example: 'example@email.com',
        description: 'Email of user',
    })
    @IsEmail()
    @MaxLength(255)
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'Pass#123',
        description: 'Password of user',
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
    @IsNotEmpty()
    password: string;
}

export interface ISignUpRequest {
    username: string;
    name: string;
    phone: string;
    email: string;
    password: string;
}
