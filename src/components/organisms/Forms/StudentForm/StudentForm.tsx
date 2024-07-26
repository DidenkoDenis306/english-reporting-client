'use client';

import { useForm } from '@mantine/form';
import { useStudentsStore } from '@repo/store';
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Button,
  Checkbox,
  NumberInput,
  SegmentedControl,
  Stack,
  TextInput,
} from '@mantine/core';
import axios from 'axios';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';

export const StudentForm = () => {
  const { addStudent } = useStudentsStore();
  const [loading, setLoading] = useState(false);

  const queryCLient = new QueryClient();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      age: null,
      lessonsCount: 0,
      lastLessonDate: null,
      price: 300,
      currency: 'UAH',
      isPrivate: false,
    },
  });

  const onSubmit = form.onSubmit((values) => {
    setLoading(true);
    axios
      .post('http://localhost:7654/students', { ...values, teacherId: 1 })
      .then((response) => {
        addStudent(response.data);
        form.reset();
        queryCLient.invalidateQueries({ queryKey: ['students'] });
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <Stack
      p={20}
      w={400}
      style={{
        border: '2px solid #228be6',
        margin: '0 auto',
        borderRadius: '10px',
      }}
    >
      <form onSubmit={onSubmit}>
        <Stack gap="md">
          <TextInput
            required
            label="First Name"
            placeholder="First Name"
            key={form.key('firstName')}
            {...form.getInputProps('firstName')}
          />

          <TextInput
            label="Last Name"
            placeholder="Last Name"
            key={form.key('lastName')}
            {...form.getInputProps('lastName')}
          />

          <NumberInput
            label="Age"
            placeholder="Age"
            key={form.key('age')}
            {...form.getInputProps('age')}
          />

          <NumberInput
            required
            label="Lessons Count"
            placeholder="Lessons Count"
            key={form.key('lessonsCount')}
            {...form.getInputProps('lessonsCount')}
          />

          <DateInput
            valueFormat="DD.MM.YYYY"
            label="Last Lesson Date"
            placeholder="Last Lesson Date"
            key={form.key('lastLessonDate')}
            {...form.getInputProps('lastLessonDate')}
          />

          <NumberInput
            required
            label="Price"
            placeholder="Price"
            key={form.key('price')}
            {...form.getInputProps('price')}
          />

          <SegmentedControl
            color="blue"
            data={['UAH', 'USD']}
            key={form.key('currency')}
            {...form.getInputProps('currency')}
          />

          <Checkbox
            label="Private Student"
            key={form.key('isPrivate')}
            {...form.getInputProps('isPrivate')}
          />

          <Button type="submit" loading={loading}>
            Add student
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
