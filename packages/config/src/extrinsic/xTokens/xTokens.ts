import { AssetSymbol } from '../../constants';
import { Asset, Chain, MoonChain } from '../../interfaces';
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
export function xTokens<Symbols extends AssetSymbol = AssetSymbol>(
  chain: MoonChain,
) {
  return {
    transfer: () => transfer<Symbols>(chain),
    transferMultiAsset: () => transferMultiAsset<Symbols>(chain),
    transferMultiCurrencies: () => transferMultiCurrencies<Symbols>(chain),
  };
}

function transfer<Symbols extends AssetSymbol = AssetSymbol>(chain: MoonChain) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      origin: (origin: Chain) => ({
        asset: (
          token: XTokensTransferExtrinsicParamsAsset<Symbols>,
        ): XTokensTransferExtrinsic<Symbols> => ({
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

function transferMultiAsset<Symbols extends AssetSymbol = AssetSymbol>(
  chain: MoonChain,
) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      origin: (origin: Chain) => ({
        asset: (
          asset: Asset<Symbols>,
        ): XTokensTransferMultiAssetExtrinsic<Symbols> => ({
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

function transferMultiCurrencies<Symbols extends AssetSymbol = AssetSymbol>(
  chain: MoonChain,
) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      origin: (origin: Chain) => ({
        assets: (
          asset: Asset<Symbols>,
          feeAsset: Asset<Symbols>,
        ): XTokensTransferMultiCurrenciesExtrinsic<Symbols> => ({
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
