import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from 'application/protocols/jwt-payload.protocol';
import { Jwt } from 'application/protocols/jwt.protocol';
import { Request } from 'express';
import { UserRepository } from 'infra/database/users/repositories/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private Jwt: Jwt,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

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
    }
    throw new UnauthorizedException('You do not have token');
  }
}
