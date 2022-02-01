import { Person } from 'domain/models/person';
import { Role } from 'domain/models/role';
import { User } from 'domain/models/user';
import { EntitySchema } from 'typeorm';

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    createdAt: {
      name: 'createdAt',
      type: Date,
      createDate: true,
    },
    updatedAt: {
      name: 'updatedAt',
      type: Date,
      updateDate: true,
    },
    deletedAt: {
      name: 'deletedAt',
      type: Date,
      nullable: true,
      deleteDate: true,
    },
  },
  orderBy: {
    createdAt: 'ASC',
  },

  relations: {
    role: {
      type: 'one-to-one',
      target: 'Role',
      eager: true,
      cascade: ['insert'],
      inverseSide: 'role',
    },

    person: {
      type: 'one-to-one',
      target: 'Person',
      eager: true,
      cascade: ['insert'],
      inverseSide: 'person',
    },
  },
});
