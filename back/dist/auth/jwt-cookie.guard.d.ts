import { ExecutionContext } from '@nestjs/common';
declare const JwtCookieAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtCookieAuthGuard extends JwtCookieAuthGuard_base {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext): any;
    getRequest(context: ExecutionContext): any;
}
export {};
