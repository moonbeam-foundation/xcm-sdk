/* eslint-disable @typescript-eslint/no-use-before-define */

import { Option } from '@polkadot/types';
import { PalletAssetsAssetDetails } from '@polkadot/types/lookup';
import { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';
import { AssetMinConfigBuilder } from './AssetMinBuilder.interfaces';

export function AssetMinBuilder() {
  return {
    assetRegistry,
    assets,
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
