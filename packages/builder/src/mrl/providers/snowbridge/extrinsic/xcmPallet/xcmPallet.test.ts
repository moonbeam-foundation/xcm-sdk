import { describe, expect, it, vi } from 'vitest';

import {
  apiMock,
  mrlBuildParamsMock2,
  snowbridgeConfigBuilderParams,
} from '../../../../../../fixtures';
import type { ExtrinsicConfig } from '../../../../../extrinsic';
import { XcmVersion } from '../../../../../extrinsic/ExtrinsicBuilder.interfaces';
import { xcmPallet } from './xcmPallet';

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

describe('xcmPallet', () => {
  describe('transferAssets with globalConsensus', () => {
    const extrinsic = xcmPallet()
      .transferAssets()
      .globalConsensus()
      .build(snowbridgeConfigBuilderParams) as ExtrinsicConfig;

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
      expect(
        apiMock.tx.xcmPallet.transferAssets.mock.lastCall,
      ).toMatchSnapshot();
    });

    it('should throw an error because destination is not an EVM chain', () => {
      expect(() =>
        (
          xcmPallet()
            .transferAssets()
            .globalConsensus()
            .build(mrlBuildParamsMock2) as ExtrinsicConfig
        ).getArgs({} as any),
      ).toThrow(
        'Destination must be an EVM chain for globalConsensus function',
      );
    });
  });

  describe('transferAssets with globalConsensusErc20', () => {
    const extrinsic = xcmPallet()
      .transferAssets()
      .globalConsensusErc20()
      .build(snowbridgeConfigBuilderParams) as ExtrinsicConfig;

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
      expect(
        apiMock.tx.xcmPallet.transferAssets.mock.lastCall,
      ).toMatchSnapshot();
    });

    it('should throw an error because destination is not an EVM chain', () => {
      expect(() =>
        (
          xcmPallet()
            .transferAssets()
            .globalConsensusErc20()
            .build(mrlBuildParamsMock2) as ExtrinsicConfig
        ).getArgs({} as any),
      ).toThrow(
        'Destination must be an EVM chain for globalConsensusErc20 function',
      );
    });
  });
});
