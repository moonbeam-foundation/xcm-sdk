/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { ethereumXcm } from './ethereumXcm';
import { mrlBuildParamsMock } from '../../../../../fixtures';

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
  });
});
