import { Asset } from '../../constants';
import {
  XTokensExtrinsic,
  XTokensExtrinsicSuccessEvent,
} from './xTokens.constants';

export type XTokensPallet<Assets extends Asset> =
  | XTokensTransferExtrinsic<Assets>
  | XTokensTransferMultiAssetExtrinsic<Assets>
  | XTokensTransferMultiCurrenciesExtrinsic<Assets>;

export type XTokensTransferExtrinsic<Assets extends Asset> =
  XTokensBaseExtrinsic<Assets, XTokensExtrinsic.Transfer>;
export type XTokensTransferMultiAssetExtrinsic<Assets extends Asset> =
  XTokensBaseExtrinsic<Assets, XTokensExtrinsic.TransferMultiAsset>;
export type XTokensTransferMultiCurrenciesExtrinsic<Assets extends Asset> =
  XTokensBaseExtrinsic<Assets, XTokensExtrinsic.TransferMultiCurrencies>;

export interface XTokensBaseExtrinsic<
  Assets extends Asset,
  Extrinsic extends XTokensExtrinsic,
> {
  pallet: 'xTokens';
  extrinsic: Extrinsic;
  successEvent: XTokensExtrinsicSuccessEvent;
  getParams: (
    account: string,
    amount: bigint,
    fee?: bigint,
  ) => XTokensParamsByExtrinsic<Assets>[Extrinsic];
}

export interface XTokensParamsByExtrinsic<Assets extends Asset> {
  [XTokensExtrinsic.Transfer]: XTokenTransferExtrinsicParams<Assets>;
  [XTokensExtrinsic.TransferMultiAsset]: XTokensTransferMultiAssetExtrinsicParams<Assets>;
  [XTokensExtrinsic.TransferMultiCurrencies]: XTokensTransferMultiCurrenciesExtrinsicParams<Assets>;
}

export type XTokenTransferExtrinsicParams<Assets extends Asset> = [
  /**
   * asset
   */
  (
    | {
        Token: Assets | 'KUSD' | 'MOVR';
      }
    | {
        Native: Assets;
      }
    | {
        ForeignAsset: number;
      }
    | {
        MantaCurrency: number;
      }
    | Assets
    | number
    | string
  ),
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

export type XTokenTransferExtrinsicParamsToken<Assets extends Asset> =
  | {
      Token: Assets | 'KUSD' | 'MOVR';
    }
  | {
      Native: Assets;
    }
  | {
      ForeignAsset: number;
    }
  | {
      MantaCurrency: number;
    }
  | Assets
  | number
  | string;

export type XTokensTransferMultiAssetExtrinsicParams<Assets extends Asset> = [
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
                GeneralKey: Assets;
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
  Assets extends Asset,
> = [
  [
    [
      {
        Token: Assets;
      },
      /**
       * amount
       */
      bigint,
    ],
    [
      {
        Token: Assets;
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
