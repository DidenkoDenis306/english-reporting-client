'use client';

import { AppShell, Divider, Flex, Stack, Text } from '@mantine/core';
import TimeDisplay from '@repo/src/components/moleculs/TimeDisplay/TimeDisplay';
import { StudentsList } from '@repo/src/components/organisms';
import {
  IconCalendarFilled,
  IconChartBar,
  IconCoinFilled,
  IconHomeFilled,
  IconUsers,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();

  const navLinks = [
    { title: 'Dashboard', path: '/dashboard', icon: <IconHomeFilled /> },
    { title: 'Calendar', path: '/calendar', icon: <IconCalendarFilled /> },
    {
      title: 'Detailed Statistics',
      path: '/statistics',
      icon: <IconChartBar />,
    },
    { title: 'Student Management', path: '/management', icon: <IconUsers /> },
    { title: 'Salary Calculation', path: '/salary', icon: <IconCoinFilled /> },
  ];

  return (
    <AppShell.Navbar px="md" w={270} pt={30}>
      <Stack justify="space-between" h="100%" pb={12}>
        <Stack gap="md">
          {navLinks.map((link) => (
            <Link
              href={link.path}
              style={{ textDecoration: 'none', color: 'rgb(71, 77, 102)' }}
            >
              <Flex
                gap={12}
                align="center"
                p={8}
                bg={pathname === link.path ? '#ededed' : 'transparent'}
                style={{ borderRadius: 8 }}
              >
                {link.icon}
                <Text fz={14}>{link.title}</Text>
              </Flex>
            </Link>
          ))}

          <Stack gap="md">
            <Divider />

            <StudentsList />
          </Stack>
        </Stack>

        <TimeDisplay />
      </Stack>
    </AppShell.Navbar>
  );
};