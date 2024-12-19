'use client';

import { NavLink, ScrollArea, Stack } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCurrentUser } from 'entities/user/model';
import { studentsService } from 'entities/student/api';

export const StudentsList = ({ closeSb }: { closeSb: () => void }) => {
  const { id } = useParams();

  const { currentUser } = useCurrentUser();

  const { data: students, isLoading } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ['students'],
    queryFn: () => studentsService.getStudents(Number(currentUser?.id) || 0),
  });

  // const onRemoveStudent = (student: IStudent) => {
  //   modals.openConfirmModal({
  //     title: 'Removing Student',
  //     children: (
  //       <Text>{`Are you sure you want to remove the student ${student.firstName} ${student.lastName}?`}</Text>
  //     ),
  //     labels: { confirm: 'Confirm', cancel: 'Cancel' },
  //     onConfirm: () => removeStudent(student.id),
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
