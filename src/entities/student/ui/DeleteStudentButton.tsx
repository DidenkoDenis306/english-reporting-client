import { FC } from 'react';
import { IStudent } from 'entities/student/model';
import { Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { studentsService } from 'entities/student/api';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';

interface Props {
  student: IStudent;
}

export const DeleteStudentButton: FC<Props> = ({ student }) => {
  const { mutate: deleteStudent } = useMutation({
    mutationFn: () => studentsService.deleteStudent(Number(student.id)),
    onSuccess: () => {
      notifications.show({
        color: 'green',
        title: `Student ${student.firstName} ${student.lastName} successfully deleted`,
        message: '',
        withBorder: true,
      });
    },
    onError: () => {
      notifications.show({
        color: 'red',
        title: `Server error`,
        message: '',
        withBorder: true,
      });
    },
  });

  const openDeleteStudentModal = () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to delete the student{' '}
          {`${student.firstName} ${student.lastName}`}?
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: deleteStudent,
    });

  return (
    <p style={{ padding: 0, margin: 0 }} onClick={openDeleteStudentModal}>
      Delete Student
    </p>
  );
};
