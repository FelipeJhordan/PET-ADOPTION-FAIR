import { ROLE } from './enums/role.enum';

export class Role {
  id?: string;
  name: string;

  constructor(name: string, id?: string) {
    this.name = name;
    this.id = ROLE[name];
  }
}
