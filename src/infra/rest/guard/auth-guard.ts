import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from 'application/protocols/jwt-payload.protocol';
import { Jwt } from 'application/protocols/jwt.protocol';
import { Request, Response } from 'express';
import { UserRepository } from 'infra/database/users/repositories/user.repository';
import { callError } from './utils/error-messages';
import { verifyRoleMatch } from './utils/verify-role';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private Jwt: Jwt,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private refletor: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const bearer = request.headers.authorization;
    if (bearer) {
      const validToken: boolean | IJwtPayload = await this.Jwt.verify(
        bearer,
      );
      if (!validToken) {
        throw callError['tokenInvalid'];
      }
      const id = validToken['id'];
      const role = await this.userRepository.findByIdAndReturnRole(
        id,
      );

      const requiredRoles = await this.refletor.get<string[]>(
        'roles',
        context.getHandler(),
      );
      const roleName: string = role.role_name;
      if (!verifyRoleMatch(roleName, requiredRoles)) {
        throw callError['noAuthorized'];
      }

      response.setHeader(
        'Authorization',
        'Bearer ' + (await this.Jwt.sign({ id })),
      );

      return true;
    }
    throw callError['noToken'];
  }
}
