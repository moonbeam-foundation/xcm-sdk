/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it, vi } from 'vitest';

import { apiMock, mrlBuildParamsMock } from '../../../../../fixtures';
import { polkadotXcm } from './polkadotXcm';
import { XcmVersion } from '../../../ExtrinsicBuilder.interfaces';

vi.mock(import('../../../ExtrinsicBuilder.utils'), async (importOriginal) => {
  const mod = await importOriginal();

  return {
    getExtrinsicArgumentVersion: vi.fn(() => XcmVersion.v4),
    getExtrinsicAccount: mod.getExtrinsicAccount,
  };
});

describe('polkadotXcm', () => {
  describe('send', () => {
    const extrinsic = polkadotXcm().send().build(mrlBuildParamsMock);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
      expect(apiMock.tx.polkadotXcm.send.mock.lastCall).toMatchSnapshot();
    });
  });
});
