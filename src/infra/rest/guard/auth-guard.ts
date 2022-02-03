import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Jwt } from 'application/protocols/jwt.protocol';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private Jwt: Jwt) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const bearer = request.headers.authorization;
    if (bearer) {
      const isValidToken = await this.Jwt.verify(bearer);
      if (!isValidToken) {
        throw new UnauthorizedException('You token is invalid');
      }
    }
    throw new UnauthorizedException('You do not have token');
  }
}
