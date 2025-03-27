'use client';

import {
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { authBackgroundImages } from 'pages/login/ui/authBackgroundImages';

export function RegisterForm() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (prevImage) => (prevImage + 1) % authBackgroundImages.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [authBackgroundImages.length]);

  return (
    <div
      style={{ backgroundImage: `url(${authBackgroundImages[currentImage]})` }}
    >
      <Paper radius={0} p={30}>
        <Text
          ta="center"
          mt="md"
          fw="bold"
          style={{ fontSize: 32 }}
          mb={50}
          variant="gradient"
          gradient={{ from: 'blue', to: 'pink' }}
        >
          {`Welcome to`} <br /> {`English Reporting!`}
        </Text>

        <Stack gap="md">
          <TextInput
            label="First Name"
            placeholder="Your first name"
            size="md"
          />

          <TextInput label="Last Name" placeholder="Your last name" size="md" />

          <TextInput label="Login" placeholder="Your login" size="md" />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            size="md"
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Your password"
            size="md"
          />
        </Stack>

        <Button
          fullWidth
          mt="xl"
          size="md"
          variant="gradient"
          gradient={{ from: 'blue', to: 'pink' }}
        >
          Sign Up
        </Button>
      </Paper>
    </div>
  );
}
