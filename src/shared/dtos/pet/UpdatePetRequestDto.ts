import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SITUATION } from 'domain/models/enums/situation.enum';
import { STATE } from 'domain/models/enums/state.enum';
import { Pet } from 'domain/models/pet';
import { IUpdatePetParams } from 'domain/protocols/pets/update-pet-params';

export default class UpdatePetRequestDto implements IUpdatePetParams {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Mel',
  })
  name: string;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'yorkshire',
  })
  breed?: string;

  @IsEnum(STATE)
  @IsOptional()
  @ApiProperty({
    enum: STATE,
  })
  state?: STATE;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Não come rações de peixe',
  })
  observation?: string;

  @IsEnum(SITUATION)
  @IsOptional()
  @ApiProperty({
    enum: SITUATION,
  })
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
