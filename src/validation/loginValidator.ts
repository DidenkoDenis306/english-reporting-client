import { FormErrors } from '@mantine/form';
import { LoginFormFields } from '@repo/src/components/organisms/Forms/LoginForm/loginForm.types';
import { validateRequiredFields } from '@repo/src/validation/validation.helpers';

export const loginValidator = (values: LoginFormFields) => {
  const errors: FormErrors = {};

  const requiredFields: (keyof LoginFormFields)[] = ['login', 'password'];

  validateRequiredFields(values, requiredFields, errors);

  return errors;
};
