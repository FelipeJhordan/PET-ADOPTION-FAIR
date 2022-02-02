import { IJwtPayload } from 'application/protocols/jwt-payload.protocol';
import { JwtAdapter } from 'infra/jwt/jwt-adapter';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  async sign(payload: IJwtPayload): Promise<string> {
    return String('token ');
  },
}));

const makeSut = () => new JwtAdapter();

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
});
