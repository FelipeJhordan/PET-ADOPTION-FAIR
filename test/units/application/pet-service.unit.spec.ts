import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PetService } from 'application/services/pet.service';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';
import { NotFoundError } from 'rxjs';
import {
  petMock,
  petsMock,
  mockAddPetRequestDTO,
} from '../mocks/pet.mock';

describe('Pet service', () => {
  let petRepository: PetRepository;
  let petService: PetService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PetService,
        {
          provide: PetRepository,
          useFactory: () => ({
            save: jest.fn(() => true),
            findOne: jest.fn(() => true),
            find: jest.fn(() => true),
            update: jest.fn(() => true),
            delete: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    petRepository = module.get<PetRepository>(PetRepository);
    petService = module.get<PetService>(PetService);
  });

  it('should return a list of pets when call listPets', async () => {
    jest
      .spyOn(petRepository, 'find')
      .mockImplementation(async () => petsMock);

    const pets = await petService.listPets();
    expect(pets).toHaveLength(2);
    expect(pets[1].name).toBe(petsMock[1].name);
  });

  it('should return a pet by id', async () => {
    jest
      .spyOn(petRepository, 'findOne')
      .mockImplementation(async () => petMock);

    const pet = await petService.showById(petMock.id);
    expect(pet).toBeTruthy();
    expect(pet.name).toBe(petMock.name);
  });

  it('should throw if pet not exists', async () => {
    jest
      .spyOn(petRepository, 'findOne')
      .mockImplementation(async () => null);

    const pet = petService.showById(petMock.id);
    expect(pet).rejects.toThrow(NotFoundException);
  });

  it('should save a pet', async () => {
    jest
      .spyOn(petRepository, 'save')
      .mockReturnValueOnce(Promise.resolve(petMock));
    const pet = await petService.addPet(mockAddPetRequestDTO);
    expect(pet.name).toEqual(petMock.name);
  });

  it('should update a pet', async () => {
    jest.spyOn(petRepository, 'update');
  });
});
