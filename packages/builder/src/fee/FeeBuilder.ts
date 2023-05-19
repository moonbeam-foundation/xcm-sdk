/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { Option, u128 } from '@polkadot/types';
import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';
import { FeeConfigBuilder } from './FeeBuilder.interfaces';

export function FeeBuilder() {
  return {
    assetManager,
  };
}

function assetManager() {
  return {
    assetTypeUnitsPerSecond: (weight = 1_000_000_000): FeeConfigBuilder => ({
      build: ({ api, asset }) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const type = (await api.query.assetManager.assetIdType(
              asset,
            )) as unknown as Option<any>;

            if (type.isNone) {
              throw new Error(`No asset type found for asset ${asset}`);
            }

            const unwrappedType = type.unwrap();

            const res = (await api.query.assetManager.assetTypeUnitsPerSecond(
              unwrappedType,
            )) as unknown as Option<u128>;

            const unitsPerSecond = res.unwrapOrDefault().toBigInt();

            return (BigInt(weight) * unitsPerSecond) / BigInt(10 ** 12);
          },
        }),
    }),
  };
}
