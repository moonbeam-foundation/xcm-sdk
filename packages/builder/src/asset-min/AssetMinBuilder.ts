/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { u128 } from '@polkadot/types';
import { QueryConfig } from '../QueryConfig';
import { AssetMinConfigBuilder } from './AssetMinBuilder.interfaces';

export function AssetMinBuilder() {
  return {
    assetRegistry,
    assets,
  };
}

function assetRegistry() {
  const pallet = 'assetRegistry';
  const transform = (response: any): bigint =>
    (response.minimalBalance as u128).toBigInt();

  return {
    assetMetadatas: (): AssetMinConfigBuilder => ({
      build: ({ asset }) =>
        new QueryConfig({
          pallet,
          func: 'assetMetadatas',
          args: [asset],
          transform,
        }),
    }),
    currencyMetadatas: (): AssetMinConfigBuilder => ({
      build: ({ asset }) =>
        new QueryConfig({
          pallet,
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
