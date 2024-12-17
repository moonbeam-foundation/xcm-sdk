import { describe, expect, it } from 'vitest';

import {
  fantomTestnet,
  moonbaseAlpha,
  peaqAlphanet,
} from '@moonbeam-network/xcm-config';
import { getMoonChainAddress } from './getMoonChainData';

describe('mrl - getMoonChainData', () => {
  describe('getMoonChainAddress', () => {
    it('should return the correct moonchain address for a parachain to evm transaction', () => {
      const params = {
        source: peaqAlphanet,
        destination: fantomTestnet,
        sourceAddress: '5GWpSdqkkKGZmdKQ9nkSF7TmHp6JWt28BMGQNuG4MXtSvq3e',
        destinationAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
      };

      const result = getMoonChainAddress(params);
      expect(result).toBe('0xa18b59fcd9d8a76c3cb16dc6dc42296ebb66a57a'); // computed origin account
    });

    it('should return the correct moonchain address for a evm to parachain transaction', () => {
      const params = {
        source: fantomTestnet,
        destination: peaqAlphanet,
        sourceAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
        destinationAddress: '5GWpSdqkkKGZmdKQ9nkSF7TmHp6JWt28BMGQNuG4MXtSvq3e',
      };

      const result = getMoonChainAddress(params);
      expect(result).toBe('0x08480769599E23F626efff39B89F3137e9917a40');
    });

    it('should return the source chain address when source is a moonchain', () => {
      const params = {
        source: moonbaseAlpha,
        destination: fantomTestnet,
        sourceAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
        destinationAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
      };

      const result = getMoonChainAddress(params);
      expect(result).toBe('0x08480769599E23F626efff39B89F3137e9917a40');
    });

    it('should return the destination chain address when destination is a moonchain', () => {
      const params = {
        source: fantomTestnet,
        destination: moonbaseAlpha,
        sourceAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
        destinationAddress: '0x08480769599E23F626efff39B89F3137e9917a40',
      };

      const result = getMoonChainAddress(params);
      expect(result).toBe('0x08480769599E23F626efff39B89F3137e9917a40');
    });
  });
});
