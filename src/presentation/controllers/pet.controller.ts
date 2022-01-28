import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PetService } from 'src/application/services/pet.service';
import AddPetRequestDto from 'src/shared/dtos/pet/AddPetRequestDto';
import PetDto from 'src/shared/dtos/pet/PetDto';
import UpdatePetRequestDto from 'src/shared/dtos/pet/UpdatePetRequestDto';

@Controller('/pets')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  public async listPets(): Promise<PetDto[]> {
    return (await this.petService.listPets()).map((pet) =>
      PetDto.toDto(pet),
    );
  }

  @Get(':id')
  public async showById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PetDto> {
    const pet = await this.petService.showById(id);
    return PetDto.toDto(pet);
  }

  @Post()
  public async addPet(
    @Body() addPet: AddPetRequestDto,
  ): Promise<PetDto> {
    const pet = await this.petService.addPet(addPet);

    return PetDto.toDto(pet);
  }

  @Delete(':id')
  public async deletePet(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.petService.deletePet(id);
  }

  @Put(':id')
  public async updatePet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetRequestDto: UpdatePetRequestDto,
  ): Promise<PetDto> {
    const pet = await this.petService.updatePet(
      id,
      updatePetRequestDto,
    );
    return PetDto.toDto(pet);
  }
}
