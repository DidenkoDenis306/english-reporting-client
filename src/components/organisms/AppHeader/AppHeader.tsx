'use client';

import { AppShell, Burger, Flex, Text } from '@mantine/core';
import { HeaderActions } from '@repo/src/components/moleculs';
import Link from 'next/link';
import TimeDisplay from '@repo/src/components/moleculs/TimeDisplay/TimeDisplay';
import { useMediaQuery } from '@mantine/hooks';

interface Props {
  opened: boolean;
  toggle: () => void;
}

export const AppHeader = ({ opened, toggle }: Props) => {
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

          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
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
