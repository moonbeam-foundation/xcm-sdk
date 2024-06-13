// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import { Ecosystem } from '../Chain.interfaces';
import { Parachain } from './Parachain';

describe('parachain', () => {
  const parachain = new Parachain({
    ecosystem: Ecosystem.Polkadot,
    genesisHash:
      '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    key: 'polkadot',
    name: 'Polkadot',
    parachainId: 0,
    ss58Format: 42,
    ws: 'wss://rpc.polkadot.io',
  });

  describe('isParachain', () => {
    it('should return true', () => {
      expect(parachain.isParachain()).toBe(true);
    });
  });

  describe('isEvmParachain', () => {
    it('should return false', () => {
      expect(parachain.isEvmParachain()).toBe(false);
    });
  });
});
