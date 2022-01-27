import UpdatePetRequestDto from 'src/shared/dtos/pet/UpdatePetRequestDto';
import { Pet } from '../models/pet';

export default interface IUpdatePet {
  updatePet(id: string, pet: UpdatePetRequestDto): Promise<Pet>;
}
