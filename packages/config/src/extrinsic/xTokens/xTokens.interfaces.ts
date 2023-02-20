import { AssetSymbol } from '../../constants';
import { AssetId } from '../../interfaces';
import { XcmExtrinsicGetParams } from '../common.interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  XTokensExtrinsic,
  XTokensExtrinsicCurrencyTypes,
  XTokensExtrinsicSuccessEvent,
} from './xTokens.constants';

export type XTokensPallet<Symbols extends AssetSymbol = AssetSymbol> =
  | XTokensTransferExtrinsic<Symbols>
  | XTokensTransferMultiAssetExtrinsic<Symbols>
  | XTokensTransferMultiCurrenciesExtrinsic<Symbols>;

export type XTokensTransferExtrinsic<
  Symbols extends AssetSymbol = AssetSymbol,
> = XTokensBaseExtrinsic<XTokensExtrinsic.Transfer, Symbols>;
export type XTokensTransferMultiAssetExtrinsic<
  Symbols extends AssetSymbol = AssetSymbol,
> = XTokensBaseExtrinsic<XTokensExtrinsic.TransferMultiAsset, Symbols>;
export type XTokensTransferMultiCurrenciesExtrinsic<
  Symbols extends AssetSymbol = AssetSymbol,
> = XTokensBaseExtrinsic<XTokensExtrinsic.TransferMultiCurrencies, Symbols>;

export type XTokensWeightLimit = number | { Limited: number };

export interface XTokensBaseExtrinsic<
  Extrinsic extends XTokensExtrinsic,
  Symbols extends AssetSymbol = AssetSymbol,
> {
  pallet: ExtrinsicPallet.XTokens;
  extrinsic: Extrinsic;
  successEvent: XTokensExtrinsicSuccessEvent;
  getParams: (
    params: XcmExtrinsicGetParams,
  ) => XTokensParamsByExtrinsic<Symbols>[Extrinsic];
}

export interface XTokensParamsByExtrinsic<
  Symbols extends AssetSymbol = AssetSymbol,
> {
  [XTokensExtrinsic.Transfer]: XTokensTransferExtrinsicParams<Symbols>;
  [XTokensExtrinsic.TransferMultiAsset]: XTokensTransferMultiAssetExtrinsicParams<Symbols>;
  [XTokensExtrinsic.TransferMultiCurrencies]: XTokensTransferMultiCurrenciesExtrinsicParams<Symbols>;
}

export type XTokensTransferExtrinsicParams<
  Symbols extends AssetSymbol = AssetSymbol,
> = [
  /**
   * asset
   */
  XTokensTransferExtrinsicParamsAsset<Symbols>,
  /**
   * amount
   */
  bigint,
  /**
   * destination
   */
  {
    V1: {
      parents: 1;
      interior: {
        X2: [
          {
            Parachain: number;
          },
          {
            AccountKey20: {
              network: 'Any';
              /**
               * account
               */
              key: string;
            };
          },
        ];
      };
    };
  },
  /**
   * weight
   */
  XTokensWeightLimit,
];

export type XTokensTransferMultiAssetExtrinsicParams<
  Symbols extends AssetSymbol = AssetSymbol,
> = [
  /**
   * asset
   */
  {
    V1: {
      id: {
        Concrete: {
          parents: 1;
          interior: {
            X2: [
              {
                Parachain: number;
              },
              {
                GeneralKey: Symbols;
              },
            ];
          };
        };
      };
      fun: {
        /**
         * amount
         */
        Fungible: bigint;
      };
    };
  },
  /**
   * destination
   */
  {
    V1: {
      parents: 1;
      interior: {
        X2: [
          {
            Parachain: number;
          },
          {
            AccountKey20: {
              network: 'Any';
              key: string;
            };
          },
        ];
      };
    };
  },
  /**
   * weight
   */
  XTokensWeightLimit,
];

export type XTokensTransferMultiCurrenciesExtrinsicParams<
  Symbols extends AssetSymbol = AssetSymbol,
> = [
  [
    [
      XTokensTransferExtrinsicParamsAsset<Symbols>,
      /**
       * amount
       */
      bigint,
    ],
    [
      XTokensTransferExtrinsicParamsAsset<Symbols>,
      /**
       * fee
       */
      bigint,
    ],
  ],
  /**
   * fee item
   */
  1,
  {
    V1: {
      parents: 1;
      interior: {
        X2: [
          {
            Parachain: number;
          },
          {
            AccountKey20: {
              network: 'Any';
              /**
               * account
               */
              key: string;
            };
          },
        ];
      };
    };
  },
  /**
   * weight
   */
  XTokensWeightLimit,
];

export type XTokensTransferExtrinsicParamsAsset<
  Symbols extends AssetSymbol = AssetSymbol,
> =
  | {
      [XTokensExtrinsicCurrencyTypes.Token]: Symbols | AssetSymbol.KUSD;
    }
  | {
      [XTokensExtrinsicCurrencyTypes.Token2]: AssetId;
    }
  | {
      [XTokensExtrinsicCurrencyTypes.Native]: Symbols;
    }
  | {
      [XTokensExtrinsicCurrencyTypes.NativeAssetId]: 'Here';
    }
  | {
      [XTokensExtrinsicCurrencyTypes.NativeToken]: AssetId;
    }
  | {
      [XTokensExtrinsicCurrencyTypes.MiningResource]: AssetId;
    }
  | {
      [XTokensExtrinsicCurrencyTypes.ForeignAsset]: AssetId;
    }
  | {
      [XTokensExtrinsicCurrencyTypes.FungibleToken]: AssetId;
    }
  | {
      [XTokensExtrinsicCurrencyTypes.MantaCurrency]: AssetId;
    }
  | {
      [XTokensExtrinsicCurrencyTypes.OtherReserve]: AssetId;
    }
  | Symbols
  | AssetId
  | 'SelfReserve';
