import { currencyFormat } from './currencyFormatter';

describe('currencyFormat', () => {
  test('should format a number to a USD currency string with 2 decimal places by default', () => {
    const result = currencyFormat(1234.56);
    expect(result).toBe('$1,234.56');
  });

  /* test('should format a number to the specified currency and decimal places', () => {
    const result = currencyFormat(1234.56, 'EUR', 1);
    expect(result).toBe('€1,234.6');
  });

  test('should handle negative numbers', () => {
    const result = currencyFormat(-1234.56);
    expect(result).toBe('-$1,234.56');
  });*/
});
