import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Req,
    SerializeOptions,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import type { IUserRequest } from '../auth/requests/user.request';
import { Roles } from '../auth/decorators/roles.decorator';
import { ERole } from './enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

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

    @ApiOperation({ summary: 'Получить пользователя по ID' })
    @ApiResponse({ status: 200, description: 'Пользователь найден', type: User })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Get(':id')
    @SerializeOptions({
        strategy: 'exposeAll',
        type: User,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.getUserById(id);
    }

    @ApiOperation({ summary: 'Обновить пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь обновлен', type: User })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Patch(':id')
    @SerializeOptions({
        strategy: 'exposeAll',
        type: User,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.updateUser(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Удалить пользователя' })
    @ApiResponse({ status: 200, description: 'Пользователь удален' })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERole.Admin)
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this.usersService.deleteUser(id);
        return { message: 'Пользователь успешно удален' };
    }
}
