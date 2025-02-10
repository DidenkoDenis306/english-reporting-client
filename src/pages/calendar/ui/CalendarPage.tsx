'use client';

import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  Modal,
  Select,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { ShownStudentsList } from 'entities/student/ui';
import { DayCalendar, MonthCalendar, WeekCalendar } from 'features/calendar/ui';
import { useState } from 'react';

export type CalendarPreset = 'month' | 'week' | 'day';

export const CalendarPage = () => {
  const [preset, setPreset] = useState<CalendarPreset>('month');
  const [currentDate, setCurrentDate] = useState(dayjs());

  const [hiddenStudents, setHiddenStudents] = useState<string[]>([]);

  const handlePresetChange = (value: string | null) => {
    if (value === 'month' || value === 'week' || value === 'day') {
      setPreset(value);
    }
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentDate((currentDate) => {
      if (direction === 'prev') {
        switch (preset) {
          case 'month':
            return currentDate.subtract(1, 'month');
          case 'week':
            return currentDate.subtract(1, 'week');
          case 'day':
            return currentDate.subtract(1, 'day');
        }
      }
      if (direction === 'next') {
        switch (preset) {
          case 'month':
            return currentDate.add(1, 'month');
          case 'week':
            return currentDate.add(1, 'week');
          case 'day':
            return currentDate.add(1, 'day');
        }
      }

      return currentDate;
    });
  };

  return (
    <Box style={{ overflowX: 'hidden' }}>
      <Flex
        h={60}
        style={{
          borderBottom: '1px solid #e5e7eb',
        }}
        align="center"
        justify="space-between"
      >
        <Group>
          <Menu>
            <Menu.Target>
              <Button variant="light">Shown Students</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <ShownStudentsList />
            </Menu.Dropdown>
          </Menu>

          <Group gap={10}>
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={() => handleMonthChange('prev')}
            >
              <IconChevronLeft
                style={{ width: '100%', height: '70%' }}
                stroke={3}
              />
            </ActionIcon>

            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={() => handleMonthChange('next')}
            >
              <IconChevronRight
                style={{ width: '100%', height: '70%' }}
                stroke={3}
              />
            </ActionIcon>
          </Group>
        </Group>

        <Text fw={600} size="lg">
          {currentDate.format('MMMM YYYY')}
        </Text>

        <Group gap="md">
          <Button onClick={() => setCurrentDate(dayjs())}>Today</Button>
          <Select
            w={150}
            data={[
              { value: 'month', label: 'Month' },
              { value: 'week', label: 'Week' },
              { value: 'day', label: 'Day' },
            ]}
            value={preset}
            onChange={handlePresetChange}
          />
        </Group>
      </Flex>

      {preset === 'day' && <DayCalendar currentDate={currentDate} />}

      {preset === 'week' && <WeekCalendar currentDate={currentDate} />}

      {preset === 'month' && (
        <MonthCalendar currentDate={currentDate} hiddenStudents={['Inna']} />
      )}
    </Box>
  );
};
