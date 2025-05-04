import { Modal } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { studentsService } from 'entities/student/api';
import { PaymentTab } from 'views/management/ui/ManagmentModal/Tabs/PaymentTab';
import { FC } from 'react';

interface Props {
  studentId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal: FC<Props> = ({ studentId, isOpen, onClose }) => {
  const { data: student } = useQuery({
    enabled: Boolean(studentId),
    queryKey: ['student', studentId],
    queryFn: () => studentsService.getStudent(studentId!),
  });

  return (
    <Modal size="xl" opened={isOpen} onClose={onClose} title="Student Payments">
      {student && <PaymentTab lessons={student.lessons?.slice(-5).reverse()} />}
    </Modal>
  );
};
