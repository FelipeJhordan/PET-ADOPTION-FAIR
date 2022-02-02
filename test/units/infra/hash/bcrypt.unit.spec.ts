import bcrypt from 'bcrypt';
import { BcryptAdapter } from 'infra/hash/bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash');
  },
  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter();
};

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut();
    const hash = await sut.hash('any_value');
    expect(hash).toBe('hash');
  });

  test('Should throws Error if hash throws ', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.hash('any_value');
    await expect(promise).rejects.toThrow();
  });

  test('Should call compare with correct values', async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', 'hashed_value');
    expect(compareSpy).toHaveBeenCalledWith(
      'any_value',
      'hashed_value',
    );
  });

  test('Should return a boolean if compare returns true', async () => {
    const sut = makeSut();
    const compareResult = await sut.compare(
      'any_value',
      'hashed_value',
    );
    expect(compareResult).toBe(true);
  });

  test('Should throws Error if hash throws ', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.compare('any_value', 'hashed_value');
    await expect(promise).rejects.toThrow();
  });
});
