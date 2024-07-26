import React, { useState, useEffect } from 'react';
import { Container, Group, Paper, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const TimeDisplay = () => {
  const [kyivTime, setKyivTime] = useState(dayjs().tz('Europe/Kyiv'));
  const [chicagoTime, setChicagoTime] = useState(dayjs().tz('America/Chicago'));

  useEffect(() => {
    const interval = setInterval(() => {
      setKyivTime(dayjs().tz('Europe/Kyiv'));
      setChicagoTime(dayjs().tz('America/Chicago'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text c="#4e7397" size="md" ta="center">
      {`Kyiv ${kyivTime.format('HH:mm')}  •  Chicago ${chicagoTime.format('HH:mm')}`}
    </Text>
  );
};

export default TimeDisplay;
