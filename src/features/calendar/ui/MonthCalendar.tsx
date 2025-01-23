import { FC } from 'react';
import { Button, Container, Grid, Stack } from '@mantine/core';
import dayjs from 'dayjs';

interface Props {
  currentDate: dayjs.Dayjs;
}

export const MonthCalendar: FC<Props> = ({ currentDate }) => {
  const today = dayjs();
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  const config = {
    month: { columns: 7, rows: 6 },
  };
  const { columns, rows } = config.month;

  const firstDayOfMonth = dayjs(new Date(currentYear, currentMonth, 1)).day();
  const daysInCurrentMonth = dayjs(
    new Date(currentYear, currentMonth),
  ).daysInMonth();
  const daysInPreviousMonth = dayjs(
    new Date(currentYear, currentMonth - 1),
  ).daysInMonth();

  const totalCells = columns * rows;

  const leadingDays = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
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
          return (
            <Grid.Col key={index} span={12 / columns}>
              <Stack justify="center" align="center" mb={12}>
                <span>{daysOfWeek[index % 7]}</span>
              </Stack>
            </Grid.Col>
          );
        })}
        {Array.from({ length: totalCells }).map((_, index) => {
          let dayNumber: number;
          let buttonVariant: 'outline' | 'subtle' = 'subtle';
          let isDisabled = false;

          if (index < leadingDays) {
            dayNumber = daysInPreviousMonth - leadingDays + 1 + index;
            isDisabled = true;
          } else if (index < nextMonthDaysStart) {
            dayNumber = index - leadingDays + 1;
            if (
              dayNumber === today.date() &&
              currentMonth === today.month() &&
              currentYear === today.year()
            ) {
              buttonVariant = 'outline';
            }
          } else {
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
