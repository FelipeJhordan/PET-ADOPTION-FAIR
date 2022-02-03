import { IJwtPayload } from 'application/protocols/jwt-payload.protocol';
import { verify } from 'crypto';
import { JwtAdapter } from 'infra/jwt/jwt-adapter';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  async sign(payload: IJwtPayload): Promise<string> {
    return 'token';
  },

  async verify(
    token: string,
    secret_key: string,
  ): Promise<string | IJwtPayload> {
    return 'id_user';
  },
}));

const makeSut = (): JwtAdapter => new JwtAdapter();

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.sign({ id: '12345' });
    expect(signSpy).toBeCalled();
    expect(signSpy).toBeCalledWith({ id: '12345' }, 'test_key', {
      expiresIn: 3600,
    });
  });
  test('Should return a valid jwt token', async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    const signResult = await sut.sign({ id: '12345' });

    expect(signSpy).toHaveReturnedWith(Promise.resolve('token'));
    expect(signResult).toBe('token');
  });

  test('Should throws Error if jwtwebtoken throws', async () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.sign({ id: '12345' });
    await expect(promise).rejects.toThrow();
  });

  test('Should call verify with correct values', async () => {
    const sut = makeSut();
    const verifySpy = jest.spyOn(jwt, 'verify');

    sut.verify('token');

    expect(verifySpy).toBeCalledWith('token', 'test_key');
  });
});
