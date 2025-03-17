import { useQuery } from '@tanstack/react-query';
import { calendarService } from 'features/calendar/api';
import { CalendarLessonsData } from 'features/calendar/model/types';

export const useCalendarLessons = (
  currentYear: number,
  currentMonth: number,
  lastDay: number,
  hiddenStudents: number[] = [],
) => {
  const { data: calendarData, refetch: refetchCalendarData } = useQuery({
    queryKey: [
      'monthCalendarData',
      currentYear,
      currentMonth + 1,
      hiddenStudents,
    ],
    queryFn: () =>
      calendarService.getCalendarLessons(
        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`,
        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${lastDay}`,
        hiddenStudents,
      ),
    refetchOnWindowFocus: false,
  });

  return { calendarData, refetchCalendarData };
};

export const filterCalendarLessonsData = (
  lessonsData: CalendarLessonsData,
  hiddenStudents: number[],
): CalendarLessonsData => {
  const filteredData: CalendarLessonsData = {};

  Object.keys(lessonsData).forEach((date) => {
    filteredData[date] = Object.keys(lessonsData[date])
      .filter((studentId) => !hiddenStudents.includes(Number(studentId))) // Преобразуем ключ строки в число
      .reduce(
        (acc, studentId) => {
          acc[studentId] = lessonsData[date][studentId];
          return acc;
        },
        {} as Record<string, number>,
      );
  });

  return filteredData;
};
