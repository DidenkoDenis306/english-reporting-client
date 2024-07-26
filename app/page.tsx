'use client';

import { useDisclosure } from '@mantine/hooks';
import '@mantine/dates/styles.css';
import { LessonForm, StudentForm } from '@repo/src/components/organisms';

export default function BasicAppShell() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <StudentForm />

      <LessonForm />
    </>
  );
}
