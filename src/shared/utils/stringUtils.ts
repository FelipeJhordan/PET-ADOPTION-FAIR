export const addZeroToString = (value: any) =>
  value.toString().padStart(2, '0');

export const formatJwtString = (value: string) =>
  value.replace(/Bearer /i, '');
