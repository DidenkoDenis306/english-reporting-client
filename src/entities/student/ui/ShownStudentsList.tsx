import { useQuery } from '@tanstack/react-query';
import { useCurrentUser } from 'entities/user/model';
import { studentsService } from '../api';
import { Loader } from 'shared/ui';
import { Stack, Group, Checkbox, Badge } from '@mantine/core';
import { FC } from 'react';
import { hashStringToColor } from 'shared/utils';

interface ShownStudentsProps {
  hiddenStudents: number[];
  onHiddenStudentsChange: (hiddenStudents: number[]) => void;
}

export const ShownStudentsList: FC<ShownStudentsProps> = ({
  hiddenStudents,
  onHiddenStudentsChange,
}) => {
  const { currentUser } = useCurrentUser();

  const { data: students, isLoading } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ['students'],
    queryFn: () => studentsService.getStudents(Number(currentUser?.id) || 0),
  });

  const handleCheckboxChange = (id: number) => {
    if (hiddenStudents.includes(id)) {
      onHiddenStudentsChange(
        hiddenStudents.filter((studentId) => studentId !== id),
      );
    } else {
      onHiddenStudentsChange([...hiddenStudents, id]);
    }
  };

  const handleGroupCheckboxChange = (isPrivate: boolean) => {
    const groupStudents =
      students
        ?.filter((student) => student.isPrivate === isPrivate)
        .map((student) => student.id) || [];
    const isGroupHidden = groupStudents.every((id) =>
      hiddenStudents.includes(id),
    );

    if (isGroupHidden) {
      onHiddenStudentsChange(
        hiddenStudents.filter((id) => !groupStudents.includes(id)),
      );
    } else {
      onHiddenStudentsChange([...hiddenStudents, ...groupStudents]);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const privateStudents =
    students?.filter((student) => student.isPrivate) || [];
  const schoolStudents =
    students?.filter((student) => !student.isPrivate) || [];

  return (
    <Stack gap="xs" p={8}>
      <Group key="group-private">
        <Checkbox
          indeterminate={
            privateStudents.some(
              (student) => !hiddenStudents.includes(student.id),
            ) &&
            privateStudents.some((student) =>
              hiddenStudents.includes(student.id),
            )
          }
          checked={privateStudents.every(
            (student) => !hiddenStudents.includes(student.id),
          )}
          onChange={() => handleGroupCheckboxChange(true)}
        />
        <span style={{ fontSize: 14 }}>Private Students</span>
      </Group>
      {privateStudents.map((student) => (
        <Group key={student.id} style={{ marginLeft: 25 }}>
          <Checkbox
            checked={!hiddenStudents.includes(student.id)}
            onChange={() => handleCheckboxChange(student.id)}
          />
          <Badge
            key={`${student.firstName} ${student.lastName}`}
            color={hashStringToColor(
              `${student.firstName} ${student.lastName}`,
            )}
            size="md"
            radius="md"
            style={{ textTransform: 'capitalize' }}
          >
            {`${student.firstName} ${student.lastName}`}
          </Badge>
        </Group>
      ))}

      <Group key="group-school">
        <Checkbox
          indeterminate={
            schoolStudents.some(
              (student) => !hiddenStudents.includes(student.id),
            ) &&
            schoolStudents.some((student) =>
              hiddenStudents.includes(student.id),
            )
          }
          checked={schoolStudents.every(
            (student) => !hiddenStudents.includes(student.id),
          )}
          onChange={() => handleGroupCheckboxChange(false)}
        />
        <span style={{ fontSize: 14 }}>School Students</span>
      </Group>
      {schoolStudents.map((student) => (
        <Group key={student.id} style={{ marginLeft: 25 }}>
          <Checkbox
            checked={!hiddenStudents.includes(student.id)}
            onChange={() => handleCheckboxChange(student.id)}
          />
          <Badge
            key={`${student.firstName} ${student.lastName}`}
            color={hashStringToColor(
              `${student.firstName} ${student.lastName}`,
            )}
            size="sm"
            radius="md"
            style={{ textTransform: 'capitalize' }}
          >
            {`${student.firstName} ${student.lastName}`}
          </Badge>
        </Group>
      ))}
    </Stack>
  );
};
