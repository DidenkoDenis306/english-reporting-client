'use client';

import { AreaChart } from '@mantine/charts';
import { Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { CustomCalendar } from '@repo/src/components/moleculs';
import { useCurrentUser } from '@repo/store';

export default function Page() {
  const { currentUser } = useCurrentUser();

  const data = [
    {
      date: 'Mar 22',
      Apples: 2890,
      Oranges: 2338,
      Tomatoes: 2452,
    },
    {
      date: 'Mar 23',
      Apples: 2756,
      Oranges: 2103,
      Tomatoes: 2402,
    },
    {
      date: 'Mar 24',
      Apples: 3322,
      Oranges: 986,
      Tomatoes: 1821,
    },
    {
      date: 'Mar 25',
      Apples: 3470,
      Oranges: 2108,
      Tomatoes: 2809,
    },
    {
      date: 'Mar 26',
      Apples: 3129,
      Oranges: 1726,
      Tomatoes: 2290,
    },
  ];

  return (
    <Stack mt={16} gap="xl">
      <Title fw={900} lh="45px">
        Good morning, {currentUser?.firstName}!
      </Title>

      <Group w="100%" justify="space-between" grow>
        <Stack
          w={270}
          h={112}
          gap={8}
          style={{ border: '1px solid #d1dbe8', padding: 24, borderRadius: 12 }}
        >
          <Text fw={500} fz={16}>
            Total lessons
          </Text>

          <Text fw={800} fz={24}>
            80
          </Text>
        </Stack>

        <Stack
          w={270}
          h={112}
          gap={8}
          style={{ border: '1px solid #d1dbe8', padding: 24, borderRadius: 12 }}
        >
          <Text fw={500} fz={16}>
            Total salary
          </Text>

          <Text fw={800} fz={24}>
            $1,200
          </Text>
        </Stack>

        <Stack
          w={270}
          h={112}
          gap={8}
          style={{ border: '1px solid #d1dbe8', padding: 24, borderRadius: 12 }}
        >
          <Text fw={500} fz={16}>
            This month's salary
          </Text>

          <Text fw={800} fz={24}>
            $800
          </Text>
        </Stack>
      </Group>

      <Group h={250} style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '0 0 auto' }}>
          <CustomCalendar />
        </div>
        <div
          style={{
            flex: '1 1 auto',
            height: '100%',
            padding: '15px',
            border: '1px solid #d1dbe8',
            borderRadius: 12,
          }}
        >
          <AreaChart
            h="100%"
            w="100%"
            data={data}
            dataKey="date"
            series={[
              { name: 'Apples', color: 'indigo.6' },
              { name: 'Oranges', color: 'blue.6' },
              { name: 'Tomatoes', color: 'teal.6' },
            ]}
            curveType="linear"
          />
        </div>
      </Group>

      <Group
        justify="space-between"
        style={{ border: '1px solid #d1dbe8', padding: 24, borderRadius: 12 }}
      >
        <Stack gap="sm">
          <Text fw={700} fz={16}>
            You have 5 students today
          </Text>

          <Text c="#4e7397" fz={16}>
            Keep up the great work!
          </Text>
        </Stack>

        <Button>View students</Button>
      </Group>
    </Stack>
  );
}
