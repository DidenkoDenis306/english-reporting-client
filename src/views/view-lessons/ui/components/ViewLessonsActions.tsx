import { DatePeriodFilter } from 'features/date-period-filter/ui';
import { Button, Flex, Stack } from '@mantine/core';
import { useViewLessonsPage } from 'views/view-lessons/model';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { IStudentResponse } from 'entities/student/api';
import { FC } from 'react';

interface Props {
  filter: string | null;
  setFilter: (filter: string | null) => void;
  onExportAllLessons: () => void;
  onRefetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<IStudentResponse, Error>>;
}

export const ViewLessonsActions: FC<Props> = ({
  filter,
  setFilter,
  onExportAllLessons,
  onRefetch,
}) => {
  return (
    <Stack w="100%">
      <Flex align="center" justify="space-between">
        <DatePeriodFilter
          filter={filter}
          onApply={onRefetch}
          onReset={() => setFilter(null)}
          onChangeFilter={setFilter}
        />

        <Button variant="outline" color="red" h={35}>
          Delete Student
        </Button>
      </Flex>

      <Button
        variant="outline"
        color="blue"
        h={35}
        onClick={onExportAllLessons}
      >
        Export All to .docx
      </Button>
    </Stack>
  );
};
