import { Ecosystem } from '../Chain.interfaces';
import { EvmParachain } from './EvmParachain';

describe('evmParachain', () => {
  const parachain = new EvmParachain({
    ecosystem: Ecosystem.Polkadot,
    genesisHash:
      '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
    id: 1284,
    key: 'moonbeam',
    name: 'Moonbeam',
    nativeCurrency: {
      decimals: 18,
      name: 'Glimmer',
      symbol: 'GLMR',
    },
    parachainId: 2004,
    rpc: 'https://rpc.api.moonbeam.network',
    ss58Format: 1284,
    ws: 'wss://wss.api.moonbeam.network',
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
