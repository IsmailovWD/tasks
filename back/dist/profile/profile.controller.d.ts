import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
export declare class ProfileController {
    private usersService;
    constructor(usersService: UsersService);
    me(req: any): Promise<import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").UserDocument, {}, {}> & import("../users/schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(req: any, dto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").UserDocument, {}, {}> & import("../users/schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
