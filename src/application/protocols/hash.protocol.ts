import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Hash {
  abstract hash(value: string, salt?: number): Promise<string>;
  abstract compare(value: string, hash: string): Promise<boolean>;
}
