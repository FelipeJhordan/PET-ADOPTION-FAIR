import { Pet } from '../models/pet';

export interface IListPetsUsecase {
  listPets(): Promise<Pet[]>;
}
