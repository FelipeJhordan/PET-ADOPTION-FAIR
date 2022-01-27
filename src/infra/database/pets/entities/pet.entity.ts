import { SITUATION } from 'src/domain/models/enums/situation.enum';
import { STATE } from 'src/domain/models/enums/state.enum';
import { Pet } from 'src/domain/models/pet';
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
  },
});
