import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SITUATION } from 'domain/models/enums/situation.enum';
import { STATE } from 'domain/models/enums/state.enum';
import { Pet } from 'domain/models/pet';
import { IAddPetParams } from 'domain/protocols/pets/add-pet-params';

export default class AddPetRequestDto implements IAddPetParams {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Rex',
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    examples: ['Shitzu', 'Yorkshire'],
  })
  breed: string;

  @IsEnum(STATE)
  @IsNotEmpty()
  @ApiProperty({
    enum: STATE,
  })
  state: STATE;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example:
      'Têm alta sensibilidade a barulhos estrondosos ( foguetes e raios )',
  })
  observation?: string;

  @IsEnum(SITUATION)
  @IsNotEmpty()
  @ApiProperty({
    enum: SITUATION,
  })
  situation: SITUATION;

  static fromDto(petDto: AddPetRequestDto): Pet {
    return new Pet(
      petDto.breed,
      petDto.state,
      petDto.situation,
      petDto.name,
      petDto.observation,
    );
  }
}
