import { describe, expect, it } from 'vitest';

import { Asset } from '../../asset';
import { Ecosystem } from '../Chain.interfaces';
import { Parachain } from './Parachain';

describe('Parachain', () => {
  const parachain = new Parachain({
    assets: [],
    ecosystem: Ecosystem.Polkadot,
    genesisHash:
      '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    key: 'polkadot',
    name: 'Polkadot',
    nativeAsset: new Asset({ key: 'glmr', originSymbol: 'GLMR' }),
    parachainId: 0,
    ss58Format: 42,
    ws: ['wss://rpc.polkadot.io'],
  });

  describe('is', () => {
    it('should return true', () => {
      expect(Parachain.is(parachain)).toBe(true);
    });
  });
});
