'use client';

import {
  AppShell,
  Divider,
  Flex,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import {
  IconCalendarFilled,
  IconChartBar,
  IconCoinFilled,
  IconHomeFilled,
  IconUsers,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { SidebarActions } from 'widgets/Sidebar/ui/SidebarActions';
import { StudentsList } from 'entities/student/ui';
import { Routes } from 'shared/config';
import { NavigationLink } from 'shared/ui';

export const Sidebar = ({ closeSb }: { closeSb: () => void }) => {
  const pathname = usePathname();

  const navLinks = useMemo(
    () => [
      { title: 'Dashboard', path: Routes.dashboard, icon: <IconHomeFilled /> },
      {
        title: 'Calendar',
        path: Routes.calendar,
        icon: <IconCalendarFilled />,
      },
      {
        title: 'Detailed Statistics',
        path: Routes.statistics,
        icon: <IconChartBar />,
      },
      {
        title: 'Student Management',
        path: Routes.management,
        icon: <IconUsers />,
      },
      {
        title: 'Salary Calculation',
        path: Routes.salary,
        icon: <IconCoinFilled />,
      },
    ],
    [],
  );

  return (
    <AppShell.Navbar px="md" w={270} pt={30}>
      <ScrollArea>
        <Stack justify="space-between" h="100%" pb={12}>
          <Stack gap="md">
            {navLinks.map((link) => (
              <NavigationLink
                key={link.path}
                path={link.path}
                title={link.title}
                icon={link.icon}
                isActive={pathname === link.path}
                onClick={closeSb}
              />
            ))}
            <Stack gap="md">
              <Divider />
              <StudentsList closeSb={closeSb} />
            </Stack>
          </Stack>
          <SidebarActions />
        </Stack>
      </ScrollArea>
    </AppShell.Navbar>
  );
};
