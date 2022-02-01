import { ROLE } from './enums/role.enum';
import { User } from './user';

export class Role {
  id?: string;
  name: string;
  user?: User;

  constructor(name: string, id?: string, user?: User) {
    this.name = name;
    this.id = ROLE[name];
    this.user = user;
  }
}
