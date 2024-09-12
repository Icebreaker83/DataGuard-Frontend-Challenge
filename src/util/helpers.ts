export const getLocalizedDate = (value: string | number) => {
  const date = new Date(value);
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString();
};
