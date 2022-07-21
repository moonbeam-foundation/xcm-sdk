import { AssetConfig, ChainConfig, MoonChainConfig } from '../../interfaces';
import {
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from './polkadotXcm.constants';
import { getCreateExtrinsic } from './polkadotXcm.util';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function polkadotXcm<Assets>(chain: MoonChainConfig) {
  return {
    limitedReserveTransferAssets: () =>
      limitedReserveTransferAssets<Assets>(chain),
    limitedReserveWithdrawAssets: () => limitedReserveWithdrawAssets(chain),
  };
}

function limitedReserveTransferAssets<Assets>(chain: MoonChainConfig) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      origin: (origin: ChainConfig) => {
        const createExtrinsic = getCreateExtrinsic(
          PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
          event,
          chain,
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

function limitedReserveWithdrawAssets(chain: MoonChainConfig) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      origin: (origin: ChainConfig) => {
        const createExtrinsic = getCreateExtrinsic(
          PolkadotXcmExtrinsic.LimitedReserveWithdrawAssets,
          event,
          chain,
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
                              Parachain: chain.parachainId,
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
