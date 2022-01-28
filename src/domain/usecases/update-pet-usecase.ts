import { Pet } from '../models/pet';
import { IUpdatePetParams } from '../protocols/pets/update-pet-params';

export default interface IUpdatePet {
  updatePet(id: string, pet: IUpdatePetParams): Promise<Pet>;
}
