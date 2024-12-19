'use client';

import { Button, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import { FormErrors, useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from 'entities/user/model';
import { loginValidator } from 'features/auth/model';
import { authService } from 'features/auth/api';

export function LoginForm() {
  const { push } = useRouter();
  const { setCurrentUser } = useCurrentUser();

  const form = useForm({
    initialValues: {
      login: '',
      password: '',
    },
    validate: loginValidator,
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      setCookie(
        'currentUser',
        JSON.stringify({
          id: data.user.id,
          login: data.user.login,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          isSpecial: data.user.isSpecial,
        }),
      );

      setCurrentUser(data.user);

      push('/dashboard');
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 500) {
        form.setErrors({ form: 'Unexpected error occurred' });
      }

      if (error.response && error.response.status !== 500) {
        form.setErrors(error.response.data as FormErrors);
      }
    },
  });

  const onSubmit = form.onSubmit((values) => {
    login(values);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="md">
        <TextInput
          label="Login"
          placeholder="Your login"
          size="md"
          key={form.key('login')}
          {...form.getInputProps('login')}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          size="md"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        {form.errors.form && (
          <Text hidden={!form.errors.form} c="red">
            {form.errors.form}
          </Text>
        )}

        <Button
          fullWidth
          mt="xl"
          size="md"
          variant="gradient"
          gradient={{ from: 'blue', to: 'pink' }}
          type="submit"
          disabled={!form.isDirty()}
          loading={isPending}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}
