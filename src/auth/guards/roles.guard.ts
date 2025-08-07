import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '../../users/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ERole[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        // Если роли не указаны, разрешаем доступ
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        // Проверяем, что пользователь существует и имеет требуемую роль
        return requiredRoles.some((role) => user.role === role);
    }
}
