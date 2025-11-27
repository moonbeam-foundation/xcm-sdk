import type { EvmChain } from '@moonbeam-network/xcm-types';
import type { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { getExtrinsicArgumentVersion } from '../../../../../extrinsic/ExtrinsicBuilder.utils';

interface GetGlobalConsensusArgsParams {
  assets: object[];
  destination: EvmChain;
  destinationAddress: string;
  func?: SubmittableExtrinsicFunction<'promise'>;
}

export function getGlobalConsensusArgs({
  assets,
  destination,
  destinationAddress,
  func,
}: GetGlobalConsensusArgsParams) {
  const version = getExtrinsicArgumentVersion(func);

  const dest = {
    [version]: {
      parents: 1,
      interior: {
        X1: [
          {
            GlobalConsensus: {
              Ethereum: { chainId: destination.id },
            },
          },
        ],
      },
    },
  };

  const beneficiary = {
    [version]: {
      parents: 0,
      interior: {
        X1: [
          {
            AccountKey20: {
              network: { Ethereum: { chainId: destination.id } },
              key: destinationAddress,
            },
          },
        ],
      },
    },
  };

  const assetsArg = {
    [version]: assets,
  };

  return [
    dest,
    beneficiary,
    assetsArg,
    0, // feeAssetItem
    'Unlimited',
  ];
}
