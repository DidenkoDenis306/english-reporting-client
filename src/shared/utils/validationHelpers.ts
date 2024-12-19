import { FormErrors } from '@mantine/form';
import { ErrorsWithKeys } from '../types';

export const validateLength = (
  field: string,
  value: string | null | undefined,
  minLength: number,
  maxLength: number,
  errors: FormErrors,
): void => {
  if (value && (value.length < minLength || value.length > maxLength)) {
    errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is ${
      value.length < minLength ? 'too short' : 'too long'
    }`;
  }
};

export const validateRequiredFields = <T>(
  values: T,
  requiredFields: (keyof T)[],
  errors: ErrorsWithKeys<T>,
): void => {
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Field is required';
    }
  });
};
