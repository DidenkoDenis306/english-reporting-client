import dayjs from 'dayjs';
import { useState } from 'react';

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

interface UseCalendarProps {
  currentDate: dayjs.Dayjs;
}

export const useCalendar = ({ currentDate }: UseCalendarProps) => {
  const today = dayjs();
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  const config = { month: { columns: 7, rows: 6 } };
  const { columns, rows } = config.month;

  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const getFirstDayOfMonth = () =>
    dayjs(new Date(currentYear, currentMonth, 1)).day();

  const getDaysInMonth = (year: number, month: number) =>
    dayjs(new Date(year, month)).daysInMonth();

  const firstDayOfMonth = getFirstDayOfMonth();
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const daysInPreviousMonth = getDaysInMonth(currentYear, currentMonth - 1);

  const totalCells = columns * rows;

  const leadingDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const nextMonthDaysStart = daysInCurrentMonth + leadingDays;

  const onHoverDay = (day: string | null) => {
    setHoveredDay(day);
  };

  return {
    today,
    currentMonth,
    currentYear,
    columns,
    rows,
    hoveredDay,
    setHoveredDay: onHoverDay,
    firstDayOfMonth,
    daysInCurrentMonth,
    daysInPreviousMonth,
    totalCells,
    leadingDays,
    nextMonthDaysStart,
    daysOfWeek: DAYS_OF_WEEK,
  };
};
