/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { Option, u128 } from '@polkadot/types';
import { QueryConfig } from '../QueryConfig';
import { FeeConfigBuilder } from './FeeBuilder.interfaces';

export function FeeBuilder() {
  return {
    assetManager,
  };
}

function assetManager() {
  return {
    assetTypeUnitsPerSecond: (weight = 1_000_000_000): FeeConfigBuilder => ({
      build: ({ polkadot, asset }) =>
        new QueryConfig({
          module: 'assetManager',
          func: 'assetTypeUnitsPerSecond',
          transform: async (): Promise<bigint> => {
            const type = (await polkadot.query.assetManager.assetIdType(
              asset,
            )) as unknown as Option<any>;

            if (type.isNone) {
              throw new Error(`No asset type found for asset ${asset}`);
            }

            const unwrappedType = type.unwrap();

            const res =
              (await polkadot.query.assetManager.assetTypeUnitsPerSecond(
                unwrappedType,
              )) as unknown as Option<u128>;

            const unitsPerSecond = res.unwrapOrDefault().toBigInt();

            return (BigInt(weight) * unitsPerSecond) / BigInt(10 ** 12);
          },
        }),
    }),
  };
}
