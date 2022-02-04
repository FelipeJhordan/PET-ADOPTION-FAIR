import { SITUATION } from 'domain/models/enums/situation.enum';
import { STATE } from 'domain/models/enums/state.enum';
import { Pet } from 'domain/models/pet';
import { EntitySchema } from 'typeorm';

export const PetEntity = new EntitySchema<Pet>({
  name: 'Pet',
  target: Pet,
  tableName: 'pets',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    state: {
      type: String,
      enum: STATE,
    },
    situation: {
      type: String,
      enum: SITUATION,
    },
    name: {
      type: String,
      nullable: true,
    },
    breed: {
      type: String,
    },
    observation: {
      type: String,
      nullable: true,
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

  relations: {
    user: {
      type: 'one-to-many',
      target: 'User',
      joinColumn: {
        name: 'id_user',
        referencedColumnName: 'id',
      },
      eager: true,
      cascade: ['recover'],
      inverseSide: 'pet',
    },
  },
});
