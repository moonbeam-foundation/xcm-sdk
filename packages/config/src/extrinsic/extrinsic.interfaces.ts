export type Parents = 0 | 1;

export type PolkadotXcmPalletParams = [
  /**
   * destination
   */
  {
    V1: {
      parents: 1;
      interior: {
        X1: {
          Parachain: number;
        };
      };
    };
  },
  /**
   * beneficiary
   */
  {
    V1: {
      parents: 0;
      interior: {
        X1: {
          AccountKey20: {
            network: 'Any';
            /**
             * account
             */
            key: string;
          };
        };
      };
    };
  },
  /**
   * asset
   */
  PolkadotXcmAssetParam,
  /**
   * fee
   */
  0,
  /**
   * weight
   */
  {
    Limited: number;
  },
];

export type PolkadotXcmAssetParam =
  | PolkadotXcmAssetParamV0
  | PolkadotXcmAssetParamV1;

export interface PolkadotXcmAssetParamV0 {
  V0: [
    {
      ConcreteFungible: {
        id: 'Null';
        amount: bigint;
      };
    },
  ];
}

export interface PolkadotXcmAssetParamV1 {
  V1: [
    {
      id: {
        Concrete: {
          parents: Parents;
          interior:
            | 'Here'
            | PolkadotXcmAssetParamV1InteriorX1
            | PolkadotXcmAssetParamV1InteriorX2;
        };
      };
      fun: {
        Fungible: bigint;
      };
    },
  ];
}

export interface PolkadotXcmAssetParamV1InteriorX1 {
  X1: {
    PalletInstance: number;
  };
}

export interface PolkadotXcmAssetParamV1InteriorX2 {
  X2: [
    (
      | {
          PalletInstance: number;
        }
      | {
          Parachain: number;
        }
    ),
    (
      | {
          GeneralIndex: number;
        }
      | {
          PalletInstance: number;
        }
    ),
  ];
}
