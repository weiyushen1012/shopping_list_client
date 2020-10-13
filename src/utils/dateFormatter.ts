import { monthNames, weekdayNames } from './configs';

const getMonthYearDay = (date: Date): string =>
  `${weekdayNames[date.getDay()]} ${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

const getHour = (date: Date): string =>
  `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}`.padStart(
    2,
    '0'
  );

const getMinute = (date: Date): string =>
  `${date.getMinutes()}`.padStart(2, '0');

export const formatDateTime = (date: Date) =>
  date
    ? `${getMonthYearDay(date)}, ${getHour(date)}:${getMinute(date)} ${
        date.getHours() > 12 ? 'PM' : 'AM'
      }`
    : '';
