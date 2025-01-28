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
    describe('should get correct addresses for paraId 2034 and address 5E6kHM4zFdH5KEJE3YEzX5QuqoETVKUQadeY8LVmeh2HyHGt', async () => {
      it('and parents false', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 2034,
            address: '5E6kHM4zFdH5KEJE3YEzX5QuqoETVKUQadeY8LVmeh2HyHGt',
          }),
        ).toStrictEqual({
          address20: '0xc83483a4274c891ac9c272557b85b0a723202af3',
          address32:
            '0xc83483a4274c891ac9c272557b85b0a723202af342a05ca86fcf4b8bf2c3cfb4',
        });
      });

      it('and parents true', async () => {
        expect(
          getMultilocationDerivedAddresses({
            paraId: 2034,
            address: '5E6kHM4zFdH5KEJE3YEzX5QuqoETVKUQadeY8LVmeh2HyHGt',
            isParents: true,
          }),
        ).toStrictEqual({
          address20: '0x292a2d99e3f3e43f31f208f29dc3b2b094a996de',
          address32:
            '0x292a2d99e3f3e43f31f208f29dc3b2b094a996de37ffe89a49e9733f5957072d',
        });
      });
    });
  });

  describe('should get correct addresses for paraId 3019 and address 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', async () => {
    it('and parents false', async () => {
      expect(
        getMultilocationDerivedAddresses({
          paraId: 3019,
          address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        }),
      ).toStrictEqual({
        address20: '0xf90a4fa57bbb35c8e6babf18df7710c0101cd052',
        address32:
          '0xf90a4fa57bbb35c8e6babf18df7710c0101cd052937bf2dd231a78b528e18084',
      });
    });

    it('and parents true', async () => {
      expect(
        getMultilocationDerivedAddresses({
          paraId: 3019,
          address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          isParents: true,
        }),
      ).toStrictEqual({
        address20: '0x5beafce000f2c667a6405a666f1e035d2a142aa8',
        address32:
          '0x5beafce000f2c667a6405a666f1e035d2a142aa8b2fd1519778ee880bc548b8a',
      });
    });
  });
});
