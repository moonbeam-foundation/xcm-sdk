import { Asset } from '../../constants';
import {
  XTokensExtrinsic,
  XTokensExtrinsicSuccessEvent,
} from './xTokens.constants';

export type XTokensPallet<Assets extends Asset = Asset> =
  | XTokensTransferExtrinsic<Assets>
  | XTokensTransferMultiAssetExtrinsic<Assets>
  | XTokensTransferMultiCurrenciesExtrinsic<Assets>;

export type XTokensTransferExtrinsic<Assets extends Asset = Asset> =
  XTokensBaseExtrinsic<XTokensExtrinsic.Transfer, Assets>;
export type XTokensTransferMultiAssetExtrinsic<Assets extends Asset = Asset> =
  XTokensBaseExtrinsic<XTokensExtrinsic.TransferMultiAsset, Assets>;
export type XTokensTransferMultiCurrenciesExtrinsic<
  Assets extends Asset = Asset,
> = XTokensBaseExtrinsic<XTokensExtrinsic.TransferMultiCurrencies, Assets>;

export interface XTokensBaseExtrinsic<
  Extrinsic extends XTokensExtrinsic,
  Assets extends Asset = Asset,
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

export interface XTokensParamsByExtrinsic<Assets extends Asset = Asset> {
  [XTokensExtrinsic.Transfer]: XTokensTransferExtrinsicParams<Assets>;
  [XTokensExtrinsic.TransferMultiAsset]: XTokensTransferMultiAssetExtrinsicParams<Assets>;
  [XTokensExtrinsic.TransferMultiCurrencies]: XTokensTransferMultiCurrenciesExtrinsicParams<Assets>;
}

export type XTokensTransferExtrinsicParams<Assets extends Asset = Asset> = [
  /**
   * asset
   */
  XTokensTransferExtrinsicParamsAsset<Assets>,
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
  Assets extends Asset = Asset,
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
  Assets extends Asset = Asset,
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

export type XTokensTransferExtrinsicParamsAsset<Assets extends Asset = Asset> =
  | {
      Token: Assets | 'KUSD' | 'MOVR';
    }
  | {
      Native: Assets;
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
  | Assets
  | number
  | bigint
  | string;
