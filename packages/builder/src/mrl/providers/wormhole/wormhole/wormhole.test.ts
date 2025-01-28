import { describe, expect, it } from 'vitest';

import { getPolkadotApi } from '@moonbeam-network/xcm-utils';
import {
  wormholeConfigBuilderParams,
  wormholeToMoonchainConfigBuilderParams,
} from '../../../../../fixtures';
import { wormhole } from './wormhole';

describe('wormhole', async () => {
  const moonApi = await getPolkadotApi(
    'wss://wss.api.moonbase.moonbeam.network',
  );

  describe('tokenTransfer with isAutomatic=true', () => {
    const transfer = wormhole().tokenTransfer();

    it('should be correct config', () => {
      expect(
        transfer.build({
          ...wormholeConfigBuilderParams,
          moonApi,
          isAutomatic: true,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('tokenTransfer with isAutomatic=false', () => {
    const transfer = wormhole().tokenTransfer();

    it('should be correct config to moon chain', () => {
      expect(
        transfer.build({
          ...wormholeToMoonchainConfigBuilderParams,
          moonApi,
          isAutomatic: false,
        }),
      ).toMatchSnapshot();
    });
  });
});
