import { Person } from 'domain/models/Person';
import { EntitySchema } from 'typeorm';

export const PersonEntity = new EntitySchema<Person>({
  name: 'Person',
  target: Person,
  tableName: 'persons',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
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
});
