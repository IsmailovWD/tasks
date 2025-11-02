import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TelegramService } from '../telegram/telegram.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private telegramService;
    constructor(usersService: UsersService, jwtService: JwtService, telegramService: TelegramService);
    validateUser(phone: string, pass: string): Promise<{
        name: string;
        phone: string;
        position?: string;
        bio?: string;
        _id: unknown;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    } | null>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            _id: any;
            name: any;
            phone: any;
        };
    }>;
    registerAndLogin(createDto: any): Promise<{
        token: string;
        user: Omit<import("../users/schemas/user.schema").User, "password">;
    }>;
    localLogin(phone: string, password: string): Promise<{
        access_token: string;
        user: {
            _id: any;
            name: any;
            phone: any;
        };
    }>;
}
