import { describe, expect, it } from 'vitest';
import {
  alphanetAssetHubMock,
  feeBuilderParamsMock,
  feeBuilderParamsMockDifferentAsset,
} from '../../../fixtures';
import type { GetVersionedAssetsProps } from './xcmPaymentApi.utils';
import { getInstructions, getVersionedAssets } from './xcmPaymentApi.utils';

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
    const mockSource = alphanetAssetHubMock;

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

    it('should return standard instructions when isEcosystemBridge is false', () => {
      const instructions = getInstructions({
        isAssetReserveChain: true,
        assets: mockAssets,
        versionedFeeAssetId: mockFeeAssetId,
        address: mockAddress,
        source: mockSource,
        isEcosystemBridge: false,
      });

      expect(instructions).toHaveLength(5);
      expect(instructions).toMatchSnapshot();
    });

    it('should return ecosystem bridge instructions when isEcosystemBridge is true', () => {
      const instructions = getInstructions({
        isAssetReserveChain: true,
        assets: mockAssets,
        versionedFeeAssetId: mockFeeAssetId,
        address: mockAddress,
        source: mockSource,
        isEcosystemBridge: true,
      });

      expect(instructions).toHaveLength(7);
      expect(instructions).toMatchSnapshot();
    });

    it('should prepend universal origin and descend origin instructions when isEcosystemBridge is true', () => {
      const instructions = getInstructions({
        isAssetReserveChain: false,
        assets: mockAssets,
        versionedFeeAssetId: mockFeeAssetId,
        address: mockAddress,
        source: mockSource,
        isEcosystemBridge: true,
      });

      expect(instructions).toHaveLength(7);
      // First two instructions should be universal origin and descend origin
      expect(instructions[0]).toEqual(expect.objectContaining({})); // UniversalOrigin instruction
      expect(instructions[1]).toEqual(expect.objectContaining({})); // DescendOrigin instruction
      expect(instructions).toMatchSnapshot();
    });

    it('should handle isEcosystemBridge true with different asset reserve chain settings', () => {
      const instructionsReserve = getInstructions({
        isAssetReserveChain: true,
        assets: mockAssets,
        versionedFeeAssetId: mockFeeAssetId,
        address: mockAddress,
        source: mockSource,
        isEcosystemBridge: true,
      });

      const instructionsNonReserve = getInstructions({
        isAssetReserveChain: false,
        assets: mockAssets,
        versionedFeeAssetId: mockFeeAssetId,
        address: mockAddress,
        source: mockSource,
        isEcosystemBridge: true,
      });

      expect(instructionsReserve).toHaveLength(7);
      expect(instructionsNonReserve).toHaveLength(7);
      expect(instructionsReserve).toMatchSnapshot();
      expect(instructionsNonReserve).toMatchSnapshot();
    });
  });
});
