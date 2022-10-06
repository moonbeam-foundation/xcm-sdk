import { AssetId } from '../../types';
import { Parents } from '../common.interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from './polkadotXcm.constants';

export interface PolkadotXcmPallet {
  pallet: ExtrinsicPallet.PolkadotXcm;
  extrinsic: PolkadotXcmExtrinsic;
  successEvent: PolkadotXcmExtrinsicSuccessEvent;
  getParams: (account: string, amount: bigint) => PolkadotXcmPalletParams;
}

export type PolkadotXcmPalletParams = [
  /**
   * destination
   */
  {
    V1: {
      parents: Parents;
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
  X2:
    | [
        {
          PalletInstance: number;
        },
        {
          GeneralIndex: AssetId;
        },
      ]
    | [
        {
          Parachain: number;
        },
        {
          PalletInstance: number;
        },
      ];
}
