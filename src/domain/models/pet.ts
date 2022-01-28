import { SITUATION } from './enums/situation.enum';
import { STATE } from './enums/state.enum';

export class Pet {
  id: string;
  name?: string;
  breed: string;
  state: STATE;
  observation?: string;
  situation: SITUATION;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  constructor(
    breed: string,
    state: STATE,
    situation: SITUATION,
    name?: string,
    observation?: string,
    id?: string,
    deletedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.breed = breed;
    this.state = state;
    this.situation = situation;
    this.name = name;
    this.observation = observation;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
