const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekdayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const formatDateTime = (date: Date) =>
  date
    ? `${weekdayNames[date.getDay()]} ${
        monthNames[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
    : '';
