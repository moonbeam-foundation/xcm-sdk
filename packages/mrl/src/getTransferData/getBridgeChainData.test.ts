import {
  ethereum,
  type MrlAssetRoute,
  moonbeam,
  peaqChain,
} from '@moonbeam-network/xcm-config';
import { describe, expect, it } from 'vitest';
import { getBridgeChainAddress } from './getBridgeChainData';

describe('mrl - getBridgeChainData', () => {
  describe('getBridgeChainAddress', () => {
    it('should return the correct bridge chain address for a parachain to evm transaction', () => {
      const route = {
        source: { chain: peaqChain },
        destination: { chain: ethereum },
        mrl: {
          bridgeChain: { chain: moonbeam },
        },
      } as MrlAssetRoute;

      const result = getBridgeChainAddress({
        route,
        sourceAddress: '5GWpSdqkkKGZmdKQ9nkSF7TmHp6JWt28BMGQNuG4MXtSvq3e',
        destinationAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
      });
      expect(result).toBe('0x2034ac54113966751b8571ea841bdd3da6ed56f6'); // computed origin account
    });

    it('should return the correct bridge chain address for a evm to parachain transaction', () => {
      const route = {
        source: { chain: ethereum },
        destination: { chain: peaqChain },
        mrl: {
          bridgeChain: { chain: moonbeam },
        },
      } as MrlAssetRoute;

      const result = getBridgeChainAddress({
        route,
        sourceAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
        destinationAddress: '5GWpSdqkkKGZmdKQ9nkSF7TmHp6JWt28BMGQNuG4MXtSvq3e',
      });
      expect(result).toBe('0x08480769599E23F626efff39B89F3137e9917a40');
    });

    it('should return the source chain address when source is a bridge chain', () => {
      const route = {
        source: { chain: moonbeam },
        destination: { chain: ethereum },
        mrl: {
          bridgeChain: { chain: moonbeam },
        },
      } as MrlAssetRoute;

      const result = getBridgeChainAddress({
        route,
        sourceAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
        destinationAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
      });
      expect(result).toBe('0x08480769599E23F626efff39B89F3137e9917a40');
    });

    it('should return the destination chain address when destination is a bridge chain', () => {
      const route = {
        source: { chain: ethereum },
        destination: { chain: moonbeam },
        mrl: {
          bridgeChain: { chain: moonbeam },
        },
      } as MrlAssetRoute;

      const result = getBridgeChainAddress({
        route,
        sourceAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
        destinationAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
      });
      expect(result).toBe('0x08480769599E23F626efff39B89F3137e9917a40');
    });
  });
});
