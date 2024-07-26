export type ErrorsWithKeys<T> = {
  [K in keyof T]?: string;
};
