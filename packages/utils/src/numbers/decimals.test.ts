import { toDecimal } from './decimals';

describe('utils - decimals', () => {
  describe('toDecimals', () => {
    it('should convert to decimals', () => {
      expect(toDecimal(1000000000000000000n, 18)).toBe('1.000000');
      expect(toDecimal(1000000000000000000n, 18, 0)).toBe('1');
      expect(toDecimal(1000000000000000000n, 18, 1)).toBe('1.0');
      expect(toDecimal(1000000000000000000n, 18, 2)).toBe('1.00');
      expect(toDecimal(1000000000000000000n, 18, 3)).toBe('1.000');
    });
  });
});
