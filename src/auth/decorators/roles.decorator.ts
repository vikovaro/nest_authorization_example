import { SetMetadata } from '@nestjs/common';
import { ERole } from '../../users/enums/role.enum';

export const Roles = (...roles: ERole[]) => SetMetadata('roles', roles);
