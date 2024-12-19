'use client';

import { Button, Loader, Select, Stack } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { studentsService } from 'entities/student/api';
import { useEditorStore } from 'features/editor/model';
import { lessonsService } from 'entities/lesson/api/lessonsService';
import { CreateLessonEditor } from 'features/editor/ui';

const MAX_WIDTH = 768;
const STUDENTS_QUERY_KEY = 'students';
const SUCCESS_MESSAGE = 'Lesson successfully created';
const ERROR_MESSAGE = 'Server error';

export const CreateLessonForm = () => {
  const { editorContent } = useEditorStore();

  // const { currentUser } = useCurrentUser();

  const queryClient = useQueryClient();

  const isMobile = useMediaQuery(`(max-width: ${MAX_WIDTH}px)`);

  const now = new Date();
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const form = useForm({
    initialValues: {
      student: '',
      lessonDate: previousMonth,
      lessonContent: '',
    },
  });

  const { data: students, isLoading: isLoadingStudents } = useQuery({
    // enabled: Boolean(currentUser),
    queryKey: ['students'],
    queryFn: () => studentsService.getStudents(Number(1)),
  });

  const {
    data: student,
    error,
    isLoading,
  } = useQuery({
    enabled: Boolean(form.values.student),
    queryKey: ['student', form.values.student],
    queryFn: () => studentsService.getStudent(Number(form.values.student)),
  });

  const [studentForEditor, setStudentForEditor] = useState(student);

  useEffect(() => {
    setStudentForEditor(student);
  }, [student]);

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

        setStudentForEditor({
          ...studentForEditor!,
          lessonsCount: studentForEditor?.lessonsCount! + 1,
        });
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

  const onSubmit = form.onSubmit((values) => {
    createLesson({
      ...values,
      teacherId: 1,
      studentId: student?.id,
      lessonContent: editorContent,
    });

    // form.reset();
  });

  return (
    <Stack
      p={12}
      w="100%"
      // style={{
      //   margin: `${isMobile ? 0 : '40px'} auto`,
      // }}
    >
      <form onSubmit={onSubmit}>
        {isLoadingStudents ? (
          <Loader />
        ) : (
          <Stack gap="md">
            <Select
              // w={isMobile ? '100%' : 300}
              label="Student"
              placeholder="Pick student"
              disabled={isLoadingStudents}
              data={students?.map((student) => ({
                value: String(student.id),
                label: `${student.firstName} ${student.lastName}`,
              }))}
              key={form.key('student')}
              {...form.getInputProps('student')}
            />

            <DateInput
              // w={isMobile ? '100%' : 300}
              valueFormat="DD.MM.YYYY"
              label="Lesson Date"
              key={form.key('lessonDate')}
              {...form.getInputProps('lessonDate')}
            />

            <CreateLessonEditor
              student={studentForEditor}
              lessonDate={form.values.lessonDate}
            />

            <Button type="submit">Add lesson</Button>
          </Stack>
        )}
      </form>
    </Stack>
  );
};
