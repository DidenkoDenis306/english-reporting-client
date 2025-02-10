import {
  Badge,
  Box,
  Container,
  Grid,
  Group,
  Popover,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { CalendarLessonsControlMenu } from '../CalendarLessonsControlModal';
import { CalendarLessonsData, useCalendar } from '../../model';
import { useQuery } from '@tanstack/react-query';
import { calendarService } from 'features/calendar/api';
import { hashStringToColor } from 'shared/utils';

interface Props {
  currentDate: dayjs.Dayjs;
  hiddenStudents: string[];
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

  // Получение данных календаря
  const { data: calendarData } = useQuery({
    queryKey: ['monthCalendarData', currentYear, currentMonth + 1],
    queryFn: () =>
      calendarService.getCalendarLessons(
        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`,
        `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${daysInCurrentMonth}`,
      ),
    refetchOnWindowFocus: false,
  });

  const [lessonsData, setLessonsData] = useState<CalendarLessonsData>({});

  useEffect(() => {
    if (calendarData) {
      setLessonsData(calendarData);
    }
  }, [calendarData]);

  // Фильтрация для скрытия студентов
  const filterLessonsData = (data: CalendarLessonsData) => {
    return Object.fromEntries(
      Object.entries(data).map(([date, students]) => [
        date,
        Object.fromEntries(
          Object.entries(students).filter(([studentName]) => {
            return !hiddenStudents.includes(studentName);
          }),
        ),
      ]),
    );
  };

  const filteredLessonsData = filterLessonsData(lessonsData);

  const [opened, { close, open }] = useDisclosure(false);

  console.log(lessonsData);

  return (
    <Container size="lg" py={30}>
      <Grid gutter={0}>
        {/* Дни недели */}
        {Array.from({ length: columns }).map((_, index) => {
          return (
            <Grid.Col key={index} span={12 / columns}>
              <Stack justify="center" align="center" mb={12}>
                <span>{daysOfWeek[index % 7]}</span>
              </Stack>
            </Grid.Col>
          );
        })}

        {/* Дни месяца */}
        {Array.from({ length: totalCells }).map((_, index) => {
          let dayNumber: number;
          let buttonVariant: 'outline' | 'subtle' = 'subtle';
          let isDisabled = false;
          let dateKey: string;

          if (index < leadingDays) {
            // Дни предыдущего месяца
            dayNumber = daysInPreviousMonth - leadingDays + 1 + index;
            dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
              dayNumber,
            ).padStart(2, '0')}`;
            isDisabled = true;
          } else if (index < nextMonthDaysStart) {
            // Текущий месяц
            dayNumber = index - leadingDays + 1;
            dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
              dayNumber,
            ).padStart(2, '0')}`;

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
            dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(
              dayNumber,
            ).padStart(2, '0')}`;
            isDisabled = true;
          }

          const lessonsForDay = filteredLessonsData[dateKey];

          const isTopRow = index < columns;
          const isBottomRow = index >= columns * (rows - 1);
          const isLeftColumn = index % columns === 0;
          const isRightColumn = index % columns === columns - 1;

          const showBadge =
            !isDisabled &&
            lessonsForDay &&
            Object.keys(lessonsForDay).length > 0;

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
              onMouseEnter={() => setHoveredDay(dateKey)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <Box>
                <CalendarLessonsControlMenu
                  dateKey={dateKey}
                  buttonVariant={buttonVariant}
                  isDisabled={isDisabled}
                  lessonsData={filteredLessonsData}
                  setLessonsData={setLessonsData}
                  isHovered={hoveredDay === dateKey}
                />

                {/* Уроки (бейджи) */}
                {lessonsForDay && (
                  <Group
                    gap={2}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      padding: 5,
                    }}
                  >
                    {showBadge &&
                      Object.entries(lessonsForDay)
                        .slice(0, 3)
                        .map(([name, count]) => (
                          <Badge
                            key={name}
                            color={hashStringToColor(name)}
                            size="sm"
                            radius="md"
                            style={{ textTransform: 'capitalize' }}
                          >
                            {name} ({count})
                          </Badge>
                        ))}

                    {showBadge && Object.entries(lessonsForDay).length > 3 && (
                      <Popover
                        width={200}
                        position="bottom"
                        withArrow
                        shadow="md"
                        opened={opened}
                      >
                        <Popover.Target>
                          <Badge
                            color="gray"
                            size="sm"
                            radius="md"
                            style={{
                              textTransform: 'lowercase',
                              cursor: 'pointer',
                            }}
                            onMouseEnter={open}
                            onMouseLeave={close}
                          >
                            {Object.entries(lessonsForDay).length - 2} more
                          </Badge>
                        </Popover.Target>
                        <Popover.Dropdown
                          p={4}
                          maw={180}
                          style={{ pointerEvents: 'none' }}
                        >
                          <Group gap={4}>
                            {Object.entries(lessonsForDay)
                              .slice(2)
                              .map(([name, count]) => (
                                <Badge
                                  key={name}
                                  color={hashStringToColor(name)}
                                  size="sm"
                                  radius="md"
                                  style={{ textTransform: 'capitalize' }}
                                >
                                  {name} ({count})
                                </Badge>
                              ))}
                          </Group>
                        </Popover.Dropdown>
                      </Popover>
                    )}
                  </Group>
                )}
              </Box>
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
};
