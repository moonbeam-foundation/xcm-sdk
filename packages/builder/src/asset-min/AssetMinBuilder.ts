import type { Option } from '@polkadot/types';
import type { PalletAssetsAssetDetails } from '@polkadot/types/lookup';
import { getExtrinsicAccount } from '../extrinsic/ExtrinsicBuilder.utils';
import { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';
import type { AssetMinConfigBuilder } from './AssetMinBuilder.interfaces';

export function AssetMinBuilder() {
  return {
    assetRegistry,
    assets,
    foreignAssets,
  };
}

function assetRegistry() {
  const pallet = 'assetRegistry';
  return {
    assetMetadatas: (): AssetMinConfigBuilder => ({
      build: ({ asset }) =>
        new SubstrateQueryConfig({
          module: pallet,
          func: 'assetMetadatas',
          args: [asset],
          // biome-ignore lint/suspicious/noExplicitAny: not sure how to fix this
          transform: async (response: Option<any>): Promise<bigint> =>
            response.unwrapOrDefault().minimalBalance.toBigInt(),
        }),
    }),
    currencyMetadatas: (): AssetMinConfigBuilder => ({
      build: ({ asset }) =>
        new SubstrateQueryConfig({
          module: pallet,
          func: 'currencyMetadatas',
          args: [asset],
          // biome-ignore lint/suspicious/noExplicitAny: not sure how to fix this
          transform: async (response: Option<any>): Promise<bigint> =>
            response.unwrapOrDefault().minimalBalance.toBigInt(),
        }),
    }),
  };
}

function assets() {
  return {
    asset: (): AssetMinConfigBuilder => ({
      build: ({ asset }) =>
        new SubstrateQueryConfig({
          module: 'assets',
          func: 'asset',
          args: [asset],
          transform: async (
            response: Option<PalletAssetsAssetDetails>,
          ): Promise<bigint> =>
            response.unwrapOrDefault().minBalance.toBigInt(),
        }),
    }),
  };
}

function foreignAssets() {
  return {
    asset: (): AssetMinConfigBuilder => ({
      build: ({ address }) => {
        if (!address) {
          throw new Error(
            'Asset address is missing for foreignAssets.asset min calculation',
          );
        }
        const multilocation = {
          parents: 2,
          interior: {
            X2: [
              {
                globalconsensus: {
                  ethereum: {
                    chainId: 1,
                  },
                },
              },
              getExtrinsicAccount(address),
            ],
          },
        };
        return new SubstrateQueryConfig({
          module: 'foreignAssets',
          func: 'asset',
          args: [multilocation],
          transform: async (
            response: Option<PalletAssetsAssetDetails>,
          ): Promise<bigint> =>
            response.unwrapOrDefault().minBalance.toBigInt(),
        });
      },
    }),
  };
}
