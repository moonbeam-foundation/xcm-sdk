import { ChainKey } from '../../constants';
import { AssetId, Chain, MoonChain } from '../../interfaces';
import {
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from './polkadotXcm.constants';
import { XcmMLVersion } from './polkadotXcm.interfaces';
import { getCreateExtrinsic } from './polkadotXcm.util';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function polkadotXcm<ChainKeys extends ChainKey>(chain: MoonChain) {
  return {
    limitedReserveTransferAssets: () =>
      limitedReserveTransferAssets<ChainKeys>(chain),
    limitedReserveWithdrawAssets: () =>
      limitedReserveWithdrawAssets<ChainKeys>(chain),
  };
}

function limitedReserveTransferAssets<ChainKeys extends ChainKey>(
  chain: MoonChain,
) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      origin: (origin: Chain<ChainKeys>) => {
        const createExtrinsic = getCreateExtrinsic(
          PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
          event,
          chain,
          origin,
        );

        return {
          V0: () =>
            createExtrinsic(
              (amount) => ({
                V0: [
                  {
                    ConcreteFungible: {
                      id: 'Null',
                      amount,
                    },
                  },
                ],
              }),
              XcmMLVersion.v0,
            ),
          V1: () => ({
            here: () =>
              createExtrinsic(
                (amount) => ({
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
                }),
                XcmMLVersion.v1,
              ),
            X1: () =>
              createExtrinsic(
                (amount) => ({
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
                }),
                XcmMLVersion.v1,
              ),
            X2: (palletInstance: number, assetId: AssetId) =>
              createExtrinsic(
                (amount) => ({
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
                                GeneralIndex: assetId,
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
                }),
                XcmMLVersion.v1,
              ),
          }),
          V2: () => ({
            here: () =>
              createExtrinsic(
                (amount) => ({
                  V2: [
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
                }),
                XcmMLVersion.v2,
              ),
            X1: () =>
              createExtrinsic(
                (amount) => ({
                  V2: [
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
                }),
                XcmMLVersion.v2,
              ),
            X2: (palletInstance: number, assetId: AssetId) =>
              createExtrinsic(
                (amount) => ({
                  V2: [
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
                                GeneralIndex: assetId,
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
                }),
                XcmMLVersion.v2,
              ),
          }),
        };
      },
    }),
  };
}

function limitedReserveWithdrawAssets<ChainKeys extends ChainKey>(
  chain: MoonChain,
) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      origin: (origin: Chain<ChainKeys>) => {
        const createExtrinsic = getCreateExtrinsic(
          PolkadotXcmExtrinsic.LimitedReserveWithdrawAssets,
          event,
          chain,
          origin,
        );

        return {
          V1: () => ({
            X2: (palletInstance: number) =>
              createExtrinsic(
                (amount) => ({
                  V1: [
                    {
                      id: {
                        Concrete: {
                          parents: 1,
                          interior: {
                            X2: [
                              {
                                Parachain: chain.parachainId,
                              },
                              {
                                PalletInstance: palletInstance,
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
                }),
                XcmMLVersion.v1,
              ),
          }),
        };
      },
    }),
  };
}
