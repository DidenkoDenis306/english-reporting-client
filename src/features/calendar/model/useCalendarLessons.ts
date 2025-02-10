import { useQuery } from '@tanstack/react-query';
import { calendarService } from 'features/calendar/api';
import { CalendarLessonsData } from 'features/calendar/model/types';

export const useCalendarLessons = (
  currentYear: number,
  currentMonth: number,
  lastDay: number,
) => {
  const { data: calendarData } = useQuery({
    queryKey: ['monthCalendarData', currentYear, currentMonth + 1],
    queryFn: () =>
      calendarService.getCalendarLessons(
        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`,
        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${lastDay}`,
      ),
    refetchOnWindowFocus: false,
  });

  return calendarData;
};

export const filterLessonsData = (
  calendarData: CalendarLessonsData,
  hiddenStudents: string[],
): CalendarLessonsData => {
  return Object.fromEntries(
    Object.entries(calendarData).map(([date, students]) => [
      date,
      Object.fromEntries(
        Object.entries(students).filter(
          ([studentName]) => !hiddenStudents.includes(studentName),
        ),
      ),
    ]),
  );
};
