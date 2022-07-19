import { AssetConfig, ChainConfig, MoonChainConfig } from '../../constants';
import {
  Pallet,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from '../extrinsic.constants';
import { PolkadotXcmAssetParam } from '../extrinsic.interfaces';
import { PolkadotXcmPallet } from './polkadotXcm.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function polkadotXcm<Assets>(config: MoonChainConfig) {
  return {
    limitedReserveTransferAssets: () =>
      limitedReserveTransferAssets<Assets>(config),
    limitedReserveWithdrawAssets: () => limitedReserveWithdrawAssets(config),
  };
}

function limitedReserveTransferAssets<Assets>(config: MoonChainConfig) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      params: (origin: ChainConfig) => {
        const createExtrinsic = getCreateExtrinsic(
          PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
          event,
          config,
          origin,
        );

        return {
          V0: () =>
            createExtrinsic((amount) => ({
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
            here: () =>
              createExtrinsic((amount) => ({
                V1: [
                  {
                    id: {
                      Concrete: {
                        parents: 0,
                        interior: 'Here',
                      },
                    },
                    fun: {
                      Fungible: amount,
                    },
                  },
                ],
              })),
            X1: () =>
              createExtrinsic((amount) => ({
                V1: [
                  {
                    id: {
                      Concrete: {
                        parents: 0,
                        interior: {
                          X1: {
                            PalletInstance: 5,
                          },
                        },
                      },
                    },
                    fun: {
                      Fungible: amount,
                    },
                  },
                ],
              })),
            X2: (palletInstance: number, asset: AssetConfig<Assets>) =>
              createExtrinsic((amount) => ({
                V1: [
                  {
                    id: {
                      Concrete: {
                        parents: 0,
                        interior: {
                          X2: [
                            {
                              PalletInstance: palletInstance,
                            },
                            {
                              // TODO: throw an error if id is not defined or fix types
                              GeneralIndex: asset.originAssetId || 0,
                            },
                          ],
                        },
                      },
                    },
                    fun: {
                      Fungible: amount,
                    },
                  },
                ],
              })),
          }),
        };
      },
    }),
  };
}

function limitedReserveWithdrawAssets(config: MoonChainConfig) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      params: (origin: ChainConfig) => {
        const createExtrinsic = getCreateExtrinsic(
          PolkadotXcmExtrinsic.LimitedReserveWithdrawAssets,
          event,
          config,
          origin,
        );

        return {
          V1: () => ({
            X2: (palletInstance: number) =>
              createExtrinsic((amount) => ({
                V1: [
                  {
                    id: {
                      Concrete: {
                        parents: 1,
                        interior: {
                          X2: [
                            {
                              PalletInstance: palletInstance,
                            },
                            {
                              Parachain: config.parachainId,
                            },
                          ],
                        },
                      },
                    },
                    fun: {
                      Fungible: amount,
                    },
                  },
                ],
              })),
          }),
        };
      },
    }),
  };
}

function getCreateExtrinsic(
  extrinsic: PolkadotXcmExtrinsic,
  event: PolkadotXcmExtrinsicSuccessEvent,
  config: MoonChainConfig,
  origin: ChainConfig,
) {
  return (
    getAsset: (amount: bigint) => PolkadotXcmAssetParam,
  ): PolkadotXcmPallet => ({
    pallet: Pallet.PolkadotXcm,
    extrinsic,
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
  });
}
