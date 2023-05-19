/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { u128 } from '@polkadot/types';
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
  const transform = async (response: any): Promise<bigint> =>
    (response.minimalBalance as u128).toBigInt();

  return {
    assetMetadatas: (): AssetMinConfigBuilder => ({
      build: ({ asset }) =>
        new SubstrateQueryConfig({
          module: pallet,
          func: 'assetMetadatas',
          args: [asset],
          transform,
        }),
    }),
    currencyMetadatas: (): AssetMinConfigBuilder => ({
      build: ({ asset }) =>
        new SubstrateQueryConfig({
          module: pallet,
          func: 'currencyMetadatas',
          args: [asset],
          transform,
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
          transform: async (response: any): Promise<bigint> =>
            (response.minBalance as u128).toBigInt(),
        }),
    }),
  };
}
