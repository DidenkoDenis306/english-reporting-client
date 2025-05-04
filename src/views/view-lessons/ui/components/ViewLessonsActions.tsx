import { DatePeriodFilter } from 'features/date-period-filter/ui';
import { Button, Flex, Stack, Text } from '@mantine/core';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import { IStudentResponse, studentsService } from 'entities/student/api';
import { FC } from 'react';
import { modals } from '@mantine/modals';
import { IStudent } from 'entities/student/model';
import { notifications } from '@mantine/notifications';
import { DeleteStudentButton } from 'entities/student/ui';

interface Props {
  student: IStudent;
  filter: string | null;
  setFilter: (filter: string | null) => void;
  onExportAllLessons: () => void;
  onRefetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<IStudentResponse, Error>>;
}

export const ViewLessonsActions: FC<Props> = ({
  student,
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
          <DeleteStudentButton student={student} />{' '}
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
