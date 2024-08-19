/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import {
  wormholeConfigBuilderPrams,
  wormholeToMoonchainConfigBuilderPrams,
} from '../../fixtures';
import { WormholeBuilder } from './WormholeBuilder';

describe('wormholeBuilder', async () => {
  const moonApi = await getPolkadotApi(
    'wss://wss.api.moonbase.moonbeam.network',
  );

  describe('tokenTransfer with isAutomatic=true', () => {
    const transfer = WormholeBuilder().tokenTransfer({ isAutomatic: true });

    it('should be correct config', () => {
      expect(
        transfer.build({ ...wormholeConfigBuilderPrams, moonApi }),
      ).toMatchSnapshot();
    });
  });

  describe('tokenTransfer with isAutomatic=false', () => {
    const transfer = WormholeBuilder().tokenTransfer({ isAutomatic: false });

    it('should be correct config to moon chain', () => {
      expect(
        transfer.build({ ...wormholeToMoonchainConfigBuilderPrams, moonApi }),
      ).toMatchSnapshot();
    });
  });
});
