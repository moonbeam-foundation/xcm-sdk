import { describe, expect, it } from 'vitest';

import { snowbridgeConfigBuilderParams } from '../../../../../../fixtures';
import type { ExtrinsicConfig } from '../../../../../extrinsic';
import { ethereumTokenTransfers } from './ethereumTokenTransfers';

describe('ethereumTokenTransfers', () => {
  describe('transferNativeToken', () => {
    const extrinsic = ethereumTokenTransfers()
      .transferNativeToken()
      .build(snowbridgeConfigBuilderParams) as ExtrinsicConfig;

    it('should be correct config', () => {
      expect(extrinsic).toMatchSnapshot();
    });

    it('should get correct arguments', () => {
      expect(extrinsic.getArgs({} as any)).toMatchSnapshot();
    });
  });
});
