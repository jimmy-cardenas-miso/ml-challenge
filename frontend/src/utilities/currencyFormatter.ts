export const currencyFormat = (number: number) =>
  '$' + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
