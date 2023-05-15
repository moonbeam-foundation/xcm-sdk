import { Ecosystem } from '../Chain.interfaces';
import { Parachain } from './Parachain';

describe('parachain', () => {
  const parachain = new Parachain({
    assetsData: [],
    ecosystem: Ecosystem.Polkadot,
    genesisHash:
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    key: 'polkadot',
    name: 'Polkadot',
    parachainId: 100,
    ws: '',
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
