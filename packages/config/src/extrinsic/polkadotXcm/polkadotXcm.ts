import { ChainKey } from '../../constants';
import { AssetId, Chain, MoonChain } from '../../interfaces';
import {
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from './polkadotXcm.constants';
import { getCreateV1V2Extrinsic } from './polkadotXcm.util';

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
        const createExtrinsic = getCreateV1V2Extrinsic(
          PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
          event,
          chain,
          origin,
        );

        return {
          V1V2: () => ({
            here: () =>
              createExtrinsic((amount) => [
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
              ]),
            X1: () =>
              createExtrinsic((amount) => [
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
              ]),
            X2: (palletInstance: number, assetId: AssetId) =>
              createExtrinsic((amount) => [
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
              ]),
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
        const createExtrinsic = getCreateV1V2Extrinsic(
          PolkadotXcmExtrinsic.LimitedReserveWithdrawAssets,
          event,
          chain,
          origin,
        );

        return {
          V1V2: () => ({
            X2: (palletInstance: number) =>
              createExtrinsic((amount) => [
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
              ]),
          }),
        };
      },
    }),
  };
}
