import { FC } from 'react';
import { Button, Container, Flex, Grid, Stack } from '@mantine/core';
import dayjs from 'dayjs';

interface Props {
  currentDate: dayjs.Dayjs;
}

export const WeekCalendar: FC<Props> = ({ currentDate }) => {
  const today = dayjs();
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  const startOfWeek = today.startOf('week').add(1, 'day');

  const config = {
    week: { columns: 7, rows: 24 },
  };
  const { columns, rows } = config.week;

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

  const hours = Array.from(
    { length: 24 },
    (_, index) => index.toString().padStart(2, '0') + ':00',
  );

  return (
    <Container size="lg" py={30}>
      <Grid gutter={0}>
        {Array.from({ length: columns }).map((_, index) => {
          const day = startOfWeek.add(index, 'day');
          return (
            <Grid.Col key={index} span={12 / columns}>
              <Stack justify="center" align="center" mb={12}>
                <span>{daysOfWeek[index % 7]}</span>
                <span>{day.format('D')}</span>
              </Stack>
            </Grid.Col>
          );
        })}
        {Array.from({ length: totalCells }).map((_, index) => {
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
                minHeight: 50,
                position: 'relative',
              }}
            ></Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
};
