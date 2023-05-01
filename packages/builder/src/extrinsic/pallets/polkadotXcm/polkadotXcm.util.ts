/* eslint-disable sort-keys */
import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { getTypeDef } from '@polkadot/types/create';
import {
  ExtrinsicConfigBuilderPrams,
  Parents,
  XcmMultiLocationVersion,
} from '../../ExtrinsicBuilder.interfaces';

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
  const version = getAvailableVersion(func);

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
          X1: {
            AccountKey20: {
              network: 'Any',
              key: address,
            },
          },
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

function getAvailableVersion(
  func?: SubmittableExtrinsicFunction<'promise'>,
): XcmMultiLocationVersion {
  if (!func) {
    return XcmMultiLocationVersion.v1;
  }

  const { type } = func.meta.args[0];
  const instance = func.meta.registry.createType(type.toString());
  const raw = getTypeDef(instance?.toRawType());

  if (
    Array.isArray(raw.sub) &&
    raw.sub.find((x) => x.name === XcmMultiLocationVersion.v2)
  )
    return XcmMultiLocationVersion.v2;

  return XcmMultiLocationVersion.v1;
}
