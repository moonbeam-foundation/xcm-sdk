import { AssetSymbol } from '../../constants';
import {
  XTokensExtrinsic,
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

export interface XTokensBaseExtrinsic<
  Extrinsic extends XTokensExtrinsic,
  Symbols extends AssetSymbol = AssetSymbol,
> {
  pallet: 'xTokens';
  extrinsic: Extrinsic;
  successEvent: XTokensExtrinsicSuccessEvent;
  getParams: (
    account: string,
    amount: bigint,
    fee?: bigint,
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
  number,
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
  number,
];

export type XTokensTransferMultiCurrenciesExtrinsicParams<
  Symbols extends AssetSymbol = AssetSymbol,
> = [
  [
    [
      {
        Token: Symbols;
      },
      /**
       * amount
       */
      bigint,
    ],
    [
      {
        Token: Symbols;
      },
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
  number,
];

export type XTokensTransferExtrinsicParamsAsset<
  Symbols extends AssetSymbol = AssetSymbol,
> =
  | {
      Token: Symbols | 'KUSD' | 'MOVR';
    }
  | {
      Native: Symbols;
    }
  | {
      ForeignAsset: number | bigint;
    }
  | {
      MantaCurrency: number | bigint;
    }
  | {
      OtherReserve: number | bigint;
    }
  | Symbols
  | number
  | bigint
  | string;
