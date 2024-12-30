'use client';

import { Button, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { CreateStudentForm } from 'entities/student/ui';
import { CreateLessonForm } from 'widgets/CreateLessonForm/ui';

export function SidebarActions() {
  const [openedStudent, { open: openStudent, close: closeStudent }] =
    useDisclosure(false);
  const [openedLesson, { open: openLesson, close: closeLesson }] =
    useDisclosure(false);

  return (
    <Stack justify="flex-end" w="100%" mt={20}>
      <Button variant="light" onClick={openLesson}>
        + Add Lesson
      </Button>
      <Button variant="outline" onClick={openStudent}>
        + Add Student
      </Button>

      <Drawer
        opened={openedLesson}
        onClose={closeLesson}
        position="right"
        title={'Add Lesson'}
        size="xl"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        withCloseButton={true}
      >
        <CreateLessonForm />
      </Drawer>

      <Drawer
        opened={openedStudent}
        onClose={closeStudent}
        position="right"
        title={'Add Student'}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        withCloseButton={true}
      >
        <CreateStudentForm />
      </Drawer>
    </Stack>
  );
}
