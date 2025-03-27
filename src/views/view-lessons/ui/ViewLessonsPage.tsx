import { useParams } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { studentsService } from 'entities/student/api';
import { Button, Flex, Loader, Stack } from '@mantine/core';
import { LessonsAccordion } from 'views/view-lessons/ui/components/LessonsAccordion';
import { StudentFullName } from 'entities/student/ui';
import { ViewLessonsActions } from 'views/view-lessons/ui/components/ViewLessonsActions';

type TipTapEditorRef = {
  clickButton: () => void;
};

export function ViewLessonsPage() {
  const params = useParams<{ id: string }>();

  if (!params?.id) {
    return <div>ID not found</div>;
  }

  const [filter, setFilter] = useState<string | null>(null);

  const editorsRefs = useRef<{ [key: string]: TipTapEditorRef }>({});

  const {
    data: student,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['student'],
    queryFn: () => studentsService.getStudent(Number(params.id), filter),
  });

  const handleClickAll = () => {
    Object.values(editorsRefs.current).forEach((ref) => ref.clickButton());
  };

  if (isLoading) {
    return (
      <Flex align={'center'} justify={'center'} h="70vh">
        <Loader />
      </Flex>
    );
  }

  console.log(student?.lessons);

  return (
    <>
      {student && (
        <Stack>
          <Flex align="center" justify="space-between" wrap={'wrap'}>
            <StudentFullName
              firstName={student.firstName}
              lastName={student.lastName}
            />

            <ViewLessonsActions
              filter={filter}
              setFilter={setFilter}
              onExportAllLessons={handleClickAll}
              onRefetch={refetch}
            />
          </Flex>

          <LessonsAccordion student={student} />
        </Stack>
      )}
    </>
  );
}
