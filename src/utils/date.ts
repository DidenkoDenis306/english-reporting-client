import dayjs from 'dayjs';

export const formatMonthDayYear = (date?: string | Date): string =>
  dayjs(date).format('MMMM D, YYYY');

export const formatShortMonthDayYear = (date?: string | Date): string =>
  dayjs(date).format('MMM D, YYYY');

export const formatYearMonthDay = (date?: string | Date): string =>
  dayjs(date).format('YYYY-MM-DD');

export const formatMonthDay = (date?: string | Date): string =>
  dayjs(date).format('MMMM DD');

export const formatMonthDayYearTime = (date?: string | Date): string =>
  dayjs(date).format('MMM D, YYYY | h:mm A');
export const formatDate = (date?: string | Date): string =>
  dayjs(date).format('DD.MM.YYYY');
