import { ERole } from '../../users/enums/role.enum';

export interface IUserRequest extends Request {
    user: {
        id: number;
        username: string;
        role: ERole;
    };
}
