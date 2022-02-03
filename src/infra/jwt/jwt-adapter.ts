import { IJwtPayload } from 'application/protocols/jwt-payload.protocol';
import { Jwt } from 'application/protocols/jwt.protocol';
import jwt from 'jsonwebtoken';

export class JwtAdapter extends Jwt {
  async sign(payload: IJwtPayload): Promise<string> {
    const token = await jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || 'test_key',
      {
        expiresIn: process.env.JWT_EXP || 3600,
      },
    );

    return token;
  }

  async verify(token: string): Promise<boolean> {
    const isValidToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || 'test_key',
    );
  }
}
