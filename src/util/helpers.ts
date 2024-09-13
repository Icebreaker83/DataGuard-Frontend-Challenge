export const getLocalizedDate = (value: string | number) => {
  const date = new Date(value);
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString();
};

export const getLocalizedValue = (value: string | number) => {
  const numVal = Number(value);
  if (!isNaN(numVal)) return numVal.toLocaleString();
  return getLocalizedDate(value);
};
