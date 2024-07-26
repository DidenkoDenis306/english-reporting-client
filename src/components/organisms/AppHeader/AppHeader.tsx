'use client';

import { AppShell, Flex, Text } from '@mantine/core';
import { HeaderActions } from '@repo/src/components/moleculs';
import Link from 'next/link';

export const AppHeader = () => {
  return (
    <AppShell.Header>
      <Flex h="100%" px="md" wrap="nowrap" align="center">
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <Text
            style={{ fontSize: 28, whiteSpace: 'nowrap' }}
            fw="bold"
            variant="gradient"
            component="span"
            gradient={{ from: 'blue', to: 'pink' }}
          >
            English Tutoring Reports
          </Text>
        </Link>
        {/*<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />*/}
        <HeaderActions />
      </Flex>
    </AppShell.Header>
  );
};
