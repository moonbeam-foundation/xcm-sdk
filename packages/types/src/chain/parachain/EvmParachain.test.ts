// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { Ecosystem } from '../Chain.interfaces';
import { EvmParachain } from './EvmParachain';
import { Asset } from '../../asset';

describe('EvmParachain', () => {
  const parachain = new EvmParachain({
    assets: [],
    ecosystem: Ecosystem.Polkadot,
    genesisHash:
      '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
    id: 1284,
    key: 'moonbeam',
    name: 'Moonbeam',
    nativeAsset: new Asset({ key: 'glmr', originSymbol: 'GLMR' }),
    parachainId: 2004,
    rpc: 'https://rpc.api.moonbeam.network',
    ss58Format: 1284,
    ws: 'wss://wss.api.moonbeam.network',
  });

  describe('is', () => {
    it('should return true', () => {
      expect(EvmParachain.is(parachain)).toBe(true);
    });
  });
});
