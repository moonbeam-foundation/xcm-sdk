import { Ecosystem } from '../Chain.interfaces';
import { EvmParachain } from './EvmParachain';

describe('evmParachain', () => {
  const parachain = new EvmParachain({
    assetsData: [],
    ecosystem: Ecosystem.Polkadot,
    genesisHash:
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    key: 'polkadot',
    name: 'Polkadot',
    parachainId: 100,
    rpc: '',
    ws: '',
  });

  describe('isEvmParachain', () => {
    it('should return true', () => {
      expect(parachain.isEvmParachain()).toBe(true);
    });
  });

  describe('isParachain', () => {
    it('should return false', () => {
      expect(parachain.isParachain()).toBe(false);
    });
  });
});
