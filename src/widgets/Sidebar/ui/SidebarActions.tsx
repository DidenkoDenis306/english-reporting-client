'use client';

import { Button, Drawer, Flex, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { CreateStudentForm } from 'entities/student/ui';
import { CreateLessonForm } from 'widgets/CreateLessonForm/ui';
import {
  IconFilePlus,
  IconFolderPlus,
  IconUserPlus,
} from '@tabler/icons-react';

export function SidebarActions() {
  const [openedStudent, { open: openStudent, close: closeStudent }] =
    useDisclosure(false);
  const [openedLesson, { open: openLesson, close: closeLesson }] =
    useDisclosure(false);

  return (
    <Stack justify="flex-end" w="100%" mt={20}>
      <Button variant="light" onClick={openLesson}>
        <Flex align="center" gap={4}>
          {<IconFilePlus size={16} />} Add Lesson
        </Flex>
      </Button>
      <Button variant="outline" onClick={openStudent}>
        <Flex align="center" gap={4}>
          {<IconUserPlus size={16} />} Add Student
        </Flex>
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
        size="sm"
      >
        <CreateStudentForm />
      </Drawer>
    </Stack>
  );
}
