import { Injectable } from '@nestjs/common';
import { IJwtPayload } from './jwt-payload.protocol';

@Injectable()
export abstract class Jwt {
  abstract sign(payload: IJwtPayload): Promise<string>;

  abstract verify(token: string): Promise<boolean | IJwtPayload>;
}
