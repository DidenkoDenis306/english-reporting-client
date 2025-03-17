import { Badge, Box, Grid, Group, Popover } from '@mantine/core';
import { hashStringToColor } from 'shared/utils';
import { CalendarLessonsData } from 'features/calendar/model';
import { FC } from 'react';
import { CalendarLessonsControlMenu } from 'features/calendar/ui/CalendarLessonsControlModal';
import { useDisclosure } from '@mantine/hooks';

interface Props {
  dateKey: string;
  buttonVariant: 'outline' | 'subtle';
  isDisabled: boolean;
  lessonsData: CalendarLessonsData;
  lessonsForDay: CalendarLessonsData[string] | undefined;
  hoveredDay: string | null;
  setHoveredDay: (day: string | null) => void;
  columns: number;
  rows: number;
  index: number;
}

export const MonthCalendarDay: FC<Props> = ({
  dateKey,
  buttonVariant,
  isDisabled,
  lessonsForDay,
  lessonsData,
  hoveredDay,
  setHoveredDay,
  columns,
  rows,
  index,
}) => {
  const [opened, { close, open }] = useDisclosure(false);

  const isTopRow = index < columns;
  const isBottomRow = index >= columns * (rows - 1);
  const isLeftColumn = index % columns === 0;
  const isRightColumn = index % columns === columns - 1;
  const showBadge =
    !isDisabled && lessonsForDay && Object.keys(lessonsForDay).length > 0;

  return (
    <Grid.Col
      span={12 / columns}
      style={{
        border: '0.5px solid #ccc',
        borderTop: isTopRow ? 'none' : '0.5px solid #ccc',
        borderBottom: isBottomRow ? 'none' : '0.5px solid #ccc',
        borderLeft: isLeftColumn ? 'none' : '0.5px solid #ccc',
        borderRight: isRightColumn ? 'none' : '0.5px solid #ccc',
        minHeight: 100,
        position: 'relative',
      }}
      onMouseEnter={() => setHoveredDay(dateKey)}
      onMouseLeave={() => setHoveredDay(null)}
    >
      <Box>
        <CalendarLessonsControlMenu
          dateKey={dateKey}
          buttonVariant={buttonVariant}
          isDisabled={isDisabled}
          lessonsData={lessonsData}
          setLessonsData={() => {}}
          isHovered={hoveredDay === dateKey}
        />
        {lessonsForDay && (
          <Group
            gap={2}
            style={{ position: 'absolute', bottom: 0, padding: 5 }}
          >
            {showBadge &&
              Object.entries(lessonsForDay)
                .slice(0, 2)
                .map(([name, count]) => (
                  <Badge
                    key={name}
                    color={hashStringToColor(name)}
                    size="sm"
                    radius="md"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {name} ({count})
                  </Badge>
                ))}
            {showBadge && Object.entries(lessonsForDay).length > 3 && (
              <Popover
                width={200}
                position="bottom"
                withArrow
                shadow="md"
                opened={opened}
              >
                <Popover.Target>
                  <Badge
                    color="gray"
                    size="sm"
                    radius="md"
                    style={{
                      textTransform: 'lowercase',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={open}
                    onMouseLeave={close}
                  >
                    {Object.entries(lessonsForDay).length - 2} more
                  </Badge>
                </Popover.Target>
                <Popover.Dropdown
                  p={4}
                  maw={180}
                  style={{ pointerEvents: 'none' }}
                >
                  <Group gap={4}>
                    {Object.entries(lessonsForDay)
                      .slice(2)
                      .map(([name, count]) => (
                        <Badge
                          key={name}
                          color={hashStringToColor(name)}
                          size="sm"
                          radius="md"
                          style={{ textTransform: 'capitalize' }}
                        >
                          {name} ({count})
                        </Badge>
                      ))}
                  </Group>
                </Popover.Dropdown>
              </Popover>
            )}
          </Group>
        )}
      </Box>
    </Grid.Col>
  );
};
