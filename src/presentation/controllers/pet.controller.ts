import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
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

  @Delete(':id')
  public async deletePet(@Param('id', ParseUUIDPipe) id: string) {
    await this.petService.deletePet(id);
  }
}
