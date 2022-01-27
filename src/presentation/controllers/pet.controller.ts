import { Body, Controller, Get, Post } from '@nestjs/common';
import { PetService } from 'src/application/services/pet.service';
import AddPetRequestDto from 'src/shared/dtos/pet/AddPetRequestDto';
import PetDto from 'src/shared/dtos/pet/PetDto';

@Controller('/pets')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  public async listPets(): Promise<PetDto[]> {
    return (await this.petService.listPets()).map((pet) =>
      PetDto.toDto(pet),
    );
  }

  @Post()
  public async addPet(
    @Body() addPet: AddPetRequestDto,
  ): Promise<PetDto> {
    const pet = await this.petService.addPet(addPet);

    return PetDto.toDto(pet);
  }
}
