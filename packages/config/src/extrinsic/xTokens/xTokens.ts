import { AssetSymbol, ChainKey } from '../../constants';
import { Asset, Chain, MoonChain } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import { getExtrinsicArgumentVersion } from '../extrinsic.utils';
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
import { getXTokensWeight } from './xTokens.util';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function xTokens<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>(chain: MoonChain) {
  return {
    transfer: () => transfer<Symbols, ChainKeys>(chain),
    transferMultiAsset: () => transferMultiAsset<Symbols, ChainKeys>(chain),
    transferMultiCurrencies: () =>
      transferMultiCurrencies<Symbols, ChainKeys>(chain),
  };
}

function transfer<Symbols extends AssetSymbol, ChainKeys extends ChainKey>(
  chain: MoonChain,
) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      origin: (origin: Chain<ChainKeys>) => ({
        asset: (
          token: XTokensTransferExtrinsicParamsAsset<Symbols>,
        ): XTokensTransferExtrinsic<Symbols> => ({
          pallet: ExtrinsicPallet.XTokens,
          extrinsic: XTokensExtrinsic.Transfer,
          successEvent: event,
          getParams: ({ account, amount, extrinsicCall }) => {
            const version = getExtrinsicArgumentVersion(extrinsicCall, 2);

            return [
              token,
              amount,
              {
                [version]: {
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
              getXTokensWeight(origin.weight, extrinsicCall),
            ];
          },
        }),
      }),
    }),
  };
}

function transferMultiAsset<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>(chain: MoonChain) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      origin: (origin: Chain<ChainKeys>) => ({
        asset: (
          asset: Asset<Symbols>,
        ): XTokensTransferMultiAssetExtrinsic<Symbols> => ({
          pallet: ExtrinsicPallet.XTokens,
          extrinsic: XTokensExtrinsic.TransferMultiAsset,
          successEvent: event,
          getParams: ({ account, amount, extrinsicCall }) => [
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
            getXTokensWeight(origin.weight, extrinsicCall),
          ],
        }),
      }),
    }),
  };
}

function transferMultiCurrencies<
  Symbols extends AssetSymbol,
  ChainKeys extends ChainKey,
>(chain: MoonChain) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      origin: (origin: Chain<ChainKeys>) => ({
        assets: (
          asset: XTokensTransferExtrinsicParamsAsset<Symbols>,
          feeAsset: XTokensTransferExtrinsicParamsAsset<Symbols>,
        ): XTokensTransferMultiCurrenciesExtrinsic<Symbols> => ({
          pallet: ExtrinsicPallet.XTokens,
          extrinsic: XTokensExtrinsic.TransferMultiCurrencies,
          successEvent: event,
          getParams: ({ account, amount, extrinsicCall, fee = 0n }) => [
            [
              [asset, amount],
              [feeAsset, fee],
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
            getXTokensWeight(origin.weight, extrinsicCall),
          ],
        }),
      }),
    }),
  };
}
