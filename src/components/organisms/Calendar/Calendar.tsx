import { FC } from 'react';
import { Button, Container, Flex, Grid, Stack } from '@mantine/core';
import dayjs from 'dayjs';
import { CalendarPreset } from '@repo/src/components/pages/CalendarPage/CalendarPage';

interface Props {
  preset: CalendarPreset;
  currentDate: dayjs.Dayjs;
}

export const Calendar: FC<Props> = ({ preset, currentDate }) => {
  const today = dayjs();
  const currentDay = currentDate.date();
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  const startOfWeek = today.startOf('week').add(1, 'day');

  const config = {
    day: { columns: 1, rows: 24 },
    week: { columns: 7, rows: 24 },
    month: { columns: 7, rows: 6 },
  };
  const { columns, rows } = config[preset];

  const firstDayOfMonth =
    (dayjs(new Date(currentYear, currentMonth, 1)).day() + 6) % 7;
  const daysInCurrentMonth = dayjs().daysInMonth();
  const daysInPreviousMonth = dayjs(
    new Date(currentYear, currentMonth - 1, 1),
  ).daysInMonth();

  const totalCells = columns * rows;

  const leadingDays = Math.max(firstDayOfMonth, 4);
  const nextMonthDaysStart = daysInCurrentMonth + leadingDays;

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <Container size="lg" py={30}>
      <Grid gutter={0}>
        {Array.from({ length: columns }).map((_, index) => {
          const day = startOfWeek.add(index, 'day');
          return (
            <Grid.Col key={index} span={12 / columns}>
              <Stack justify="center" align="center" mb={12}>
                <span>{daysOfWeek[index % 7]}</span>
                {preset === 'week' && <span>{day.format('D')}</span>}
              </Stack>
            </Grid.Col>
          );
        })}
        {Array.from({ length: totalCells }).map((_, index) => {
          let dayNumber: number;
          let buttonVariant: 'outline' | 'subtle' = 'subtle';
          let isDisabled = false;

          if (index < leadingDays) {
            // Дни предыдущего месяца
            dayNumber = daysInPreviousMonth - leadingDays + 1 + index;
            isDisabled = true;
          } else if (index < nextMonthDaysStart) {
            // Дни текущего месяца
            dayNumber = index - leadingDays + 1;
            if (
              dayNumber === today.date() &&
              currentMonth === today.month() &&
              currentYear === today.year()
            ) {
              buttonVariant = 'outline';
            }
          } else {
            // Дни следующего месяца
            dayNumber = index - nextMonthDaysStart + 1;
            isDisabled = true;
          }

          const isTopRow = index < columns;
          const isBottomRow = index >= columns * (rows - 1);
          const isLeftColumn = index % columns === 0;
          const isRightColumn = index % columns === columns - 1;

          return (
            <Grid.Col
              key={index}
              span={12 / columns}
              style={{
                border: '0.5px solid #ccc',
                borderTop: isTopRow ? 'none' : '0.5px solid #ccc',
                borderBottom: isBottomRow ? 'none' : '0.5px solid #ccc',
                borderLeft: isLeftColumn ? 'none' : '0.5px solid #ccc',
                borderRight: isRightColumn ? 'none' : '0.5px solid #ccc',
                minHeight: 100,
                position: 'relative',
              }}
            >
              <Button
                size="xs"
                radius="xl"
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  color: isDisabled ? 'lightgray' : undefined,
                }}
                variant={buttonVariant}
              >
                {dayNumber}
              </Button>
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
};
