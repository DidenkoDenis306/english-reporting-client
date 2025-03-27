'use client';

import { Box, Loader, Stack, TextInput, Title } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { studentsService } from 'entities/student/api';
import { IStudent } from 'entities/student/model';
import { useCurrentUser } from 'entities/user/model';
import { PaymentModal } from 'features/payment/ui';
import { useState } from 'react';
import { ManagementActionsMenu } from './ManagementActionsMenu';
import { StudentsGrid } from './StudentsGrid';

export const ManagementPage = () => {
  const [
    openedPaymentsModal,
    { open: openPaymentsModal, close: closePaymentsModal },
  ] = useDisclosure(false);

  const { currentUser } = useCurrentUser();

  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);

  const { data: students, isPending } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ['students'],
    queryFn: () => studentsService.getStudents(Number(currentUser?.id) || 0),
  });

  const onSelectStudent = (studentId: number) => {
    setSelectedStudentId(studentId);
  };

  const filteredStudents = students?.filter((student: IStudent) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(debouncedSearchQuery.toLowerCase()),
  );

  return (
    <>
      {isPending ? (
        <Stack gap="xl" align="center">
          <Title order={3}>Loading students...</Title>
          <Loader />
        </Stack>
      ) : (
        <Stack gap="lg">
          <TextInput
            w={300}
            placeholder="Search students"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
          />
          <StudentsGrid
            students={filteredStudents ?? []}
            actionsMenu={(student: IStudent) => (
              <ManagementActionsMenu
                student={student}
                openPaymentsModal={openPaymentsModal}
                onSelectStudent={onSelectStudent}
              />
            )}
          />
        </Stack>
      )}

      <PaymentModal
        studentId={selectedStudentId}
        isOpen={openedPaymentsModal}
        onClose={closePaymentsModal}
      />
    </>
  );
};
