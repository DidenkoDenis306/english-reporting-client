'use client';

import { useDisclosure } from '@mantine/hooks';
import '@mantine/dates/styles.css';
import { CreateStudentForm } from 'entities/student/ui';
import { CreateLessonForm } from 'widgets/createLessonForm/ui';

export default function BasicAppShell() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <CreateStudentForm />

      <CreateLessonForm />
    </>
  );
}
