'use client';

import { Box, Flex, NavLink, ScrollArea, Skeleton, Stack } from '@mantine/core';
import { studentsService } from '@repo/services';
import { IconGauge, IconUsers } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export const StudentsList = () => {
  const { id } = useParams();

  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: studentsService.getStudents,
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
        <ScrollArea h={250}>
          {students &&
            students.data.map((student) => (
              <NavLink
                key={student.id}
                href={`/students/${student.id}`}
                label={`${student.firstName} ${student.lastName}`}
                component={Link}
              />
            ))}
        </ScrollArea>
      </NavLink>
    </Stack>
  );
};