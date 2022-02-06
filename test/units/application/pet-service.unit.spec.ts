import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PetService } from 'application/services/pet.service';
import { SITUATION } from 'domain/models/enums/situation.enum';
import { PetRepository } from 'infra/database/pets/repositories/pet.repository';
import { mockPetServiceProviders } from '../mocks/pet/pet-providers.mock';
import {
  petMock,
  petsMock,
  mockAddPetRequestDTO,
  mockUpdatePetRequestDto,
  mockAdoptPetServiceParams,
  mockAcceptAdoptParams,
} from '../mocks/pet/pet.mock';

describe('Pet service', () => {
  let petRepository: PetRepository;
  let petService: PetService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: await mockPetServiceProviders(),
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

  it('Should petService.adoptPet is called it correct values ', async () => {
    const findOneSpy = jest
      .spyOn(petRepository, 'findOne')
      .mockImplementationOnce(async () => Promise.resolve(petMock));

    await petService.adoptPet(mockAdoptPetServiceParams);

    expect(findOneSpy).toBeCalled();
    expect(findOneSpy).toBeCalledWith(
      mockAdoptPetServiceParams.id_pet,
    );
  });

  it('Should petRepository return a  pet  inside petService.adoptPet', async () => {
    const findOneSpy = jest.spyOn(petRepository, 'findOne');

    await petService.adoptPet(mockAdoptPetServiceParams);

    await expect(findOneSpy).not.toReturnWith(null);
  });
  it('Should petService.adoptPet throw NotFound if repository not found pet', async () => {
    const findOneSpy = jest
      .spyOn(petRepository, 'findOne')
      .mockReturnValueOnce(Promise.resolve(null));

    const promise = petService.adoptPet(mockAdoptPetServiceParams);
    expect(promise).rejects.toThrow(
      new NotFoundException('Pet não encontrado.'),
    );
  });
  it('Should throw if pet situation is ADOPTED  ', async () => {
    jest
      .spyOn(petRepository, 'findOne')
      .mockImplementationOnce(async () =>
        Promise.resolve({
          ...petMock,
          situation: SITUATION.ADOPTED,
        }),
      );

    const promise = petService.adoptPet(mockAdoptPetServiceParams);
    expect(promise).rejects.toThrow(
      new BadRequestException('Este pet já está adotado.'),
    );
  });

  it('Should useService.adoptPet call update in repository with correct values', async () => {
    const updatePetSpy = jest.spyOn(petRepository, 'update');

    await petService.adoptPet(mockAdoptPetServiceParams);
    const { id_pet, id_user } = mockAdoptPetServiceParams;
    expect(updatePetSpy).toBeCalledWith(id_pet, {
      user: { id: id_user },
      situation: SITUATION.IN_PROCESS,
    });
  });

  it('Should call petRepository.findOne with correct values', async () => {
    const acceptAdoptet = jest.spyOn(petRepository, 'findOne');
    await petService.acceptAdopt(mockAcceptAdoptParams);

    expect(acceptAdoptet).toBeCalledWith(
      mockAcceptAdoptParams.id_pet,
    );
  });
});
