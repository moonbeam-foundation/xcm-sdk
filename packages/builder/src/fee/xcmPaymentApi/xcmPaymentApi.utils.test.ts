import type { ApiPromise } from '@polkadot/api';
import { describe, expect, it } from 'vitest';
import {
  feeBuilderParamsMock,
  feeBuilderParamsMockDifferentAsset,
} from '../../../fixtures';
import { getInstructions, getVersionedAssets } from './xcmPaymentApi.utils';
import type { GetVersionedAssetsProps } from './xcmPaymentApi.utils';
const mockApi = {
  isReady: Promise.resolve(true),
  isReadyOrError: Promise.resolve(true),
  clone: () => mockApi,
} as unknown as ApiPromise;

describe('xcmPaymentApi.utils', () => {
  describe('getVersionedAssets', () => {
    const mockVersionedFeeAsset = { parents: 1, interior: 'Here' };
    const mockVersionedTransferAsset = {
      parents: 1,
      interior: {
        X1: [{ PalletInstance: 3 }],
      },
    };

    it('should return only fee asset when assets are the same', async () => {
      const props: GetVersionedAssetsProps = {
        getVersionedFeeAsset: async () => mockVersionedFeeAsset,
        getVersionedTransferAsset: async () => mockVersionedTransferAsset,
        options: {
          isAssetReserveChain: true,
          shouldTransferAssetPrecedeFeeAsset: false,
        },
        params: {
          ...feeBuilderParamsMock,
        },
      };

      const [assets, versionedFeeAssetId] = await getVersionedAssets(props);

      expect(assets).toHaveLength(1);
      expect(assets).toContain(mockVersionedFeeAsset);
      expect(versionedFeeAssetId).toBe(mockVersionedFeeAsset);
      expect(assets).toMatchSnapshot();
    });

    it('should put transfer asset first when shouldTransferAssetPrecedeFeeAsset is true', async () => {
      const props = {
        getVersionedFeeAsset: async () => mockVersionedFeeAsset,
        getVersionedTransferAsset: async () => mockVersionedTransferAsset,
        options: {
          isAssetReserveChain: true,
          shouldTransferAssetPrecedeFeeAsset: true,
        },
        params: {
          ...feeBuilderParamsMockDifferentAsset,
        },
      };

      const [assets, versionedFeeAssetId] = await getVersionedAssets(props);

      expect(assets).toHaveLength(2);
      expect(assets[0]).toBe(mockVersionedTransferAsset);
      expect(assets[1]).toBe(mockVersionedFeeAsset);
      expect(versionedFeeAssetId).toBe(mockVersionedFeeAsset);
      expect(assets).toMatchSnapshot();
    });

    it('should put fee asset first when shouldTransferAssetPrecedeFeeAsset is false', async () => {
      const props = {
        getVersionedFeeAsset: async () => mockVersionedFeeAsset,
        getVersionedTransferAsset: async () => mockVersionedTransferAsset,
        options: {
          isAssetReserveChain: true,
          shouldTransferAssetPrecedeFeeAsset: false,
        },
        params: {
          ...feeBuilderParamsMockDifferentAsset,
        },
      };

      const [assets, versionedFeeAssetId] = await getVersionedAssets(props);

      expect(assets).toHaveLength(2);
      expect(assets[0]).toBe(mockVersionedFeeAsset);
      expect(assets[1]).toBe(mockVersionedTransferAsset);
      expect(versionedFeeAssetId).toBe(mockVersionedFeeAsset);
      expect(assets).toMatchSnapshot();
    });
  });

  describe('getInstructions', () => {
    const mockAddress = '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E';
    const mockAssets = [{ id: 1 }, { id: 2 }];
    const mockFeeAssetId = { id: 1 };

    it('should return withdraw asset instruction when isAssetReserveChain is true', () => {
      const instructions = getInstructions({
        isAssetReserveChain: true,
        assets: mockAssets,
        versionedFeeAssetId: mockFeeAssetId,
        address: mockAddress,
      });

      expect(instructions).toHaveLength(5);
      expect(instructions).toMatchSnapshot();
    });

    it('should return reserve asset deposited instruction when isAssetReserveChain is false', () => {
      const instructions = getInstructions({
        isAssetReserveChain: false,
        assets: mockAssets,
        versionedFeeAssetId: mockFeeAssetId,
        address: mockAddress,
      });

      expect(instructions).toHaveLength(5);
      expect(instructions).toMatchSnapshot();
    });

    it('should maintain correct instruction order', () => {
      const instructions = getInstructions({
        isAssetReserveChain: true,
        assets: mockAssets,
        versionedFeeAssetId: mockFeeAssetId,
        address: mockAddress,
      });

      expect(instructions).toMatchSnapshot();
    });
  });
});
