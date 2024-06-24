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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asset: any;
  func?: SubmittableExtrinsicFunction<'promise'>;
  parents?: Parents;
  feeIndex?: number;
}

export function getPolkadotXcmExtrinsicArgs({
  asset,
  address,
  destination,
  func,
  parents = 1,
  feeIndex = 0,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    feeIndex,
    'Unlimited',
  ];
}

export function shouldFeeAssetPrecedeAsset({
  asset,
  feeAsset,
}: ExtrinsicConfigBuilderPrams): boolean {
  const assetIdNumber = Number(asset);
  const feeAssetIdNumber = Number(feeAsset);

  if (Number.isNaN(assetIdNumber) || Number.isNaN(feeAssetIdNumber)) {
    return false;
  }

  return assetIdNumber > feeAssetIdNumber;
}
