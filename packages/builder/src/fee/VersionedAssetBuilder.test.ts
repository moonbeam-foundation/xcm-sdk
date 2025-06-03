import { Asset, ChainAsset } from '@moonbeam-network/xcm-types';
import { describe, expect, it } from 'vitest';
import { alphanetAssetHubMock, testChainAsset } from '../../fixtures';
import { BuildVersionedAsset } from './VersionedAssetBuilder';

describe('BuildVersionedAsset', () => {
  describe('fromHere', () => {
    it('should return correct structure with default parents', () => {
      const result = BuildVersionedAsset().fromHere();
      expect(result).toEqual({
        parents: 1,
        interior: 'Here',
      });
    });

    it('should return correct structure with custom parents', () => {
      const result = BuildVersionedAsset().fromHere(2);
      expect(result).toEqual({
        parents: 2,
        interior: 'Here',
      });
    });
  });

  describe('fromAccountKey20', () => {
    it('should return correct structure', () => {
      const result = BuildVersionedAsset().fromAccountKey20(testChainAsset);
      expect(result).toEqual({
        interior: {
          X2: [
            {
              PalletInstance: 10,
            },
            {
              AccountKey20: {
                key: testChainAsset.address,
                network: null,
              },
            },
          ],
        },
        parents: '0',
      });
    });
  });

  describe('fromGeneralIndex', () => {
    it('should return correct structure', () => {
      const result = BuildVersionedAsset().fromGeneralIndex(testChainAsset);
      expect(result).toEqual({
        interior: {
          X1: [{ GeneralIndex: 'USDT' }],
        },
        parents: '0',
      });
    });
  });

  describe('fromGlobalConsensus', () => {
    it('should return correct structure', () => {
      const result = BuildVersionedAsset().fromGlobalConsensus(testChainAsset);
      expect(result).toEqual({
        interior: {
          X2: [
            { GlobalConsensus: { Ethereum: { chainId: 1 } } },
            {
              AccountKey20: {
                key: testChainAsset.address,
                network: null,
              },
            },
          ],
        },
        parents: 2,
      });
    });
  });

  describe('fromPalletInstance', () => {
    it('should return correct structure', () => {
      const result = BuildVersionedAsset().fromPalletInstance(testChainAsset);
      expect(result).toEqual({
        interior: {
          X1: [
            {
              PalletInstance: 10,
            },
          ],
        },
        parents: '0',
      });
    });

    it('should throw error if no pallet instance', () => {
      const assetWithoutPallet = ChainAsset.fromAsset(
        new Asset({ key: 'mockAsset', originSymbol: 'MOCK' }),
        {
          decimals: 18,
          address: testChainAsset.address,
          ids: { id: 1 },
        },
      );

      expect(() => {
        BuildVersionedAsset().fromPalletInstance(assetWithoutPallet);
      }).toThrow('Pallet instance is not defined for MOCK');
    });
  });

  describe('fromPalletInstanceAndGeneralIndex', () => {
    it('should return correct structure', () => {
      const result =
        BuildVersionedAsset().fromPalletInstanceAndGeneralIndex(testChainAsset);
      expect(result).toEqual({
        interior: {
          X2: [
            {
              PalletInstance: 10,
            },
            { GeneralIndex: 'USDT' },
          ],
        },
        parents: '0',
      });
    });
  });

  describe('fromSource', () => {
    describe('accountKey20', () => {
      it('should return correct structure', () => {
        const result = BuildVersionedAsset()
          .fromSource()
          .accountKey20(alphanetAssetHubMock, testChainAsset);

        expect(result).toEqual({
          interior: {
            X3: [
              { Parachain: 1001 },
              { PalletInstance: 10 },
              {
                AccountKey20: {
                  key: testChainAsset.address,
                  network: null,
                },
              },
            ],
          },
          parents: 1,
        });
      });
    });

    describe('palletInstance', () => {
      it('should return correct structure', () => {
        const result = BuildVersionedAsset()
          .fromSource()
          .palletInstance(alphanetAssetHubMock, testChainAsset);

        expect(result).toEqual({
          interior: {
            X2: [{ Parachain: 1001 }, { PalletInstance: 10 }],
          },
          parents: 1,
        });
      });
    });

    describe('palletInstanceAndGeneralIndex', () => {
      it('should return correct structure', () => {
        const result = BuildVersionedAsset()
          .fromSource()
          .palletInstanceAndGeneralIndex(alphanetAssetHubMock, testChainAsset);

        expect(result).toEqual({
          interior: {
            X3: [
              { Parachain: 1001 },
              { PalletInstance: 10 },
              { GeneralIndex: 'USDT' },
            ],
          },
          parents: 1,
        });
      });
    });
  });
});
