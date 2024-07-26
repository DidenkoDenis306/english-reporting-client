import { faker } from '@faker-js/faker';

export function getOrdinalSuffix(number: number): string {
  if (number % 100 >= 11 && number % 100 <= 13) {
    return number + 'th';
  }

  switch (number % 10) {
    case 1:
      return number + 'st';
    case 2:
      return number + 'nd';
    case 3:
      return number + 'rd';
    default:
      return number + 'th';
  }
}

export const generateRandomWord = () => {
  return faker.word.words(1);
};

export function capitalizeFirstLetter(input: string): string {
  if (input.length === 0) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}
