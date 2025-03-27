import { Avatar, Flex, Table, TableData } from '@mantine/core';
import { IStudent } from 'entities/student/model';
import { FC, ReactNode } from 'react';
import { formatMonthDayYear } from 'shared/utils';

interface Props {
  students: IStudent[];
  actionsMenu: (student: IStudent) => ReactNode;
}

export const StudentsGrid: FC<Props> = ({ students, actionsMenu }) => {
  const tableData: TableData = {
    head: ['Student', 'Total Lessons', 'Last Lesson Date', 'Actions'],
    body: students.map((student) => [
      <Flex gap="sm" align="center">
        <Avatar
          key={`${student.firstName} ${student.lastName}`}
          name={`${student.firstName} ${student.lastName}`}
          color="initials"
          size="md"
        />{' '}
        {`${student.firstName} ${student.lastName}`}
      </Flex>,
      ,
      student.lessonsCount,
      formatMonthDayYear(student.lastLessonDate),

      actionsMenu(student),
    ]),
  };

  return <Table stickyHeader highlightOnHover data={tableData} />;
};
