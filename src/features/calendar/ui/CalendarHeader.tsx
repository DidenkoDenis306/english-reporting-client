import { Grid, Stack } from '@mantine/core';
import { FC } from 'react';

interface Props {
  daysOfWeek: string[];
  columns: number;
}

export const CalendarHeader: FC<Props> = ({ daysOfWeek, columns }) => (
  <>
    {Array.from({ length: columns }).map((_, index) => (
      <Grid.Col key={index} span={12 / columns}>
        <Stack justify="center" align="center" mb={12}>
          <span>{daysOfWeek[index % 7]}</span>
        </Stack>
      </Grid.Col>
    ))}
  </>
);
