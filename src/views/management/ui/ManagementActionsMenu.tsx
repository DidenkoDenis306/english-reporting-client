import { Flex, Menu } from '@mantine/core';
import {
  IconBook,
  IconDotsVertical,
  IconPaywall,
  IconTrash,
} from '@tabler/icons-react';
import { IStudent } from 'entities/student/model';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Routes } from 'shared/config';
import { DeleteStudentButton } from 'entities/student/ui';

interface Props {
  student: IStudent;
  openPaymentsModal: () => void;
  onSelectStudent: (studentId: number) => void;
}

export const ManagementActionsMenu: FC<Props> = ({
  student,
  openPaymentsModal,
  onSelectStudent,
}) => {
  const { push } = useRouter();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Flex onClick={() => onSelectStudent(student.id)}>
          <IconDotsVertical color="darkgray" cursor="pointer" />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={<IconBook size={14} />}
          onClick={() => push(`${Routes.students}/${student.id}`)}
        >
          Lessons
        </Menu.Item>
        <Menu.Item
          leftSection={<IconPaywall size={14} />}
          onClick={openPaymentsModal}
        >
          Payments
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
          <DeleteStudentButton student={student} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
