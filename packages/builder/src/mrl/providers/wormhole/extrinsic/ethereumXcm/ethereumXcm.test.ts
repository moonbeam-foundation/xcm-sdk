import { describe, expect, it } from 'vitest';

import {
  mrlBuildParamsMock,
  mrlBuildParamsMock2,
} from '../../../../../../fixtures';
import type { ExtrinsicConfig } from '../../../../../extrinsic';
import { ethereumXcm } from './ethereumXcm';

describe('ethereumXcm', () => {
  describe('transact', () => {
    const extrinsic = ethereumXcm()
      .transact()
      .build(mrlBuildParamsMock) as ExtrinsicConfig;

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
    });

    it('should throw and error because destination has no wh name', () => {
      expect(() =>
        (
          ethereumXcm().transact().build(mrlBuildParamsMock2) as ExtrinsicConfig
        ).getArgs({} as any),
      ).toThrow('Chain Interlay Testnet does not have a wormhole name');
    });
  });
});
