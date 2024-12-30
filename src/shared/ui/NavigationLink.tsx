import { Flex, Text } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  title: string;
  path: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export const NavigationLink: FC<Props> = ({
  title,
  path,
  icon,
  isActive,
  onClick,
}) => (
  <Link
    href={path}
    onClick={onClick}
    style={{ textDecoration: 'none', color: 'rgb(71, 77, 102)' }}
  >
    <Flex
      gap={12}
      align="center"
      p="sm"
      bg={isActive ? '#ededed' : 'transparent'}
      style={{ borderRadius: 8 }}
    >
      {icon}
      <Text fz={14}>{title}</Text>
    </Flex>
  </Link>
);
