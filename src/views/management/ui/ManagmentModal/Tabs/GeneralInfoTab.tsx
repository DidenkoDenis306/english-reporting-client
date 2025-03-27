import dayjs from 'dayjs';
import { FC, useMemo } from 'react';
import { IStudentResponse } from 'entities/student/api';
import { Stack, Text } from '@mantine/core';
import { formatMonthDayYear } from 'shared/utils';

interface Props {
  student: IStudentResponse | null;
}

export const GeneralInfoTab: FC<Props> = ({ student }) => {
  if (!student) {
    return <Text>No student</Text>;
  }

  console.log(student.lessons);

  const monthLessons = useMemo(
    () =>
      student.lessons.filter((lesson) =>
        dayjs(lesson.lessonDate).isSame(dayjs(), 'month'),
      ),
    [student],
  );

  return (
    <Stack>
      <Text>Total lessons: {student.lessonsCount}</Text>
      <Text>Lessons in this month: {monthLessons.length}</Text>
      <Text>
        Last lesson date: {formatMonthDayYear(student.lastLessonDate)}
      </Text>
    </Stack>
  );
};
