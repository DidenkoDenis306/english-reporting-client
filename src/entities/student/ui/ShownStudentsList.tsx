import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from 'entities/user/model';
import { studentsService } from '../api';
import { Loader } from 'shared/ui';
import { Stack, Group, Checkbox, Text } from '@mantine/core';

export const ShownStudentsList = () => {
  const { currentUser } = useCurrentUser();

  const { data: students, isLoading } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ['students'],
    queryFn: () => studentsService.getStudents(Number(currentUser?.id) || 0),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack gap="xs" p={8}>
      {students &&
        students.map((student) => {
          return (
            <Group
              key={student.id}
              gap="xs"
              style={{ fontSize: 13 }}
              justify="space-between"
            >
              <span>{`${student.firstName} ${student.lastName}`}</span>
              <Checkbox />
            </Group>
          );
        })}
    </Stack>
  );
};
