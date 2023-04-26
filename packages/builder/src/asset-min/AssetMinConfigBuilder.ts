/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { u128 } from '@polkadot/types';
import { QueryConfig } from '../QueryConfig';
import { AssetMinConfigBuilder } from './AssetMinConfigBuilder.interfaces';

export function AssetMinBuilder() {
  return {
    assets,
    assetRegistry,
  };
}

function assets() {
  return {
    asset: (): AssetMinConfigBuilder => ({
      build: ({ asset }) =>
        new QueryConfig({
          pallet: 'assets',
          func: 'asset',
          args: [asset],
          transform: (response: any): bigint =>
            (response.minBalance as u128).toBigInt(),
        }),
    }),
  };
}

function assetRegistry() {
  const pallet = 'assetRegistry';

  return {
    assetMetadatas: (): AssetMinConfigBuilder => ({
      build: ({ asset }) =>
        new QueryConfig({
          pallet,
          func: 'assetMetadatas',
          args: [{ ForeignAssetId: asset }],
          transform: (response: any): bigint =>
            (response.minimalBalance as u128).toBigInt(),
        }),
    }),
    currencyMetadatas: (): AssetMinConfigBuilder => ({
      build: ({ asset }) =>
        new QueryConfig({
          pallet,
          func: 'currencyMetadatas',
          args: [{ Token2: asset }],
          transform: (response: any): bigint =>
            (response.minimalBalance as u128).toBigInt(),
        }),
    }),
  };
}
