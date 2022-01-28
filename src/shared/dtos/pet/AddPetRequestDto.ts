import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SITUATION } from 'src/domain/models/enums/situation.enum';
import { STATE } from 'src/domain/models/enums/state.enum';
import { Pet } from 'src/domain/models/pet';
import { IAddPetParams } from 'src/domain/protocols/pets/add-pet-params';

export default class AddPetRequestDto implements IAddPetParams {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsEnum(STATE)
  @IsNotEmpty()
  state: STATE;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsEnum(SITUATION)
  @IsNotEmpty()
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
