/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { u128 } from '@polkadot/types';
import { AssetMinConfig } from './AssetMinConfig';
import {
  AssetMinConfigBuilder,
  AssetMinConfigBuilderPrams,
} from './AssetMinConfigBuilder.interfaces';

export function AssetMinBuilder() {
  return {
    assets,
    assetRegistry,
  };
}

function assets() {
  return {
    asset: (): AssetMinConfigBuilder => ({
      build: ({ asset }: AssetMinConfigBuilderPrams): AssetMinConfig =>
        new AssetMinConfig({
          pallet: 'assets',
          method: 'asset',
          args: [asset],
          transform: (response: any): bigint =>
            (response.minBalance as u128).toBigInt(),
        }),
    }),
  };
}

function assetRegistry() {
  return {
    assetMetadatas: (): AssetMinConfigBuilder => ({
      build: ({ asset }: AssetMinConfigBuilderPrams): AssetMinConfig =>
        new AssetMinConfig({
          pallet: 'assetRegistry',
          method: 'assetMetadatas',
          args: [{ ForeignAssetId: asset }],
          transform: (response: any): bigint =>
            (response.minimalBalance as u128).toBigInt(),
        }),
    }),
    currencyMetadatas: (): AssetMinConfigBuilder => ({
      build: ({ asset }: AssetMinConfigBuilderPrams): AssetMinConfig =>
        new AssetMinConfig({
          pallet: 'assetRegistry',
          method: 'currencyMetadatas',
          args: [{ Token2: asset }],
          transform: (response: any): bigint =>
            (response.minimalBalance as u128).toBigInt(),
        }),
    }),
  };
}
