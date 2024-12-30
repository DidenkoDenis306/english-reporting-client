import { Box, Group, Stack } from '@mantine/core';
import { CustomCalendar } from 'shared/ui';
import { LessonsChart } from 'entities/lesson/ui';
import { useMobile } from 'shared/hooks';

export const CalendarSection = () => {
  const isMobile = useMobile();

  return isMobile ? (
    <Stack h={250} style={{ display: 'flex' }}>
      <Box style={{ flex: '0 0 auto' }}>
        <CustomCalendar />
      </Box>
      <Box
        style={{
          flex: '1 1 auto',
          height: '100%',
          padding: '15px',
          border: '1px solid #d1dbe8',
          borderRadius: 12,
        }}
      >
        <LessonsChart />
      </Box>
    </Stack>
  ) : (
    <Group
      h={250}
      mb={48}
      style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '15px' }}
    >
      <Box>
        <CustomCalendar />
      </Box>
      <Box
        style={{
          height: '100%',
          padding: '15px',
          border: '1px solid #d1dbe8',
          borderRadius: 12,
        }}
      >
        <LessonsChart />
      </Box>
    </Group>
  );
};
