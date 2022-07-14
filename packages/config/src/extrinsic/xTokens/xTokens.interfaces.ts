import {
  XTokensExtrinsic,
  XTokensExtrinsicSuccessEvent,
} from './xTokens.constants';

export type XTokensPallet<Assets> =
  | XTokensTransferExtrinsic<Assets>
  | XTokensTransferMultiAssetExtrinsic<Assets>
  | XTokensTransferMultiCurrenciesExtrinsic<Assets>;

export type XTokensTransferExtrinsic<Assets> = XTokensBaseExtrinsic<
  Assets,
  XTokensExtrinsic.Transfer
>;
export type XTokensTransferMultiAssetExtrinsic<Assets> = XTokensBaseExtrinsic<
  Assets,
  XTokensExtrinsic.TransferMultiAsset
>;
export type XTokensTransferMultiCurrenciesExtrinsic<Assets> =
  XTokensBaseExtrinsic<Assets, XTokensExtrinsic.TransferMultiCurrencies>;

export interface XTokensBaseExtrinsic<
  Assets,
  Extrinsic extends XTokensExtrinsic,
> {
  pallet: 'xTokens';
  extrinsic: Extrinsic;
  successEvent: XTokensExtrinsicSuccessEvent;
  getParams: (
    account: string,
    amount: bigint,
  ) => XTokensParamsByExtrinsic<Assets>[Extrinsic];
}

export interface XTokensParamsByExtrinsic<Assets> {
  [XTokensExtrinsic.Transfer]: XTokenTransferExtrinsicParams<Assets>;
  [XTokensExtrinsic.TransferMultiAsset]: XTokensTransferMultiAssetExtrinsicParams<Assets>;
  [XTokensExtrinsic.TransferMultiCurrencies]: XTokensTransferMultiCurrenciesExtrinsicParams<Assets>;
}

export interface XTokensTransferOptions<Assets> {
  token: XTokenTransferExtrinsicParamsToken<Assets>;
  weight: number;
  parachainId: number;
}

export type XTokenTransferExtrinsicParams<Assets> = [
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

export type XTokenTransferExtrinsicParamsToken<Assets> =
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

export type XTokensTransferMultiAssetExtrinsicParams<Assets> = [
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

export type XTokensTransferMultiCurrenciesExtrinsicParams<Assets> = [
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
