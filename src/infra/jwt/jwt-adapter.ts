import { IJwtPayload } from 'application/protocols/jwt-payload.protocol';
import { Jwt } from 'application/protocols/jwt.protocol';
import jwt from 'jsonwebtoken';
import { formatJwtString } from 'shared/utils';
import { isEmptyObject } from 'shared/utils/objectUtils';

export class JwtAdapter extends Jwt {
  private JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'test_key'; // poderia utilizar o configModule também ☣
  private JWT_EXP = process.env.JWT_EXP || 3600;

  async sign(payload: IJwtPayload): Promise<string> {
    const token = await jwt.sign(payload, this.JWT_SECRET_KEY, {
      expiresIn: this.JWT_EXP,
    });

    return token;
  }

  async verify(token: string): Promise<boolean | IJwtPayload> {
    const tokenFormated = formatJwtString(token);
    try {
      const tokenResult = (await jwt.verify(
        tokenFormated,
        this.JWT_SECRET_KEY,
      )) as IJwtPayload;
      const invalid = isEmptyObject(tokenResult);

      if (invalid) return false;

      return tokenResult;
    } catch (e) {
      return false;
    }
  }
}
