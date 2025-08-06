import { Body, Controller, HttpStatus, Post, SerializeOptions } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @ApiResponse({ status: HttpStatus.OK, description: 'register', type: TokenDto })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: TokenDto,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.authService.signUp(signUpDto);
    }

    @Post('/login')
    @ApiResponse({ status: HttpStatus.OK, description: 'login', type: TokenDto })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: TokenDto,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto.username, signInDto.password);
    }
}
