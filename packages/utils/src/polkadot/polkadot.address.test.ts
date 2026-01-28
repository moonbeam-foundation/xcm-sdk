import { describe, expect, it } from 'vitest';

import {
  getMultilocationDerivedAddresses,
  getSovereignAccountAddresses,
} from './polkadot.address';

describe('utils - polkadot address', () => {
  describe('getSovereignAccountAddresses', () => {
    it('should get correct addresses for paraId 1000', async () => {
      expect(getSovereignAccountAddresses(1000)).toStrictEqual({
        generic:
          '0x7369626ce8030000000000000000000000000000000000000000000000000000',
        moonbeam: '0x7369626ce8030000000000000000000000000000',
        relay:
          '0x70617261e8030000000000000000000000000000000000000000000000000000',
      });
    });

    it('should get correct addresses for paraId 3019', async () => {
      expect(getSovereignAccountAddresses(3019)).toStrictEqual({
        generic:
          '0x7369626ccb0b0000000000000000000000000000000000000000000000000000',
        moonbeam: '0x7369626ccb0b0000000000000000000000000000',
        relay:
          '0x70617261cb0b0000000000000000000000000000000000000000000000000000',
      });
    });
  });

  describe('getMultilocationDerivedAddresses', () => {
    describe('parents: 0 (ChildChain)', () => {
      it('should get correct addresses for paraId 2034 and Substrate address', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 2034,
            address: '5E6kHM4zFdH5KEJE3YEzX5QuqoETVKUQadeY8LVmeh2HyHGt',
            parents: 0,
          }),
        ).toStrictEqual({
          address20: '0xc83483a4274c891ac9c272557b85b0a723202af3',
          address32:
            '0xc83483a4274c891ac9c272557b85b0a723202af342a05ca86fcf4b8bf2c3cfb4',
        });
      });

      it('should get correct addresses for paraId 3019 and Substrate address', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 3019,
            address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
            parents: 0,
          }),
        ).toStrictEqual({
          address20: '0xf90a4fa57bbb35c8e6babf18df7710c0101cd052',
          address32:
            '0xf90a4fa57bbb35c8e6babf18df7710c0101cd052937bf2dd231a78b528e18084',
        });
      });

      it('should get correct addresses for paraId 1000 and Ethereum address', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 1000,
            address: '0x1234567890123456789012345678901234567890',
            parents: 0,
          }),
        ).toStrictEqual({
          address20: '0xa0799d0168209453aebd07d2ba8a9663e65c5c3e',
          address32:
            '0xa0799d0168209453aebd07d2ba8a9663e65c5c3e1b636a5aed0afec4052eefc4',
        });
      });
    });

    describe('parents: 1 (SiblingChain or ParentChain)', () => {
      it('should get correct addresses for paraId 2034 and Substrate address (SiblingChain)', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 2034,
            address: '5E6kHM4zFdH5KEJE3YEzX5QuqoETVKUQadeY8LVmeh2HyHGt',
            parents: 1,
          }),
        ).toStrictEqual({
          address20: '0x292a2d99e3f3e43f31f208f29dc3b2b094a996de',
          address32:
            '0x292a2d99e3f3e43f31f208f29dc3b2b094a996de37ffe89a49e9733f5957072d',
        });
      });

      it('should get correct addresses for paraId 3019 and Substrate address (SiblingChain)', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 3019,
            address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
            parents: 1,
          }),
        ).toStrictEqual({
          address20: '0x5beafce000f2c667a6405a666f1e035d2a142aa8',
          address32:
            '0x5beafce000f2c667a6405a666f1e035d2a142aa8b2fd1519778ee880bc548b8a',
        });
      });

      it('should get correct addresses for no paraId and Substrate address (ParentChain)', async () => {
        expect(
          getMultilocationDerivedAddresses({
            address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
            parents: 1,
          }),
        ).toStrictEqual({
          address20: '0x7dcb1027ecb97011ebe79ca233def50d1f216eb0',
          address32:
            '0x7dcb1027ecb97011ebe79ca233def50d1f216eb05d76367c8984f67ccc5d2dd1',
        });
      });

      it('should get correct addresses for paraId 2000 and Ethereum address (SiblingChain)', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 2000,
            address: '0xabcdef0123456789abcdef0123456789abcdef01',
            parents: 1,
          }),
        ).toStrictEqual({
          address20: '0x8045598f06c295158a4d9c62d7c14210a0f9c2ff',
          address32:
            '0x8045598f06c295158a4d9c62d7c14210a0f9c2ff94c56f14dd7490f5fdc4c719',
        });
      });
    });

    describe('parents: 2 (GlobalConsensus)', () => {
      it('should get correct addresses for paraId 2023 and Ethereum address (Kusama)', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 2023,
            address: '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E',
            parents: 2,
          }),
        ).toStrictEqual({
          address20: '0x1c7fb1cbabcd242804342a3a5ebff63f0c701742',
          address32:
            '0x1c7fb1cbabcd242804342a3a5ebff63f0c701742e2f670011cf60cb66506256e',
        });
      });

      it('should get correct addresses for paraId 2004 and Ethereum address (Moonriver)', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 2004,
            address: '0x1111111111111111111111111111111111111111',
            parents: 2,
          }),
        ).toStrictEqual({
          address20: '0xb273a1db453778781025d839b083c10427aa8e25',
          address32:
            '0xb273a1db453778781025d839b083c10427aa8e251674a675d64147bd7254bc8d',
        });
      });

      it('should throw error when paraId is not provided for parents: 2', async () => {
        expect(() =>
          getMultilocationDerivedAddresses({
            address: '0x1111111111111111111111111111111111111111',
            parents: 2,
          }),
        ).toThrow(
          'ParaId is required for global consensus to get the family for getMultilocationDerivedAddresses',
        );
      });

      it('should throw error when non-Ethereum address is provided for parents: 2', async () => {
        expect(() =>
          getMultilocationDerivedAddresses({
            paraId: 2023,
            address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
            parents: 2,
          }),
        ).toThrow(
          'GlobalConsensus (parents=2) branch currently supports AccountKey20 (20-byte) addresses only',
        );
      });
    });

    describe('edge cases', () => {
      it('should handle lowercase Ethereum addresses', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 1000,
            address: '0x1234567890123456789012345678901234567890',
            parents: 0,
          }),
        ).toStrictEqual({
          address20: '0xa0799d0168209453aebd07d2ba8a9663e65c5c3e',
          address32:
            '0xa0799d0168209453aebd07d2ba8a9663e65c5c3e1b636a5aed0afec4052eefc4',
        });
      });

      it('should handle checksummed Ethereum addresses', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 2023,
            address: '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E',
            parents: 2,
          }),
        ).toStrictEqual({
          address20: '0x1c7fb1cbabcd242804342a3a5ebff63f0c701742',
          address32:
            '0x1c7fb1cbabcd242804342a3a5ebff63f0c701742e2f670011cf60cb66506256e',
        });
      });
    });
  });
});
