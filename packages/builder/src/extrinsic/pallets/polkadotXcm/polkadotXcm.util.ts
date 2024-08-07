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
  destinationAddress,
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
          X1: getExtrinsicAccount(destinationAddress),
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
  fee,
}: ExtrinsicConfigBuilderPrams): boolean {
  const assetIdNumber = Number(asset.getAssetId());
  const feeAssetIdNumber = Number(fee.getAssetId());

  if (Number.isNaN(assetIdNumber) || Number.isNaN(feeAssetIdNumber)) {
    return false;
  }

  return assetIdNumber > feeAssetIdNumber;
}
