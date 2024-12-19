'use client';

import { Avatar, Button, Flex, Stack, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useCurrentUser } from 'entities/user/model';
import { studentsService } from 'entities/student/api';
import { Routes } from 'shared/config';
import { ManagementModal } from 'pages/management/ui/ManagmentModal/ManagementModal';

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
      {students && <Title>Student Amount: {students.length}</Title>}
      <Flex gap="md" wrap="wrap">
        {isPending && <Text>Loading...</Text>}

        {students &&
          students.map((student) => (
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
              <Button onClick={() => push(`${Routes.students}/${student.id}`)}>
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
