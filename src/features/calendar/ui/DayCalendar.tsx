import { FC } from 'react';
import { Container, Flex, Grid, Stack } from '@mantine/core';
import dayjs from 'dayjs';

interface Props {
  currentDate: dayjs.Dayjs;
}

export const DayCalendar: FC<Props> = ({ currentDate }) => {
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  const config = {
    day: { columns: 1, rows: 25 },
  };
  const { columns, rows } = config.day;

  // Массив с часами от 00:00 до 23:00
  const hours = Array.from(
    { length: 24 },
    (_, index) => index.toString().padStart(2, '0') + ':00',
  );

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
    <Container size="lg" py={30} style={{ transform: 'translateX(-28px)' }}>
      <Grid gutter={0}>
        {Array.from({ length: columns }).map((_, index) => {
          return (
            <Grid.Col key={index} span={12 / columns}>
              <Stack justify="center" align="center">
                <span>{daysOfWeek[index % 7]}</span>
                <span>{currentDate.format('D')}</span>
              </Stack>
            </Grid.Col>
          );
        })}

        {Array.from({ length: rows }).map((_, rowIndex) => (
          <>
            <Grid.Col key={`hour-${rowIndex}`} span={1}>
              <Flex
                justify="center"
                align="end"
                style={{
                  height: 50, // Высота строки
                  display: 'flex',
                  alignItems: 'flex-start', // Выровнять текст по верхней линии
                  // Немного отступ от верхней грани, если необходимо
                }}
              >
                <span
                  style={{
                    transform: 'translateY(12px)',
                  }}
                >
                  {hours[rowIndex]}
                </span>
              </Flex>
            </Grid.Col>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Grid.Col
                key={`cell-${rowIndex}-${colIndex}`}
                span={(12 - 1) / columns} // Вычитаем 1, чтобы учесть колонку часов
                style={{
                  border: '0.5px solid #ccc',
                  borderTop: rowIndex === 0 ? 'none' : '0.5px solid #ccc',
                  borderBottom:
                    rowIndex === rows - 1 ? 'none' : '0.5px solid #ccc',
                  borderLeft: colIndex === 0 ? 'none' : '0.5px solid #ccc',
                  borderRight:
                    colIndex === columns - 1 ? 'none' : '0.5px solid #ccc',
                  minHeight: 50,
                  position: 'relative',
                }}
              ></Grid.Col>
            ))}
          </>
        ))}
      </Grid>
    </Container>
  );
};
