import { AssetConfig, ChainConfig, MoonChainConfig } from '../../constants';
import { XcmPallet } from '../extrinsic.constants';
import {
  XTokensExtrinsic,
  XTokensExtrinsicSuccessEvent,
} from './xTokens.constants';
import {
  XTokensTransferExtrinsic,
  XTokensTransferMultiAssetExtrinsic,
  XTokensTransferMultiCurrenciesExtrinsic,
  XTokenTransferExtrinsicParamsToken,
} from './xTokens.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function xTokens<Assets>(config: MoonChainConfig) {
  return {
    transfer: () => transfer<Assets>(config),
    transferMultiAsset: () => transferMultiAsset<Assets>(config),
    transferMultiCurrencies: () => transferMultiCurrencies<Assets>(config),
  };
}

function transfer<Assets>(config: MoonChainConfig) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      params: (
        origin: ChainConfig,
        token: XTokenTransferExtrinsicParamsToken<Assets>,
      ): XTokensTransferExtrinsic<Assets> => ({
        pallet: XcmPallet.XTokens,
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
                    Parachain: config.parachainId,
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
  };
}

function transferMultiAsset<Assets>(config: MoonChainConfig) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      params: (
        origin: ChainConfig,
        asset: AssetConfig<Assets>,
      ): XTokensTransferMultiAssetExtrinsic<Assets> => ({
        pallet: XcmPallet.XTokens,
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
                    Parachain: config.parachainId,
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
  };
}

function transferMultiCurrencies<Assets>(config: MoonChainConfig) {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      params: (
        origin: ChainConfig,
        asset: AssetConfig<Assets>,
        feeAsset: AssetConfig<Assets>,
      ): XTokensTransferMultiCurrenciesExtrinsic<Assets> => ({
        pallet: XcmPallet.XTokens,
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
                    Parachain: config.parachainId,
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
  };
}
