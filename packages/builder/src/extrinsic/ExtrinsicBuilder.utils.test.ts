import { describe, expect, it } from 'vitest';
import { XcmVersion } from './ExtrinsicBuilder.interfaces';
import { normalizeConcrete, normalizeX1 } from './ExtrinsicBuilder.utils';

describe('normalizeX1', () => {
  it('should return original object when xcmVersion < v4', () => {
    const input = {
      interior: { X1: { Parachain: 1000 } },
    };

    expect(normalizeX1(XcmVersion.v3, input)).toEqual(input);
  });

  it('should wrap X1 value in array for xcmVersion >= v4', () => {
    const input = {
      interior: { X1: { Parachain: 1000 } },
    };
    const expected = {
      interior: { X1: [{ Parachain: 1000 }] },
    };

    expect(normalizeX1(XcmVersion.v4, input)).toEqual(expected);
  });

  it('should handle lowercase x1 key', () => {
    const input = {
      interior: { x1: { Parachain: 1000 } },
    };
    const expected = {
      interior: { x1: [{ Parachain: 1000 }] },
    };

    expect(normalizeX1(XcmVersion.v4, input)).toEqual(expected);
  });

  it('should not modify object without X1/x1 key', () => {
    const input = {
      interior: { X2: [{ Parachain: 1000 }, { GeneralIndex: 1 }] },
    };

    expect(normalizeX1(XcmVersion.v4, input)).toEqual(input);
  });
});

describe('normalizeConcrete', () => {
  it('should return original object for xcmVersion >= v4', () => {
    const input = { Parachain: 1000 };

    expect(normalizeConcrete(XcmVersion.v4, input)).toBe(input);
    expect(normalizeConcrete(XcmVersion.v5, input)).toBe(input);
  });

  it('should wrap object in Concrete for xcmVersion < v4', () => {
    const input = { Parachain: 1000 };
    const expected = { Concrete: { Parachain: 1000 } };

    expect(normalizeConcrete(XcmVersion.v3, input)).toEqual(expected);
    expect(normalizeConcrete(XcmVersion.v2, input)).toEqual(expected);
    expect(normalizeConcrete(XcmVersion.v1, input)).toEqual(expected);
  });
});
