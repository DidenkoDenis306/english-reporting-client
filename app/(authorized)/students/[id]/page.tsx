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
import { studentsService } from '@repo/services';
import { TipTapEditor } from '@repo/src/components/organisms/TipTapEditor/TipTapEditor';
import { formatMonthDayYear } from '@repo/src/utils/date';
import { getOrdinalSuffix } from '@repo/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const { id } = useParams();

  const [filter, setFilter] = useState<string | null>(null);

  const {
    data: student,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['student'],
    queryFn: () => studentsService.getStudent(Number(id), filter),
  });

  const items = student?.data.lessons
    ? student?.data.lessons.map((lesson) => (
        <Accordion.Item key={lesson.id} value={lesson.lessonDate}>
          <Accordion.Control>{`${formatMonthDayYear(lesson.lessonDate)} ${getOrdinalSuffix(lesson.lessonNumber)} lesson`}</Accordion.Control>
          <Accordion.Panel>
            <TipTapEditor student={student.data} lesson={lesson} />
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
      {student?.data && (
        <Stack>
          <Flex align="center" justify="space-between" wrap={'wrap'}>
            <Title w={500}>
              {student?.data.firstName} {student?.data.lastName}
            </Title>

            <Flex gap="sm" mt={4}>
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

          <Accordion variant="filled" defaultValue="Apples">
            {items}
          </Accordion>
        </Stack>
      )}
    </>
  );
}
