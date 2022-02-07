import { Expose, plainToClass } from 'class-transformer';
import { SITUATION } from 'domain/models/enums/situation.enum';
import { STATE } from 'domain/models/enums/state.enum';
import { Pet } from 'domain/models/pet';

export default class PetDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  breed: string;
  @Expose()
  state: STATE;
  @Expose()
  observation?: string;
  @Expose()
  situation: SITUATION;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  deletedAt: Date;

  static toDto(pet: Pet): PetDto {
    return plainToClass(PetDto, pet, {
      excludeExtraneousValues: true,
    });
  }
}
