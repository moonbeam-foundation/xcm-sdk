export type XTokensPallet<Assets extends string> =
  | XTokensBaseExtrinsic<Assets, XTokenExtrinsic.transfer>
  | XTokensBaseExtrinsic<Assets, XTokenExtrinsic.transferMultiAsset>
  | XTokensBaseExtrinsic<Assets, XTokenExtrinsic.transferMultiCurrencies>;

export interface XTokensBaseExtrinsic<
  Assets extends string,
  Extrinsic extends XTokenExtrinsic,
> {
  pallet: 'xTokens';
  extrinsic: Extrinsic;
  params: XTokensParamsByExtrinsic<Assets>[Extrinsic];
  successEvent: XTokensSuccessEventByExtrinsic[Extrinsic];
}

export enum XTokenExtrinsic {
  transfer = 'transfer',
  transferMultiAsset = 'transferMultiasset',
  transferMultiCurrencies = 'transferMulticurrencies',
}

export enum XTokenExtrinsicSuccessEvent {
  transferred = 'Transferred',
  transferredMultiAssets = 'TransferredMultiAssets',
  transferredMultiCurrencies = 'TransferredMultiCurrencies',
}

export type XTokensParamsByExtrinsic<Assets extends string> = {
  [XTokenExtrinsic.transfer]: XTokenTransferExtrinsicParams<Assets>;
  [XTokenExtrinsic.transferMultiAsset]: XTokensTransferMultiAssetExtrinsicParams<Assets>;
  [XTokenExtrinsic.transferMultiCurrencies]: XTokensTransferMultiCurrenciesExtrinsicParams<Assets>;
};

export type XTokensSuccessEventByExtrinsic = {
  [XTokenExtrinsic.transfer]:
    | XTokenExtrinsicSuccessEvent.transferred
    | XTokenExtrinsicSuccessEvent.transferredMultiAssets;
  [XTokenExtrinsic.transferMultiAsset]: XTokenExtrinsicSuccessEvent.transferredMultiAssets;
  [XTokenExtrinsic.transferMultiCurrencies]:
    | XTokenExtrinsicSuccessEvent.transferredMultiAssets
    | XTokenExtrinsicSuccessEvent.transferredMultiCurrencies;
};

export type XTokenTransferExtrinsicParams<Assets extends string> = [
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
  '%plankAmount%',
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
  '%weight%',
];

export type XTokensTransferMultiAssetExtrinsicParams<Assets extends string> = [
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
        Fungible: '%plankAmount%';
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
  '%weight%',
];

export type XTokensTransferMultiCurrenciesExtrinsicParams<
  Assets extends string,
> = [
  [
    [
      {
        Token: Assets;
      },
      /**
       * amount
       */
      '%plankAmount%',
    ],
    [
      {
        Token: Assets;
      },
      /**
       * fee
       */
      '%xcmFeePlankAmount%',
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
  '%weight%',
];
