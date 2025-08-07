import { Controller, Get, HttpStatus, Req, SerializeOptions, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import type { IUserRequest } from '../auth/requests/user.request';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/me')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiResponse({ status: HttpStatus.OK, description: 'getMe', type: User })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: User,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getMe(@Req() req: IUserRequest) {
        return await this.usersService.getUserById(req.user.id);
    }

    // @ApiOperation({ summary: 'Получить всех пользователей' })
    // @ApiResponse({ status: 200, description: 'Список пользователей', type: [User] })
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(UserRole.ADMIN)
    // @Get()
    // findAll() {
    //     return this.usersService.findAll();
    // }
    //
    // @ApiOperation({ summary: 'Получить пользователя по ID' })
    // @ApiResponse({ status: 200, description: 'Пользователь найден', type: User })
    // @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(UserRole.ADMIN)
    // @Get(':id')
    // findOne(@Param('id', ParseIntPipe) id: number) {
    //     return this.usersService.findById(id);
    // }
    //
    // @ApiOperation({ summary: 'Создать нового пользователя' })
    // @ApiResponse({ status: 201, description: 'Пользователь создан', type: User })
    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.createUser(createUserDto);
    // }
    //
    // @ApiOperation({ summary: 'Обновить пользователя' })
    // @ApiResponse({ status: 200, description: 'Пользователь обновлен', type: User })
    // @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(UserRole.ADMIN)
    // @Patch(':id')
    // update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.updateUser(id, updateUserDto);
    // }
    //
    // @ApiOperation({ summary: 'Удалить пользователя' })
    // @ApiResponse({ status: 200, description: 'Пользователь удален' })
    // @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(UserRole.ADMIN)
    // @Delete(':id')
    // remove(@Param('id', ParseIntPipe) id: number) {
    //     return this.usersService.deleteUser(id);
    // }
}
