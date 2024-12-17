'use client';

import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Image,
  Title,
  Modal,
  Avatar,
} from '@mantine/core';
import { useCurrentUser } from '@repo/store';
import { useQuery } from '@tanstack/react-query';
import { studentsService } from '@repo/services';
import { useRouter } from 'next/navigation';
import { Routes } from '@repo/constants';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { ManagementModal } from '@repo/src/components/pages/ManagmentPage/ManagmentModal/ManagementModal';

export const ManagementPage = () => {
  const { push } = useRouter();

  const [opened, { open, close }] = useDisclosure(false);

  const { currentUser } = useCurrentUser();

  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const { data: students, isPending } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ['students'],
    queryFn: () => studentsService.getStudents(Number(currentUser?.id) || 0),
  });

  const handleClickStudentCard = (studentId: number) => {
    setSelectedStudent(studentId);
    open();
  };

  return (
    <Stack>
      {students && <Title>Student Amount: {students.data.length}</Title>}
      <Flex gap="md" wrap="wrap">
        {isPending && <Text>Loading...</Text>}

        {students &&
          students.data.map((student) => (
            <Stack
              p={12}
              style={{
                border: '1px solid lightgray',
                borderRadius: 10,
                cursor: 'pointer',
              }}
              align="center"
              justify="space-between"
              w={160}
              onClick={() => handleClickStudentCard(student.id)}
            >
              <Avatar
                key={`${student.firstName} ${student.lastName}`}
                name={`${student.firstName} ${student.lastName}`}
                color="initials"
                size="lg"
              />

              <Text>{student.firstName + ' ' + student.lastName}</Text>
              {/*<Text>Total lessons: {student.lessonsCount}</Text>*/}
              <Button onClick={() => push(`${Routes.Students}/${student.id}`)}>
                View lessons
              </Button>
            </Stack>
          ))}
      </Flex>

      <ManagementModal
        studentId={selectedStudent}
        isOpen={opened}
        onClose={close}
      />
    </Stack>
  );
};
