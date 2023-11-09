/* eslint-disable sort-keys */
import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import {
  ExtrinsicConfigBuilderPrams,
  Parents,
} from '../../ExtrinsicBuilder.interfaces';
import {
  getExtrinsicAccount,
  getExtrinsicArgumentVersion,
} from '../../ExtrinsicBuilder.utils';

export interface GetExtrinsicParams extends ExtrinsicConfigBuilderPrams {
  asset: any;
  func?: SubmittableExtrinsicFunction<'promise'>;
  parents?: Parents;
}

export function getPolkadotXcmExtrinsicArgs({
  asset,
  address,
  destination,
  func,
  parents = 1,
}: GetExtrinsicParams): any[] {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const version = getExtrinsicArgumentVersion(func);

  return [
    {
      [version]: {
        parents,
        interior: {
          X1: {
            Parachain: destination.parachainId,
          },
        },
      },
    },
    {
      [version]: {
        parents: 0,
        interior: {
          X1: getExtrinsicAccount(address),
        },
      },
    },
    {
      [version]: asset,
    },
    0,
    'Unlimited',
  ];
}
