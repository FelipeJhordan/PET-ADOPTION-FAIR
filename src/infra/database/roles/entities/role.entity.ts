import { Role } from 'domain/models/role';
import { EntitySchema } from 'typeorm';

export const PetEntity = new EntitySchema<Role>({
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
});
