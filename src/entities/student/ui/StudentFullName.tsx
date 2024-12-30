import { Title } from '@mantine/core';
import { FC } from 'react';

interface StudentInfoProps {
  firstName: string;
  lastName: string;
}

export const StudentFullName: FC<StudentInfoProps> = ({
  firstName,
  lastName,
}) => {
  return (
    <Title w={500}>
      {firstName} {lastName}
    </Title>
  );
};
