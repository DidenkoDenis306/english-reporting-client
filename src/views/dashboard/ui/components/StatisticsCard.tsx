import { Stack, Text } from '@mantine/core';
import { FC } from 'react';
import { useMobile } from 'shared/hooks';

interface Props {
  title: string;
  value: string | number;
}

export const StatisticsCard: FC<Props> = ({ title, value }) => {
  const isMobile = useMobile();

  return (
    <Stack
      w={270}
      h={112}
      gap={8}
      style={{ border: '1px solid #d1dbe8', padding: 24, borderRadius: 12 }}
    >
      <Text fw={500} fz={isMobile ? 12 : 16}>
        {title}
      </Text>
      <Text fw={800} fz={isMobile ? 18 : 24}>
        {value}
      </Text>
    </Stack>
  );
};
