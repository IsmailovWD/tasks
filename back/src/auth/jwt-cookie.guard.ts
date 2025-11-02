import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtCookieAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    return user;
  }

  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    if (!req.headers.authorization && req.cookies && req.cookies.access_token) {
      req.headers.authorization = `Bearer ${req.cookies.access_token}`;
    }
    return req;
  }
}
