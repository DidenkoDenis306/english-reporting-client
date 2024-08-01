'use client';

import { AppShell, Box } from '@mantine/core';
import { AppHeader, Sidebar } from '@repo/src/components/organisms';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useDisclosure } from '@mantine/hooks';

export const AuthorizedLayout = ({ children }: PropsWithChildren) => {
  const [opened, { toggle, close }] = useDisclosure();

  useEffect(() => {
    document.body.style.overflow = opened ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [opened]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppHeader opened={opened} toggle={toggle} />

      <Sidebar closeSb={close} />

      <AppShell.Main>
        <Box>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
};
