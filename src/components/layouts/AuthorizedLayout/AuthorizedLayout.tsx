'use client';

import { AppShell, Box } from '@mantine/core';
import { AppHeader, Sidebar } from '@repo/src/components/organisms';
import { PropsWithChildren } from 'react';

export const AuthorizedLayout = ({ children }: PropsWithChildren) => {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        // collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppHeader />

      <Sidebar />

      <AppShell.Main>
        <Box>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
};
