export const dateToMonthYearString = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
  };
  const formattedDate: string = new Intl.DateTimeFormat(
    'fr-FR',
    options
  ).format(date);
  return formattedDate;
};
