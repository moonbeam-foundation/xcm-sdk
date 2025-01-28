import type { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import type { BuilderParams } from '../../../builder.interfaces';
import type { Parents } from '../../ExtrinsicBuilder.interfaces';
import {
  getExtrinsicAccount,
  getExtrinsicArgumentVersion,
  normalizeX1,
} from '../../ExtrinsicBuilder.utils';

export interface GetExtrinsicParams extends BuilderParams {
  // biome-ignore lint/suspicious/noExplicitAny: not sure how to fix this
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
}: GetExtrinsicParams) {
  const version = getExtrinsicArgumentVersion(func);

  return [
    {
      [version]: normalizeX1(version, {
        parents,
        interior: {
          X1: {
            Parachain: destination.parachainId,
          },
        },
      }),
    },
    {
      [version]: normalizeX1(version, {
        parents: 0,
        interior: {
          X1: getExtrinsicAccount(destinationAddress),
        },
      }),
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
}: BuilderParams): boolean {
  const assetIdNumber = Number(asset.getAssetId());
  const feeAssetIdNumber = Number(fee.getAssetId());

  if (Number.isNaN(assetIdNumber) || Number.isNaN(feeAssetIdNumber)) {
    return false;
  }

  return assetIdNumber > feeAssetIdNumber;
}
