import { Pet } from '../../models/pet';
import { IAddPetParams } from '../../protocols/pets/add-pet-params';

export interface IAddPetUseCase {
  addPet(pet: IAddPetParams): Promise<Pet>;
}
