import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Menu,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { studentsService } from 'entities/student/api';
import { useCurrentUser } from 'entities/user/model';
import { FC } from 'react';
import { hashStringToColor } from 'shared/utils';
import { CalendarLessonsData } from 'features/calendar/model';

interface Props {
  dateKey: string;
  buttonVariant: 'outline' | 'subtle';
  isDisabled: boolean;
  lessonsData: CalendarLessonsData;
  setLessonsData: React.Dispatch<React.SetStateAction<CalendarLessonsData>>;
  isHovered: boolean;
}

export const CalendarLessonsControlMenu: FC<Props> = ({
  dateKey,
  buttonVariant,
  isDisabled,
  lessonsData,
  setLessonsData,
  isHovered,
}) => {
  const { currentUser } = useCurrentUser();

  const { data: students, isLoading } = useQuery({
    enabled: Boolean(currentUser),
    queryKey: ['students'],
    queryFn: () => studentsService.getStudents(Number(currentUser?.id) || 0),
  });

  const form = useForm({ initialValues: lessonsData });

  const handleNumberInputChange = (key: string, value: number) => {
    setLessonsData((prev: any) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [key]: {
          count: value,
        },
      },
    }));
  };

  return (
    <Menu position="right-end" withArrow arrowPosition="center">
      <Menu.Target>
        <Button
          size="xs"
          radius="xl"
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            color: isDisabled ? 'lightgray' : undefined,
            transition: 'all 0.3s ease',
          }}
          variant={buttonVariant}
        >
          {!isDisabled && isHovered ? (
            <IconPlus size={12} />
          ) : (
            <span>{dateKey.split('-')[2]}</span>
          )}
        </Button>
      </Menu.Target>

      {!isDisabled && (
        <Menu.Dropdown
          style={{
            backgroundColor: '#f0f0f0',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            padding: '8px',
          }}
        >
          <Stack gap="lg" p={5}>
            <TextInput
              placeholder="Search students"
              rightSection={<IconSearch size={16} />}
              size="xs"
            />

            <Stack gap="xs">
              {students &&
                students.map((student) => {
                  const key = `${student.firstName} ${student.lastName}`;

                  return (
                    <Group
                      key={student.id}
                      gap="xs"
                      style={{ fontSize: 13 }}
                      justify="space-between"
                    >
                      <Flex>
                        <Box
                          style={{
                            width: 5,
                            marginRight: 10,
                            height: '20px',
                            borderRadius: '8px',
                            backgroundColor: `${hashStringToColor(
                              `${student.firstName} ${student.lastName}`,
                            )}`,
                          }}
                        ></Box>
                        <span>{`${student.firstName} ${student.lastName}`}</span>
                      </Flex>

                      <NumberInput
                        w={50}
                        size="xs"
                        min={0}
                        max={3}
                        defaultValue={0}
                        value={form.values[key] as any}
                        onChange={(value) => {
                          // form.setFieldValue(key, Number(value));
                          handleNumberInputChange(key, Number(value));
                        }}
                      />
                    </Group>
                  );
                })}
            </Stack>
          </Stack>
        </Menu.Dropdown>
      )}
    </Menu>
  );
};
