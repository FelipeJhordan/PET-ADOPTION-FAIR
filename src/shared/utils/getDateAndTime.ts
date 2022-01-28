import { addZeroToString } from './stringUtils';

const currentdate = new Date();
const datetime =
  'Last Sync: ' +
  currentdate.getDate() +
  '/' +
  (currentdate.getMonth() + 1) +
  '/' +
  currentdate.getFullYear() +
  ' @ ' +
  currentdate.getHours() +
  ':' +
  currentdate.getMinutes() +
  ':' +
  currentdate.getSeconds();

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
  date: `${getDate} `,
  time: `${getTime}`,
});
