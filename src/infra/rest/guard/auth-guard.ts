import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

// Não precisa de  @Injectable !!
export class AuthGuard implements CanActivate {
  constructor() {
    console.log('tou sendo chamado');
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.headers.authorization;
    if (token) {
      return true;
    }
    throw new UnauthorizedException('You do not have token');
  }
}
