'use client';

import { Paper, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import classes from './LoginPage.module.css';
import { authBackgroundImages } from 'pages/login/ui/authBackgroundImages';
import { LoginForm } from 'features/auth/ui/LoginForm';

export const LoginPage = () => {
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
      className={classes.wrapper}
      style={{ backgroundImage: `url(${authBackgroundImages[currentImage]})` }}
    >
      <Paper className={classes.form} radius={0} p={30}>
        <Text
          ta="center"
          mt="md"
          fw="bold"
          style={{ fontSize: 32 }}
          mb={50}
          variant="gradient"
          gradient={{ from: 'blue', to: 'pink' }}
        >
          {`Welcome back to`} <br /> {`English Reporting!`}
        </Text>

        <LoginForm />
      </Paper>
    </div>
  );
};
