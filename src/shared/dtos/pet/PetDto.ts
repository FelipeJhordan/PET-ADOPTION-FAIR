import { Expose, plainToClass } from 'class-transformer';
import { SITUATION } from 'src/domain/models/enums/situation.enum';
import { STATE } from 'src/domain/models/enums/state.enum';
import { Pet } from 'src/domain/models/pet';

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
  created_at: Date;
  @Expose()
  updated_at: Date;

  static toDto(pet: Pet): PetDto {
    return plainToClass(PetDto, pet, {
      excludeExtraneousValues: true,
    });
  }
}
