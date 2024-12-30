'use client';

import { AppShell, Burger, Flex, Text } from '@mantine/core';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import TimeDisplay from 'widgets/Header/ui/TimeDisplay';
import { Routes } from 'shared/config';

interface Props {
  opened: boolean;
  toggle: () => void;
}

export const Header = ({ opened, toggle }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <AppShell.Header>
      <Flex
        h="100%"
        px="md"
        wrap="nowrap"
        align="center"
        justify="space-between"
      >
        <Flex wrap="nowrap" align="center" justify="space-between">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            mx={isMobile ? 10 : 20}
          />

          <Link href={Routes.dashboard} style={{ textDecoration: 'none' }}>
            <Text
              style={{ fontSize: isMobile ? 24 : 28, whiteSpace: 'nowrap' }}
              fw="bold"
              variant="gradient"
              component="span"
              gradient={{ from: 'blue', to: 'pink' }}
            >
              English Tutoring Reports
            </Text>
          </Link>
        </Flex>

        {!isMobile && <TimeDisplay />}
      </Flex>
    </AppShell.Header>
  );
};
