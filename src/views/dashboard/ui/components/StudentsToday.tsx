import { Group, Stack, Text, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Routes } from 'shared/config';

export const StudentsToday = () => {
  const { push } = useRouter();

  return (
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
      <Button onClick={() => push(Routes.management)}>View students</Button>
    </Group>
  );
};
