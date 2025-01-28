import { describe, expect, it, vi } from 'vitest';

import {
  apiMock,
  mrlBuildParamsMock,
  mrlBuildParamsSameAssetMock,
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
    };
  },
);

describe('polkadotXcm', () => {
  describe('send with transferMulticurrencies', () => {
    const extrinsic = polkadotXcm()
      .send()
      .build(mrlBuildParamsMock) as ExtrinsicConfig;

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
      expect(apiMock.tx.polkadotXcm.send.mock.lastCall).toMatchSnapshot();
    });
  });

  describe('send with transfers', () => {
    const extrinsic = polkadotXcm()
      .send()
      .build(mrlBuildParamsSameAssetMock) as ExtrinsicConfig;

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
      expect(apiMock.tx.polkadotXcm.send.mock.lastCall).toMatchSnapshot();
    });
  });
});
