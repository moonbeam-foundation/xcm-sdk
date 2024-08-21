/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import {
  wormholeConfigBuilderPrams,
  wormholeToMoonchainConfigBuilderPrams,
} from '../../../fixtures';
import { wormholeSdk } from './WormholeSdkBuilder';

describe('wormholeSdk', async () => {
  const moonApi = await getPolkadotApi(
    'wss://wss.api.moonbase.moonbeam.network',
  );

  describe('tokenTransfer with isAutomatic=true', () => {
    const transfer = wormholeSdk().tokenTransfer({ isAutomatic: true });

    it('should be correct config', () => {
      expect(
        transfer.build({ ...wormholeConfigBuilderPrams, moonApi }),
      ).toMatchSnapshot();
    });
  });

  describe('tokenTransfer with isAutomatic=false', () => {
    const transfer = wormholeSdk().tokenTransfer({ isAutomatic: false });

    it('should be correct config to moon chain', () => {
      expect(
        transfer.build({ ...wormholeToMoonchainConfigBuilderPrams, moonApi }),
      ).toMatchSnapshot();
    });
  });
});
