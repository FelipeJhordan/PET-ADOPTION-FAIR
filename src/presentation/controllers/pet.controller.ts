import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PetService } from 'application/services/pet.service';
import { AuthGuard } from 'infra/rest/guard/auth-guard';
import { Roles } from 'presentation/decorators/roles.decorator';
import { UserDecorator } from 'presentation/decorators/user.decorator';
import AddPetRequestDto from 'shared/dtos/pet/AddPetRequestDto';
import PetDto from 'shared/dtos/pet/PetDto';
import UpdatePetRequestDto from 'shared/dtos/pet/UpdatePetRequestDto';

@ApiTags('pets')
@UseGuards(AuthGuard)
@Controller('/pets')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  @Roles('COMMON', 'CLERK')
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 200, description: 'Ok' })
  public async listPets(): Promise<PetDto[]> {
    return (await this.petService.listPets()).map((pet) =>
      PetDto.toDto(pet),
    );
  }

  @Get(':id')
  @Roles('COMMON', 'CLERK')
  public async showById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PetDto> {
    const pet = await this.petService.showById(id);
    return PetDto.toDto(pet);
  }

  @Post()
  @Roles('CLERK')
  public async addPet(
    @Body() addPet: AddPetRequestDto,
  ): Promise<PetDto> {
    const pet = await this.petService.addPet(addPet);

    return PetDto.toDto(pet);
  }

  @Delete(':id')
  @Roles('CLERK')
  public async deletePet(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.petService.deletePet(id);
  }

  @Put(':id')
  @Roles('CLERK')
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

  @Patch(':id/adopt')
  @Roles('COMMON', 'CLERK')
  public async adoptedPet(
    @Param('id') id_pet: string,
    @UserDecorator() id_user: string,
  ) {
    await this.petService.adoptPet({ id_pet, id_user });
  }

  @Patch(':id/accept')
  @Roles('CLERK')
  public async acceptAdopt(
    @Param('id') id_pet: string,
    @UserDecorator() id_user: string,
  ) {
    await this.petService.acceptAdopt({ id_pet, id_user });
  }
}
