import { Asset } from '../../constants';
import { AssetConfig, ChainConfig, MoonChainConfig } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  XTokensExtrinsic,
  XTokensExtrinsicSuccessEvent,
} from './xTokens.constants';
import {
  XTokensTransferExtrinsic,
  XTokensTransferExtrinsicParamsAsset,
  XTokensTransferMultiAssetExtrinsic,
  XTokensTransferMultiCurrenciesExtrinsic,
} from './xTokens.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function xTokens<Assets extends Asset>(chain: MoonChainConfig) {
  return {
    transfer: () => transfer<Assets>(chain),
    transferMultiAsset: () => transferMultiAsset<Assets>(chain),
    transferMultiCurrencies: () => transferMultiCurrencies<Assets>(chain),
  };
}

function transfer<Assets extends Asset>(chain: MoonChainConfig) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      origin: (origin: ChainConfig) => ({
        asset: (
          token: XTokensTransferExtrinsicParamsAsset<Assets>,
        ): XTokensTransferExtrinsic<Assets> => ({
          pallet: ExtrinsicPallet.XTokens,
          extrinsic: XTokensExtrinsic.Transfer,
          successEvent: event,
          getParams: (account, amount) => [
            token,
            amount,
            {
              V1: {
                parents: 1,
                interior: {
                  X2: [
                    {
                      Parachain: chain.parachainId,
                    },
                    {
                      AccountKey20: {
                        network: 'Any',
                        key: account,
                      },
                    },
                  ],
                },
              },
            },
            origin.weight,
          ],
        }),
      }),
    }),
  };
}

function transferMultiAsset<Assets extends Asset>(chain: MoonChainConfig) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      origin: (origin: ChainConfig) => ({
        asset: (
          asset: AssetConfig<Assets>,
        ): XTokensTransferMultiAssetExtrinsic<Assets> => ({
          pallet: ExtrinsicPallet.XTokens,
          extrinsic: XTokensExtrinsic.TransferMultiAsset,
          successEvent: event,
          getParams: (account, amount) => [
            {
              V1: {
                id: {
                  Concrete: {
                    parents: 1,
                    interior: {
                      X2: [
                        {
                          Parachain: origin.parachainId,
                        },
                        {
                          GeneralKey: asset.originSymbol,
                        },
                      ],
                    },
                  },
                },
                fun: {
                  Fungible: amount,
                },
              },
            },
            {
              V1: {
                parents: 1,
                interior: {
                  X2: [
                    {
                      Parachain: chain.parachainId,
                    },
                    {
                      AccountKey20: {
                        network: 'Any',
                        key: account,
                      },
                    },
                  ],
                },
              },
            },
            origin.weight,
          ],
        }),
      }),
    }),
  };
}

function transferMultiCurrencies<Assets extends Asset>(chain: MoonChainConfig) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      origin: (origin: ChainConfig) => ({
        assets: (
          asset: AssetConfig<Assets>,
          feeAsset: AssetConfig<Assets>,
        ): XTokensTransferMultiCurrenciesExtrinsic<Assets> => ({
          pallet: ExtrinsicPallet.XTokens,
          extrinsic: XTokensExtrinsic.TransferMultiCurrencies,
          successEvent: event,
          getParams: (account, amount, fee = 0n) => [
            [
              [
                {
                  Token: asset.originSymbol,
                },
                amount,
              ],
              [
                {
                  Token: feeAsset.originSymbol,
                },
                fee,
              ],
            ],
            1,
            {
              V1: {
                parents: 1,
                interior: {
                  X2: [
                    {
                      Parachain: chain.parachainId,
                    },
                    {
                      AccountKey20: {
                        network: 'Any',
                        key: account,
                      },
                    },
                  ],
                },
              },
            },
            origin.weight,
          ],
        }),
      }),
    }),
  };
}
