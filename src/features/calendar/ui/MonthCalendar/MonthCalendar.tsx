import {
  CalendarLessonsData,
  filterCalendarLessonsData,
  useCalendar,
  useCalendarLessons,
} from 'features/calendar/model';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { Container, Grid } from '@mantine/core';
import { CalendarHeader } from 'features/calendar/ui/CalendarHeader';
import { MonthCalendarDay } from 'features/calendar/ui/MonthCalendar/MonthCalendarDay';

interface Props {
  currentDate: dayjs.Dayjs;
  hiddenStudents: number[];
}

export const MonthCalendar: FC<Props> = ({ currentDate, hiddenStudents }) => {
  const {
    today,
    currentMonth,
    currentYear,
    columns,
    rows,
    hoveredDay,
    setHoveredDay,
    daysInPreviousMonth,
    daysInCurrentMonth,
    totalCells,
    leadingDays,
    nextMonthDaysStart,
    daysOfWeek,
  } = useCalendar({ currentDate });

  const { calendarData } = useCalendarLessons(
    currentYear,
    currentMonth,
    daysInCurrentMonth,
    hiddenStudents,
  );

  const [lessonsData, setLessonsData] = useState<CalendarLessonsData>({});
  useEffect(() => {
    if (calendarData) {
      setLessonsData(calendarData);
    }
  }, [calendarData]);

  const filteredLessonsData = filterCalendarLessonsData(
    lessonsData,
    hiddenStudents,
  );

  return (
    <Container size="lg" py={30}>
      <Grid gutter={0}>
        <CalendarHeader daysOfWeek={daysOfWeek} columns={columns} />
        {Array.from({ length: totalCells }).map((_, index) => {
          const isPreviousMonth = index < leadingDays;
          const isCurrentMonth = !isPreviousMonth && index < nextMonthDaysStart;
          const isNextMonth = index >= nextMonthDaysStart;

          const dayNumber = isPreviousMonth
            ? daysInPreviousMonth - leadingDays + index + 1
            : isCurrentMonth
              ? index - leadingDays + 1
              : index - nextMonthDaysStart + 1;

          const monthForDay = isPreviousMonth
            ? currentMonth === 0
              ? 11
              : currentMonth - 1
            : isNextMonth
              ? currentMonth === 11
                ? 0
                : currentMonth + 1
              : currentMonth;

          const yearForDay =
            isPreviousMonth && currentMonth === 0
              ? currentYear - 1
              : isNextMonth && currentMonth === 11
                ? currentYear + 1
                : currentYear;

          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
            dayNumber,
          ).padStart(2, '0')}`;

          const isCurrentDay =
            today.date() === dayNumber &&
            today.month() === monthForDay &&
            today.year() === yearForDay;

          return (
            <MonthCalendarDay
              key={index}
              dateKey={dateKey}
              buttonVariant={isCurrentDay ? 'outline' : 'subtle'}
              isDisabled={!isCurrentMonth}
              lessonsData={lessonsData}
              lessonsForDay={filteredLessonsData[dateKey]}
              hoveredDay={hoveredDay}
              setHoveredDay={setHoveredDay}
              columns={columns}
              rows={rows}
              index={index}
            />
          );
        })}
      </Grid>
    </Container>
  );
};
