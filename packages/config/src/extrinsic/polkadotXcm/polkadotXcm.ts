import { ChainConfig, MoonChainConfig } from '../../constants';
import {
  Pallet,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from '../extrinsic.constants';
import { PolkadotXcmAssetParam } from '../extrinsic.interfaces';
import { PolkadotXcmPallet } from './polkadotXcm.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function polkadotXcm(config: MoonChainConfig) {
  return {
    limitedReserveTransferAssets: () => limitedReserveTransferAssets(config),
    limitedReserveWithdrawAssets: () => limitedReserveWithdrawAssets(config),
  };
}

function limitedReserveTransferAssets(config: MoonChainConfig) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      params: (origin: ChainConfig) => ({
        V0: () =>
          createExtrinsic(event, config, origin, (amount) => ({
            V0: [
              {
                ConcreteFungible: {
                  id: 'Null',
                  amount,
                },
              },
            ],
          })),
        V1: () => ({
          here: () => ({}),
          X1: () => ({}),
          X2: () => ({}),
        }),
      }),
    }),
  };
}

function limitedReserveWithdrawAssets(config: MoonChainConfig) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      params: (): PolkadotXcmPallet => ({
        pallet: Pallet.PolkadotXcm,
        extrinsic: PolkadotXcmExtrinsic.LimitedReserveWithdrawAssets,
        successEvent: event,
        getParams: (account, amount) => [],
      }),
    }),
  };
}

function createExtrinsic(
  event: PolkadotXcmExtrinsicSuccessEvent,
  config: MoonChainConfig,
  origin: ChainConfig,
  getAsset: (amount: bigint) => PolkadotXcmAssetParam,
): PolkadotXcmPallet {
  return {
    pallet: Pallet.PolkadotXcm,
    extrinsic: PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
    successEvent: event,
    getParams: (account, amount) => [
      {
        V1: {
          parents: 1,
          interior: {
            X1: {
              Parachain: config.parachainId,
            },
          },
        },
      },
      {
        V1: {
          parents: 0,
          interior: {
            X1: {
              AccountKey20: {
                network: 'Any',
                key: account,
              },
            },
          },
        },
      },
      getAsset(amount),
      0,
      {
        Limited: origin.weight,
      },
    ],
  };
}
