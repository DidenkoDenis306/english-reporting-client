'use client';

import { AppShell, Box } from '@mantine/core';
import { PropsWithChildren, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Header } from 'widgets/Header/ui';
import { Sidebar } from 'widgets/Sidebar/ui';

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
      <Header opened={opened} toggle={toggle} />

      <Sidebar closeSb={close} />

      <AppShell.Main pl={290}>
        <Box>{children}</Box>
      </AppShell.Main>
    </AppShell>
  );
};
