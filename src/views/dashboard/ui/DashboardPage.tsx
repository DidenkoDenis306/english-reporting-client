import { Group, Stack } from '@mantine/core';
import { StatisticsCard } from './components/StatisticsCard';
import { CalendarSection } from './components/CalendarSection';
import { StudentsToday } from './components/StudentsToday';
import { Greeting } from 'views/dashboard/ui/components/Greeting';
import { useMobile } from 'shared/hooks';
import { useQuery } from '@tanstack/react-query';
import { lessonsService } from 'entities/lesson/api/lessonsService';
import { useCurrentUser } from 'entities/user/model';

export const DashboardPage = () => {
  const isMobile = useMobile();

  const { currentUser } = useCurrentUser();

  const { data: totalLessons } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ['totalLessons'],
    queryFn: () => lessonsService.getLessonsCount('total', currentUser!.id),
  });

  const { data: lessonsThisMonth } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ['lessonsThisMonth'],
    queryFn: () => lessonsService.getLessonsCount('month', currentUser!.id),
  });

  return (
    <Stack mt={16} gap="xl">
      <Greeting />

      <Group w="100%" justify="space-between" grow>
        <StatisticsCard title="Total lessons" value={totalLessons ?? 0} />
        <StatisticsCard
          title="Lessons this month"
          value={lessonsThisMonth ?? 0}
        />
        <StatisticsCard title="Salary" value="$800" />
      </Group>

      <CalendarSection />

      {!isMobile && <StudentsToday />}
    </Stack>
  );
};
