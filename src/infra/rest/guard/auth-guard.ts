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
        throw new UnauthorizedException('You token is invalid');
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
      if (
        !(
          roleName.includes('ADMIN') ||
          requiredRoles.some((r) => r === roleName)
        )
      ) {
        throw new UnauthorizedException(
          'You are not authorized for this action',
        );
      }

      response.setHeader(
        'Authorization',
        'Bearer ' + (await this.Jwt.sign({ id })),
      );

      return true;
    }
    throw new UnauthorizedException('You do not have token');
  }
}
