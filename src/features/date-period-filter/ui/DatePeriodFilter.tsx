import { Select, Button, Flex } from '@mantine/core';
import { FC } from 'react';

interface DatePeriodFilterProps {
  filter: string | null;
  onApply: () => void;
  onReset: () => void;
  onChangeFilter: (filter: string | null) => void;
}

export const DatePeriodFilter: FC<DatePeriodFilterProps> = ({
  filter,
  onChangeFilter,
  onApply,
  onReset,
}) => {
  return (
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
        onChange={onChangeFilter}
      />
      <Button variant="light" h={35} onClick={onApply}>
        Apply
      </Button>
      <Button variant="outline" h={35} onClick={onReset}>
        Reset
      </Button>
    </Flex>
  );
};
