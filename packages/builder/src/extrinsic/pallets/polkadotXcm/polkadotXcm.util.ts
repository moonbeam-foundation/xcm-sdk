import type { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import type { BuilderParams } from '../../../builder.interfaces';
import type { Parents } from '../../ExtrinsicBuilder.interfaces';
import {
  getExtrinsicAccount,
  getExtrinsicArgumentVersion,
  normalizeX1,
} from '../../ExtrinsicBuilder.utils';

export interface GetExtrinsicParams extends Omit<BuilderParams, 'asset'> {
  assets: object[];
  func?: SubmittableExtrinsicFunction<'promise'>;
  parents?: Parents;
  feeIndex?: number;
}

export function getPolkadotXcmExtrinsicArgs({
  assets,
  destinationAddress,
  destination,
  func,
  parents = 1,
  feeIndex = 0,
}: GetExtrinsicParams) {
  const version = getExtrinsicArgumentVersion(func);

  return [
    // dest
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
    // beneficiary
    {
      [version]: normalizeX1(version, {
        parents: 0,
        interior: {
          X1: getExtrinsicAccount(destinationAddress),
        },
      }),
    },
    // assets
    {
      [version]: assets,
    },
    // feeAssetItem
    feeIndex,
    // weightLimit
    'Unlimited',
  ];
}

export function getEcosystemTransferExtrinsicArgs({
  assets,
  destinationAddress,
  destination,
  func,
  feeIndex = 0,
}: GetExtrinsicParams) {
  const version = getExtrinsicArgumentVersion(func);

  return [
    // dest
    {
      [version]: normalizeX1(version, {
        parents: 2,
        interior: {
          X2: [
            {
              GlobalConsensus: {
                ByGenesis: destination.relayGenesisHash,
              },
            },
            {
              Parachain: destination.parachainId,
            },
          ],
        },
      }),
    },
    // beneficiary
    {
      [version]: normalizeX1(version, {
        parents: 0,
        interior: {
          X1: getExtrinsicAccount(destinationAddress),
        },
      }),
    },
    // assets
    {
      [version]: assets,
    },
    // feeAssetItem
    feeIndex,
    // weightLimit
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
