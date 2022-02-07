import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { SITUATION } from 'domain/models/enums/situation.enum';
import { STATE } from 'domain/models/enums/state.enum';
import { Pet } from 'domain/models/pet';

export default class PetDto {
  @Expose()
  id: string;
  @Expose()
  @ApiProperty({
    example: 'Shusco',
  })
  name: string;
  @Expose()
  @ApiProperty({
    example: 'Husk',
  })
  breed: string;
  @Expose()
  @ApiProperty({
    enum: STATE,
  })
  state: STATE;
  @Expose()
  @ApiProperty({
    example: 'Agressivo após tomar banho',
  })
  observation?: string;
  @Expose()
  @ApiProperty({
    enum: SITUATION,
  })
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
