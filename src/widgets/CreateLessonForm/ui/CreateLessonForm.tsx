'use client';

import { Button, Loader, Select, Stack } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMediaQuery } from '@mantine/hooks';
import { studentsService } from 'entities/student/api';
import { useEditorStore } from 'features/editor/model';
import { lessonsService } from 'entities/lesson/api/lessonsService';
import { CreateLessonEditor } from 'features/editor/ui';
import { IStudent } from 'entities/student/model';

const MAX_WIDTH = 768;

export const CreateLessonForm = () => {
  const { editorContent } = useEditorStore();
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery(`(max-width: ${MAX_WIDTH}px)`);
  const currentDate = new Date();
  const selectedMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1,
  );

  console.log('con', editorContent);

  const form = useForm({
    initialValues: {
      student: '',
      lessonDate: selectedMonth,
      lessonContent: '',
    },
  });

  const { data: students, isLoading: isLoadingStudents } = useQuery({
    queryKey: ['students'],
    queryFn: () => studentsService.getStudents(1),
  });

  const { data: student, isLoading } = useQuery({
    enabled: Boolean(form.values.student),
    queryKey: ['student', form.values.student],
    queryFn: () => studentsService.getStudent(Number(form.values.student)),
  });

  const mapStudentsData = (students: IStudent[]) =>
    students?.map((student) => ({
      value: String(student.id),
      label: `${student.firstName} ${student.lastName}`,
    }));

  const { mutate: createLesson, isPending: isPendingCreateLesson } =
    useMutation({
      mutationFn: lessonsService.createLesson,
      onSuccess: () => {
        notifications.show({
          color: 'green',
          title: 'Lesson successfully created',
          message: '',
          withBorder: true,
        });
        queryClient.invalidateQueries({ queryKey: ['student'] });
      },
      onError: () => {
        notifications.show({
          color: 'red',
          title: 'Server error',
          message: '',
          withBorder: true,
        });
      },
    });

  const handleSubmit = form.onSubmit((values) => {
    createLesson({
      ...values,
      teacherId: 1, // TODO: заменить на динамическое значение
      studentId: student?.id,
      lessonContent: editorContent,
    });
  });

  console.log(form.values);

  return (
    <Stack w="100%">
      <form onSubmit={handleSubmit}>
        {isLoadingStudents ? (
          <Loader />
        ) : (
          <Stack gap="md">
            <Select
              label="Student"
              placeholder="Pick student"
              disabled={isLoadingStudents}
              data={mapStudentsData(students ?? [])}
              {...form.getInputProps('student')}
            />
            <DateInput
              valueFormat="DD.MM.YYYY"
              label="Lesson Date"
              {...form.getInputProps('lessonDate')}
            />
            <CreateLessonEditor
              student={student}
              lessonDate={form.values.lessonDate}
            />
            <Button type="submit" loading={isPendingCreateLesson}>
              Add lesson
            </Button>
          </Stack>
        )}
      </form>
    </Stack>
  );
};
