'use client';

import {
  Accordion,
  Button,
  Flex,
  Loader,
  Select,
  Stack,
  Title,
} from '@mantine/core';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { studentsService } from 'entities/student/api';
import { formatMonthDayYear, getOrdinalSuffix } from 'shared/utils';
import { EditLessonEditor } from 'features/editor/ui';

type TipTapEditorRef = {
  clickButton: () => void;
};

export default function Page() {
  const { id } = useParams();

  const [filter, setFilter] = useState<string | null>(null);

  const editorsRefs = useRef<{ [key: string]: TipTapEditorRef }>({});

  const addToRefs = useCallback((key: string, el: TipTapEditorRef | null) => {
    if (el) {
      editorsRefs.current[key] = el;
    }
  }, []);

  const handleClickAll = () => {
    Object.values(editorsRefs.current).forEach((ref) => ref.clickButton());
  };

  const {
    data: student,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['student'],
    queryFn: () => studentsService.getStudent(Number(id), filter),
  });

  const items = student?.lessons
    ? student?.lessons.map((lesson) => (
        <Accordion.Item key={lesson.id} value={String(lesson.id)}>
          <Accordion.Control>{`${formatMonthDayYear(lesson.lessonDate)} ${getOrdinalSuffix(lesson.lessonNumber)} lesson`}</Accordion.Control>
          <Accordion.Panel>
            <EditLessonEditor
              // @ts-expect-error
              ref={(el) => addToRefs(lesson.id, el)}
              student={student}
              lesson={lesson}
            />
          </Accordion.Panel>
        </Accordion.Item>
      ))
    : null;

  const handleApply = () => {
    refetch();
  };

  const handleReset = () => {
    setFilter(null);
  };

  if (isLoading) {
    return (
      <Flex align={'center'} justify={'center'} h="70vh">
        <Loader />
      </Flex>
    );
  }

  return (
    <>
      {student && (
        <Stack>
          <Flex align="center" justify="space-between" wrap={'wrap'}>
            <Title w={500}>
              {student?.firstName} {student?.lastName}
            </Title>

            <Flex gap="sm" my={8}>
              <Select
                h={35}
                placeholder="Pick value"
                data={[
                  { value: 'week', label: 'This week' },
                  { value: 'month', label: 'This month' },
                  { value: 'year', label: 'This year' },
                ]}
                value={filter}
                onChange={setFilter}
              />

              <Button variant="light" h={35} onClick={handleApply}>
                Apply
              </Button>

              <Button variant="outline" h={35} onClick={handleReset}>
                Reset
              </Button>
            </Flex>

            <Button variant="outline" color="red" h={35}>
              Delete Student
            </Button>
          </Flex>

          <Button
            variant="outline"
            color="blue"
            h={35}
            onClick={handleClickAll}
          >
            Export All to .docx
          </Button>

          <Accordion variant="filled" defaultValue="Apples">
            {items}
          </Accordion>
        </Stack>
      )}
    </>
  );
}
