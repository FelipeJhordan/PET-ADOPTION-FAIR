import { Test } from '@nestjs/testing';
import { PetService } from 'application/services/pet.service';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';
import { petsMock } from '../mocks/pet.mock';

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
});
