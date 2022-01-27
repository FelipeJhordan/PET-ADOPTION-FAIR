import AddPetRequestDto from 'src/shared/dtos/pet/AddPetRequestDto';
import { Pet } from '../models/pet';

export interface IAddPetUseCase {
  addPet(pet: AddPetRequestDto): Promise<Pet>;
}
