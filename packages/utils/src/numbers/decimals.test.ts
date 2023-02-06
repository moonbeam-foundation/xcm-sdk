/* eslint-disable jest/max-expects */
import Big from 'big.js';
import { toBigInt, toDecimal } from './decimals';

describe('utils - decimals', () => {
  describe('toDecimals', () => {
    it('should convert to decimals with 18 decimals', () => {
      expect(toDecimal(1_678_578_001_143_648_100n, 18)).toBe(1.678578);
      expect(toDecimal(4_778_448_942_696_649_000n, 18, 0)).toBe(5);
      expect(toDecimal(9_277_414_529_928_219_000n, 18, 1)).toBe(9.3);
      expect(toDecimal(1_489_926_767_190_488_000n, 18, 2)).toBe(1.49);
      expect(toDecimal(7_111_587_933_365_016_000n, 18, 3)).toBe(7.112);
      expect(toDecimal(7_111_587_933_365_016_000n, 18, 18)).toBe(
        7.111587933365016,
      );
    });

    it('should convert to decimals with 12 decimals', () => {
      expect(toDecimal(52_912_391_280_480n, 12)).toBe(52.912391);
      expect(toDecimal(796_301_020_21449n, 12, 0)).toBe(80);
      expect(toDecimal(370_024_965_982_774n, 12, 1)).toBe(370);
      expect(toDecimal(776_879_141_948n, 12, 2)).toBe(0.78);
      expect(toDecimal(372_209_875_392n, 12, 3)).toBe(0.372);
      expect(toDecimal(372_209_875_392n, 12, 12)).toBe(0.372209875392);
    });

    it('should convert to decimals from number', () => {
      expect(toDecimal(167_857_800, 9)).toBe(0.167858);
      expect(toDecimal(477_844_894, 9, 0)).toBe(0);
      expect(toDecimal(927_741_452, 9, 1)).toBe(0.9);
      expect(toDecimal(148_992_676, 9, 2)).toBe(0.15);
      expect(toDecimal(711_158_793, 9, 3)).toBe(0.711);
      expect(toDecimal(711_158_793, 9, 9)).toBe(0.711158793);
    });

    it('should convert to decimals from string', () => {
      expect(toDecimal('167_857_800', 9)).toBe(0.167858);
      expect(toDecimal('167_857_800n', 9)).toBe(0.167858);
      expect(toDecimal('477_844_894', 9, 0)).toBe(0);
      expect(toDecimal('927_741_452', 9, 1)).toBe(0.9);
      expect(toDecimal('148_992_676', 9, 2)).toBe(0.15);
      expect(toDecimal('711_158_793', 9, 3)).toBe(0.711);
      expect(toDecimal('711_158_793', 9, 9)).toBe(0.711158793);
      expect(toDecimal('711_158_793n', 9, 9)).toBe(0.711158793);
    });

    it('should convert to decimals with the correct rounding types', () => {
      expect(toDecimal(477_844_894, 9, 0)).toBe(0);
      expect(toDecimal(370_024_965_982_774n, 12, 1, Big.roundDown)).toBe(370);
      expect(toDecimal(477_844_894, 9, 0, Big.roundUp)).toBe(1);
      expect(toDecimal('167_850_000n', 9, 4, Big.roundHalfEven)).toBe(0.1678);
      expect(toDecimal('7_117_587_933_365_016_000', 18, 2)).toBe(7.12);
      expect(toDecimal('7_117_587_933_365_016_000', 18, 2, Big.roundDown)).toBe(
        7.11,
      );
      expect(
        toDecimal('7_117_587_933_365_016_000', 18, 2, Big.roundHalfUp),
      ).toBe(7.12);
    });
  });

  describe('toBigInt', () => {
    it('should convert to BigInt', () => {
      expect(toBigInt('1.678578', 18)).toBe(1_678_578_000_000_000_000n);
      expect(toBigInt('5', 18)).toBe(5_000_000_000_000_000_000n);
      expect(toBigInt('9.3', 18)).toBe(9_300_000_000_000_000_000n);
      expect(toBigInt('1.49', 18)).toBe(1_490_000_000_000_000_000n);
      expect(toBigInt('7.112', 18)).toBe(7_112_000_000_000_000_000n);
      expect(toBigInt('7.111587933365016', 18)).toBe(
        7_111_587_933_365_016_000n,
      );
    });

    it('should convert to BigInt with 12 decimals', () => {
      expect(toBigInt('52.912391', 12)).toBe(52_912_391_000_000n);
      expect(toBigInt('80', 12)).toBe(80_000_000_000_000n);
      expect(toBigInt('370', 12)).toBe(370_000_000_000_000n);
      expect(toBigInt('0.78', 12)).toBe(780_000_000_000n);
      expect(toBigInt('0.372', 12)).toBe(372_000_000_000n);
      expect(toBigInt('0.372209875392', 12)).toBe(372_209_875_392n);
    });

    it('should convert to BigInt from number', () => {
      expect(toBigInt(52.912391, 12)).toBe(52_912_391_000_000n);
      expect(toBigInt(80, 12)).toBe(80_000_000_000_000n);
      expect(toBigInt(370, 12)).toBe(370_000_000_000_000n);
      expect(toBigInt(0.78, 12)).toBe(780_000_000_000n);
      expect(toBigInt(0.372, 12)).toBe(372_000_000_000n);
      expect(toBigInt(0.372209875392, 12)).toBe(372_209_875_392n);
    });
  });
});
