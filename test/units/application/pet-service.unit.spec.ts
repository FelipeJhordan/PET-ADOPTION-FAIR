import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PetService } from 'application/services/pet.service';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';
import {
  petMock,
  petsMock,
  mockAddPetRequestDTO,
  mockUpdatePetRequestDto,
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
            softDelete: jest.fn(() => true),
            updateAndGetPetById: jest.fn(() => true),
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

  it('should show throw if pet not exists', async () => {
    jest
      .spyOn(petRepository, 'findOne')
      .mockImplementation(async () => null);

    const response = petService.showById(petMock.id);
    expect(response).rejects.toThrow(NotFoundException);
  });

  it('should save a pet', async () => {
    jest
      .spyOn(petRepository, 'save')
      .mockReturnValueOnce(Promise.resolve(petMock));
    const pet = await petService.addPet(mockAddPetRequestDTO);
    expect(pet.name).toEqual(petMock.name);
  });

  it('should remove a pet', async () => {
    jest
      .spyOn(petRepository, 'softDelete')
      .mockImplementation(async () => Promise.resolve(null));
    const response = await petService.deletePet(petMock.id);

    expect(response).toBeUndefined();
  });

  it('should remove throw notFoundException if ID not exists', async () => {
    jest
      .spyOn(petRepository, 'findOne')
      .mockImplementation(async () => null);

    const response = petService.deletePet(petMock.id);

    expect(response).rejects.toThrow(new NotFoundException());
  });

  it('should update a pet', async () => {
    jest
      .spyOn(petRepository, 'updateAndGetPetById')
      .mockReturnValueOnce(
        Promise.resolve({ ...petMock, name: 'Tobias' }),
      );
    const petUpdated = await petService.updatePet(
      petMock.id,
      mockUpdatePetRequestDto,
    );

    expect(petUpdated).toBeTruthy();
    expect(petUpdated.id).toBe(petMock.id);
    expect(petUpdated.name).toMatch(/Tobias/gi);
  });

  it('should updatePet throw notFoundException if ID not exists', async () => {
    jest
      .spyOn(petRepository, 'findOne')
      .mockImplementation(async () => null);

    const response = petService.updatePet(petMock.id, {
      ...petMock,
      name: 'Tobias',
    });

    expect(response).rejects.toThrow(new NotFoundException());
  });
});
