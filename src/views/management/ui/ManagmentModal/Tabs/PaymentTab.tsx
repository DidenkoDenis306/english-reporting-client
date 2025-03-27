import { Badge, Button, Flex, Stack, Text, Title } from '@mantine/core';
import { FC, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatMonthDayYear } from 'shared/utils';

interface Props {
  lessons?: any[];
  price?: number;
  currency?: 'USD' | 'UAH';
}

export const PaymentTab: FC<Props> = ({
  lessons = [],
  price = 300,
  currency = 'USD',
}) => {
  const debt = 300;

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.text('Payment Receipt', 14, 10);

    const tableData = lessons.map((lesson, index) => [
      formatMonthDayYear(lesson.lessonDate),
      `${price} ${currency}`,
      index === 0 ? 'NOT PAID' : 'PAID',
    ]);

    // @ts-expect-error
    doc.autoTable({
      head: [['Lesson Date', 'Price', 'Status']],
      body: tableData,
      startY: 20,
    });

    doc.text(
      `Total payable: ${debt > 0 ? debt : '0'} ${currency}`,
      14,
      // @ts-expect-error
      doc.lastAutoTable.finalY + 10,
    );

    doc.setFontSize(14);
    doc.text(
      `Card Credentials: 4149499094837836
PayPal: ddidenko441@gmail.com
      `,
      14,
      // @ts-expect-error
      doc.lastAutoTable.finalY + 30,
    );

    doc.save('payment_receipt.pdf');
  };

  return (
    <>
      {lessons.length === 0 ? (
        <Title order={3}>No lessons yet</Title>
      ) : (
        <Stack gap={30} h="100%">
          <Stack>
            <Flex
              c="blue"
              align="center"
              p={12}
              bg="rgba(34, 139, 230, 0.1)"
              style={{ borderRadius: 8 }}
            >
              <Text fz={12} style={{ width: '40%' }}>
                LESSON DATE
              </Text>
              <Text fz={12} style={{ width: '30%', textAlign: 'center' }}>
                PRICE
              </Text>
              <Text fz={12} style={{ width: '30%', textAlign: 'right' }}>
                STATUS
              </Text>
            </Flex>
            {lessons.map((lesson, index) => (
              <Flex
                key={index}
                align="center"
                p={12}
                pt={0}
                style={{ borderBottom: '1px solid lightgrey' }}
              >
                <Text fz={14} fw={400} style={{ width: '40%' }}>
                  {formatMonthDayYear(lesson.lessonDate)}
                </Text>
                <Text fz={14} style={{ width: '30%', textAlign: 'center' }}>
                  {`${price} ${currency}`}
                </Text>
                <Text fz={14} style={{ width: '30%', textAlign: 'right' }}>
                  <BadgeWithHover status={index === 0 ? 'NOT PAID' : 'PAID'} />
                </Text>
              </Flex>
            ))}
          </Stack>

          <Flex align="center" justify="space-between">
            <span>
              Debt:{' '}
              <span
                style={{
                  color: debt > 0 ? 'red' : 'green',
                  display: 'inline',
                  fontWeight: 600,
                }}
              >
                {debt} UAH
              </span>
            </span>

            <Button variant="light" onClick={downloadPdf}>
              Download receipt
            </Button>
          </Flex>
        </Stack>
      )}
    </>
  );
};

const BadgeWithHover: FC<{ status: 'NOT PAID' | 'PAID' }> = ({ status }) => {
  const [hovered, setHovered] = useState(false);

  if (status === 'PAID') {
    return (
      <Badge
        size="md"
        w={85}
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 90 }}
      >
        PAID
      </Badge>
    );
  }

  return (
    <Badge
      size="md"
      w={85}
      style={{
        color: hovered ? undefined : 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      color={hovered ? 'green' : 'red'}
      variant={hovered ? 'outline' : 'filled'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? 'APPROVE?' : 'NOT PAID'}
    </Badge>
  );
};
