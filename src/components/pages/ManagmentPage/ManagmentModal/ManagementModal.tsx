import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { FC, ReactElement, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { studentsService } from '@repo/services';
import { Routes } from '@repo/constants';
import { useRouter } from 'next/navigation';
import { GeneralInfoTab } from '@repo/src/components/pages/ManagmentPage/ManagmentModal/Tabs/GeneralInfoTab';
import { PaymentTab } from '@repo/src/components/pages/ManagmentPage/ManagmentModal/Tabs/PaymentTab';

interface Props {
  studentId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

interface TabData {
  tab: string;
  panel: ReactElement;
}

export const ManagementModal: FC<Props> = ({ studentId, isOpen, onClose }) => {
  const { push } = useRouter();

  const { data: student } = useQuery({
    enabled: Boolean(studentId),
    queryKey: ['student', studentId],
    queryFn: () => studentsService.getStudent(studentId!),
  });

  const tabsData: TabData[] = useMemo(
    () => [
      {
        tab: 'General',
        panel: <GeneralInfoTab student={student?.data ?? null} />,
      },
      {
        tab: 'Payments',
        panel: (
          <PaymentTab
            lessons={student?.data.lessons.slice(-5)}
            price={student?.data.price}
            currency={student?.data.currency}
          />
        ),
      },
    ],
    [student],
  );

  if (!student) {
    return;
  }

  const {
    id,
    firstName,
    lastName,
    age,
    teacherId,
    lessonsCount,
    lastLessonDate,
    price,
    currency,
    isPrivate,
    lessons,
  } = student!.data;

  return (
    <Modal
      size="xl"
      opened={isOpen}
      onClose={onClose}
      title="Detailed Managment"
    >
      <Flex h={400}>
        <Stack
          w={200}
          p={12}
          align="center"
          justify="space-between"
          style={{ borderRight: '1px solid lightgray' }}
        >
          <Stack align="center">
            <Avatar
              key={`${firstName} ${lastName}`}
              name={`${firstName} ${lastName}`}
              color="initials"
              size="xl"
              w={100}
              h={100}
            />
            {firstName} {lastName}
          </Stack>

          <Stack gap="md">
            <Button
              variant="outline"
              onClick={() => push(`${Routes.Students}/${id}`)}
            >
              View lessons
            </Button>
            <Button variant="outline" color="red" h={35}>
              Delete Student
            </Button>
          </Stack>
        </Stack>
        <Stack w={600} px={24}>
          {/*<Title>{`${firstName} ${lastName}`}</Title>*/}

          <Tabs radius="md" defaultValue={tabsData[0].tab}>
            <Tabs.List>
              {tabsData.map((item) => (
                <Tabs.Tab
                  value={item.tab}
                  // leftSection={<IconPhoto style={iconStyle} />}
                >
                  {item.tab}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {tabsData.map((item) => (
              <Tabs.Panel value={item.tab} pt={12}>
                {item.panel}
              </Tabs.Panel>
            ))}
          </Tabs>
        </Stack>
      </Flex>
    </Modal>
  );
};
