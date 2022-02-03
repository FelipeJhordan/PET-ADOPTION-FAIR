import {
  addZeroToString,
  getDate,
  getTime,
  getDateAndTime,
  formatJwtString,
} from 'shared/utils';

describe('Test utils', () => {
  it('Should return string with zero if have a single char', () => {
    let six = String(6);

    six = addZeroToString(six);

    expect(six).not.toEqual('6');
    expect(six).toEqual('06');
  });

  it('Should test getDateAndTime functions', () => {
    const dateMock = new Date('2022-01-31T08:57:31.749Z');

    const time = getTime(dateMock);
    const date = getDate(dateMock);

    const fc = {
      getDateAndTime,
    };

    jest
      .spyOn(fc, 'getDateAndTime')
      .mockImplementationOnce((mockparam) => ({
        date,
        time,
      }));

    const dateAndTime = fc.getDateAndTime(dateMock);

    expect(time).toBe('05:57:31');
    expect(date).toBe('31/01/2022');
    expect(time).toBe(dateAndTime.time);
    expect(date).toBe(dateAndTime.date);
    expect(fc.getDateAndTime(dateMock)).toEqual({ date, time });
  });

  it('Should test formatJwtString', () => {
    const token = 'Bearer thebearertoken1670965234';
    const formatedToken = formatJwtString(token);
    expect(formatedToken).toBe('thebearertoken1670965234');
  });
});
