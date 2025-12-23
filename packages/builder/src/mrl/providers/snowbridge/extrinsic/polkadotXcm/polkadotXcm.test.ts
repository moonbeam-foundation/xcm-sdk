import { describe, expect, it, vi } from 'vitest';

import {
  mrlBuildParamsMock2,
  snowbridgeConfigBuilderParams,
  testAssetAmount,
} from '../../../../../../fixtures';
import type { ExtrinsicConfig } from '../../../../../extrinsic';
import { XcmVersion } from '../../../../../extrinsic/ExtrinsicBuilder.interfaces';
import { polkadotXcm } from './polkadotXcm';

vi.mock(
  import('../../../../../extrinsic/ExtrinsicBuilder.utils'),
  async (importOriginal) => {
    const mod = await importOriginal();

    return {
      getExtrinsicArgumentVersion: vi.fn(() => XcmVersion.v4),
      getExtrinsicAccount: mod.getExtrinsicAccount,
      normalizeX1: mod.normalizeX1,
      normalizeConcrete: mod.normalizeConcrete,
    };
  },
);

describe('polkadotXcm', () => {
  const snowbridgeParamsWithProtocolFee = {
    ...snowbridgeConfigBuilderParams,
    protocolFee: testAssetAmount,
  };

  describe('transferAssetsUsingTypeAndThen with canonicalEth', () => {
    const extrinsic = polkadotXcm()
      .transferAssetsUsingTypeAndThen()
      .canonicalEth()
      .build(snowbridgeParamsWithProtocolFee) as ExtrinsicConfig;

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
    });

    it('should have correct module and function', () => {
      expect(extrinsic.module).toBe('polkadotXcm');
      expect(extrinsic.func).toBe('transferAssetsUsingTypeAndThen');
    });

    it('should throw an error because destination is not an EVM chain', () => {
      expect(() =>
        (
          polkadotXcm()
            .transferAssetsUsingTypeAndThen()
            .canonicalEth()
            .build(mrlBuildParamsMock2) as ExtrinsicConfig
        ).getArgs({} as any),
      ).toThrow(
        'Destination must be an EVM chain for globalConsensus function',
      );
    });

    it('should throw an error because protocolFee is missing', () => {
      const paramsWithoutProtocolFee = {
        ...snowbridgeConfigBuilderParams,
        protocolFee: undefined,
      };

      expect(() =>
        (
          polkadotXcm()
            .transferAssetsUsingTypeAndThen()
            .canonicalEth()
            .build(paramsWithoutProtocolFee) as ExtrinsicConfig
        ).getArgs({} as any),
      ).toThrow(
        'Bridge chain fee is required for the polkadotXcm.canonicalEth function',
      );
    });
  });

  describe('transferAssetsUsingTypeAndThen args structure', () => {
    const extrinsic = polkadotXcm()
      .transferAssetsUsingTypeAndThen()
      .canonicalEth()
      .build(snowbridgeParamsWithProtocolFee) as ExtrinsicConfig;

    it('should return correct number of arguments', () => {
      const args = extrinsic.getArgs({} as any);
      expect(args).toHaveLength(7);
    });

    it('should have destination with parents 1 and interior Here', () => {
      const args = extrinsic.getArgs({} as any);
      const dest = args[0] as any;
      expect(dest.V4).toBeDefined();
      expect(dest.V4.parents).toBe(1);
      expect(dest.V4.interior).toBe('Here');
    });

    it('should have two assets in the assets array', () => {
      const args = extrinsic.getArgs({} as any);
      const assets = args[1] as any;
      expect(assets.V4).toHaveLength(2);
    });
  });
});
