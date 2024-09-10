import { describe, expect, it } from 'vitest';

import { buildParamsMock } from '../../../../fixtures';
import { xcmPallet } from './xcmPallet';

describe('xcmPallet', () => {
  describe('limitedReserveTransferAssets', () => {
    const extrinsic = xcmPallet()
      .limitedReserveTransferAssets()
      .here()
      .build(buildParamsMock);

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs()).toMatchSnapshot();
    });
  });
});
