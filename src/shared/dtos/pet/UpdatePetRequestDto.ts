import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SITUATION } from 'src/domain/models/enums/situation.enum';
import { STATE } from 'src/domain/models/enums/state.enum';
import { Pet } from 'src/domain/models/pet';

export default class UpdatePetRequestDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  breed?: string;

  @IsEnum(STATE)
  @IsOptional()
  state?: STATE;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsEnum(SITUATION)
  @IsOptional()
  situation?: SITUATION;

  static fromDto(petDto: UpdatePetRequestDto): Pet {
    return new Pet(
      petDto.breed,
      petDto.state,
      petDto.situation,
      petDto.name,
      petDto.observation,
    );
  }
}