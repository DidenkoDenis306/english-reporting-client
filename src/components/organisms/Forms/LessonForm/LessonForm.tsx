'use client';

import { faker } from '@faker-js/faker';
import { Button, Select, Stack } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { lessonsService, studentsService } from '@repo/services';
import { CreateLessonEditor } from '@repo/src/components/organisms';
import { useEditorStore } from '@repo/store';
import { generateRandomWord } from '@repo/utils';
import {QueryClient, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';

export const LessonForm = () => {
  const { editorContent } = useEditorStore();



  const form = useForm({
    initialValues: {
      student: '',
      lessonDate: new Date(),
      lessonContent: '',
    },
  });

  const { data: students, isLoading: isLoadingStudents } = useQuery({
    queryKey: ['students'],
    queryFn: studentsService.getStudents,
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

  const [studentForEditor, setStudentForEditor] = useState(student?.data)

  useEffect(() => {
    setStudentForEditor(student?.data)
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

        setStudentForEditor({...studentForEditor!, lessonsCount: studentForEditor?.lessonsCount! + 1 })

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
      studentId: student?.data.id,
      lessonContent: editorContent,
    });


    // form.reset();
  });

  return (
    <Stack
      p={12}
      w="100%"
      style={{
        margin: '40px auto',
      }}
    >
      <form onSubmit={onSubmit}>
        <Stack gap="md">
          <Select
            w={300}
            label="Student"
            placeholder="Pick student"
            disabled={isLoadingStudents}
            data={students?.data.map((student) => ({
              value: String(student.id),
              label: `${student.firstName} ${student.lastName}`,
            }))}
            key={form.key('student')}
            {...form.getInputProps('student')}
          />

          <DateInput
            w={300}
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
      </form>
    </Stack>
  );
};
