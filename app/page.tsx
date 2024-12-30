'use client';

import { useDisclosure } from '@mantine/hooks';
import '@mantine/dates/styles.css';
import { CreateStudentForm } from 'entities/student/ui';
import { CreateLessonForm } from 'widgets/CreateLessonForm/ui';
import { useRouter } from 'next/navigation';

export default function BasicAppShell() {
  const { push } = useRouter();

  push('/dashboard');

  return (
    <>
      <CreateStudentForm />

      <CreateLessonForm />
    </>
  );
}
