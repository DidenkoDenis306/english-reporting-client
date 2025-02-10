export const hashStringToColor = (str: string): string => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  return `#${'00000'.substring(0, 6 - color.length)}${color}`;
};
