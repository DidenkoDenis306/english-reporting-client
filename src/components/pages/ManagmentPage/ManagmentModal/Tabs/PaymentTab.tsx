import { Badge, Flex, Stack, Text } from '@mantine/core';
import { FC, useState } from 'react';
import { formatMonthDayYear } from '@repo/utils';

interface Props {
  lessons?: any[];
  price?: number;
  currency?: 'USD' | 'UAH';
}

export const PaymentTab: FC<Props> = ({
  lessons = [],
  price = 300,
  currency = 'USD',
}) => {
  return (
    <Stack>
      Debt: 300 UAH
      <Flex
        c="blue"
        align="center"
        p={12}
        bg="rgba(34, 139, 230, 0.1)"
        style={{ borderRadius: 8 }}
      >
        <Text fz={12} style={{ width: '40%' }}>
          LESSON DATE
        </Text>
        <Text fz={12} style={{ width: '30%', textAlign: 'center' }}>
          AMOUNT
        </Text>
        <Text fz={12} style={{ width: '30%', textAlign: 'right' }}>
          STATUS
        </Text>
      </Flex>
      {lessons.map((lesson, index) => (
        <Flex
          key={index}
          align="center"
          p={12}
          pt={0}
          style={{ borderBottom: '1px solid lightgrey' }}
        >
          <Text fz={14} fw={600} style={{ width: '40%' }}>
            {formatMonthDayYear(lesson.lessonDate)}
          </Text>
          <Text fz={14} style={{ width: '30%', textAlign: 'center' }}>
            {`${price} ${currency}`}
          </Text>
          <Text fz={14} style={{ width: '30%', textAlign: 'right' }}>
            <BadgeWithHover status={index === 0 ? 'NOT PAID' : 'PAID'} />
          </Text>
        </Flex>
      ))}
    </Stack>
  );
};

const BadgeWithHover: FC<{ status: 'NOT PAID' | 'PAID' }> = ({ status }) => {
  const [hovered, setHovered] = useState(false);

  if (status === 'PAID') {
    return (
      <Badge
        size="md"
        w={85}
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 90 }}
      >
        PAID
      </Badge>
    );
  }

  return (
    <Badge
      size="md"
      w={85}
      style={{
        color: hovered ? undefined : 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      color={hovered ? 'green' : 'red'}
      variant={hovered ? 'outline' : 'filled'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? 'APPROVE?' : 'NOT PAID'}
    </Badge>
  );
};
