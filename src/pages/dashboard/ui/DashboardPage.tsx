import { Group, Stack } from '@mantine/core';
import { StatisticsCard } from './components/StatisticsCard';
import { CalendarSection } from './components/CalendarSection';
import { StudentsToday } from './components/StudentsToday';
import { Greeting } from 'pages/dashboard/ui/components/Greeting';
import { useMobile } from 'shared/hooks';

export const DashboardPage = () => {
  const isMobile = useMobile();

  return (
    <Stack mt={16} gap="xl">
      <Greeting />

      <Group w="100%" justify="space-between" grow>
        <StatisticsCard title="Total lessons" value="823" />
        <StatisticsCard title="Lessons this month" value="80" />
        <StatisticsCard title="Salary" value="$800" />
      </Group>

      <CalendarSection />

      {!isMobile && <StudentsToday />}
    </Stack>
  );
};
