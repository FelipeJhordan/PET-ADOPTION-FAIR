import { Hash } from 'application/protocols/hash.protocol';
import { compare, hash } from 'bcrypt';

export class BcryptAdapter implements Hash {
  async hash(value: string, salt?: number): Promise<string> {
    const SALT = salt || 12;

    const valueHashed = hash(value, SALT);

    return valueHashed;
  }
  async compare(value: string, hash: string): Promise<boolean> {
    const is = await compare(value, hash);

    return is;
  }
}
