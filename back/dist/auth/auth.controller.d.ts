import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: CreateUserDto, res: Response): Promise<{
        user: Omit<import("../users/schemas/user.schema").User, "password">;
        access_token: string;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        user: {
            _id: any;
            name: any;
            phone: any;
        };
        access_token: string;
    }>;
    logout(res: Response): Promise<{
        ok: boolean;
    }>;
}
