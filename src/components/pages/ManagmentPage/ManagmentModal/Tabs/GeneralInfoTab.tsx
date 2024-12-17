import { Stack, Title, Text } from '@mantine/core';
import { IStudent } from '@repo/types';
import { FC, useMemo } from 'react';
import { IStudentResponse } from '@repo/services';
import { formatMonthDayYear } from '@repo/utils';
import dayjs from 'dayjs';

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
