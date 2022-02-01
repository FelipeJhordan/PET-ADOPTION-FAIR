import { Role } from 'domain/models/role';
import { User } from 'domain/models/user';
import { EntitySchema } from 'typeorm';

export const RoleEntity = new EntitySchema<Role>({
  name: 'Role',
  target: Role,
  tableName: 'roles',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: String,
    },
  },
  relations: {
    user: {
      type: 'one-to-one',
      target: 'User',
    },
  },
});
