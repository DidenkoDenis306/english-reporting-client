'use client';

import { NavLink, ScrollArea, Stack } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useCurrentUser } from 'entities/user/model';
import { studentsService } from 'entities/student/api';

export const StudentsList = ({ closeSb }: { closeSb: () => void }) => {
  const { currentUser } = useCurrentUser();

  const { data: students, isLoading } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ['students'],
    queryFn: () => studentsService.getStudents(Number(currentUser?.id) || 0),
  });

  // const onRemoveStudent = (view-lessons: IStudent) => {
  //   modals.openConfirmModal({
  //     title: 'Removing Student',
  //     children: (
  //       <Text>{`Are you sure you want to remove the view-lessons ${view-lessons.firstName} ${view-lessons.lastName}?`}</Text>
  //     ),
  //     labels: { confirm: 'Confirm', cancel: 'Cancel' },
  //     onConfirm: () => removeStudent(view-lessons.id),
  //   });
  // };

  return (
    <Stack
      gap="sm"
      style={{
        borderLeft: '1px solid lightgray',
        padding: 0,
      }}
    >
      <NavLink
        href="#required-for-focus"
        label="Students"
        leftSection={<IconUsers size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <ScrollArea h="20vh">
          {students &&
            students.map((student) => (
              <NavLink
                key={student.id}
                href={`/students/${student.id}`}
                label={`${student.firstName} ${student.lastName}`}
                component={Link}
                onClick={closeSb}
              />
            ))}
        </ScrollArea>
      </NavLink>
    </Stack>
  );
};
