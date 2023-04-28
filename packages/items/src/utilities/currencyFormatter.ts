const formatting_options = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
};
export const currencyFormat = (
  number: number,
  currency: string = formatting_options.currency,
  minimumFractionDigits: number = formatting_options.minimumFractionDigits,
) => {
  const currencyString = new Intl.NumberFormat('en-US', {
    ...formatting_options,
    currency,
    minimumFractionDigits,
  });
  return currencyString.format(number);
};
