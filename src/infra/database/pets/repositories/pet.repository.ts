import { Pet } from 'domain/models/pet';
import UpdatePetRequestDto from 'shared/dtos/pet/UpdatePetRequestDto';
import { EntityRepository, Repository } from 'typeorm';
import { PetEntity } from '../entities/pet.entity';

@EntityRepository(PetEntity)
export class PetRepository extends Repository<Pet> {
  async updateAndGetPetById(
    id: string,
    pet: UpdatePetRequestDto,
  ): Promise<Pet> {
    const petAfterUpdate = await this.createQueryBuilder('pets')
      .update<Pet>(Pet, { ...pet })
      .where('pets.id = :id', { id })
      .returning('*')
      .updateEntity(true)
      .execute();
    return petAfterUpdate.raw[0];
  }
}
