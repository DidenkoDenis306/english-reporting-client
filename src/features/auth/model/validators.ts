import { FormErrors } from '@mantine/form';
import { LoginFormFields } from 'features/auth/model';
import { validateRequiredFields } from 'shared/utils';

export const loginValidator = (values: LoginFormFields) => {
  const errors: FormErrors = {};

  const requiredFields: (keyof LoginFormFields)[] = ['login', 'password'];

  validateRequiredFields(values, requiredFields, errors);

  return errors;
};
