import { Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import React from 'react';

export const CustomCalendar = () => {
  const currentDate = new Date();

  return (
    <Calendar
      static
      renderDay={(date) => {
        const day = date.getDate();
        const isCurrentDay =
          date.getDate() === currentDate.getDate() &&
          date.getMonth() === currentDate.getMonth() &&
          date.getFullYear() === currentDate.getFullYear();

        return (
          <Indicator size={6} color="red" offset={-2} disabled={!isCurrentDay}>
            <div>{day}</div>
          </Indicator>
        );
      }}
    />
  );
};
