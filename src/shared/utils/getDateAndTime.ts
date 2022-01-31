import { addZeroToString } from './stringUtils';

export const getDate = (date: Date) =>
  `${addZeroToString(date.getDate())}/${addZeroToString(
    date.getMonth() + 1,
  )}/${date.getFullYear()}`;

export const getTime = (date: Date) =>
  `${addZeroToString(date.getHours())}:${addZeroToString(
    date.getMinutes(),
  )}:${addZeroToString(date.getSeconds())}`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getDateAndTime = (date: Date) => ({
  date: `${getDate(date)}`,
  time: `${getTime(date)}`,
});
