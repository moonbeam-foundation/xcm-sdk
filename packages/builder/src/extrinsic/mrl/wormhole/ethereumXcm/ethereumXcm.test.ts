/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { ethereumXcm } from './ethereumXcm';
import {
  mrlBuildParamsMock,
  mrlBuildParamsMock2,
} from '../../../../../fixtures';

describe('ethereumXcm', () => {
  describe('transact', () => {
    const extrinsic = ethereumXcm()
      .transact({ isAutomatic: true })
      .build(mrlBuildParamsMock);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
    });

    it('should throw and error because destination has no wh name', () => {
      expect(() =>
        ethereumXcm()
          .transact({ isAutomatic: true })
          .build(mrlBuildParamsMock2)
          .getArgs({} as any),
      ).toThrow('Chain Interlay Testnet does not have a wormhole name');
    });
  });
});
