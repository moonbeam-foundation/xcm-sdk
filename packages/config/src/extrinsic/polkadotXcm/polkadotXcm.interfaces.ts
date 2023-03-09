import { AssetId } from '../../interfaces';
import { Parents, XcmExtrinsicGetParams } from '../common.interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from './polkadotXcm.constants';

export interface PolkadotXcmPallet {
  pallet: ExtrinsicPallet.PolkadotXcm;
  extrinsic: PolkadotXcmExtrinsic;
  successEvent: PolkadotXcmExtrinsicSuccessEvent;
  getParams: (params: XcmExtrinsicGetParams) => PolkadotXcmPalletParams;
}

export type PolkadotXcmPalletParams = [
  /**
   * destination
   */
  {
    [v in XcmMLVersion]?: {
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
    [v in XcmMLVersion]?: {
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
  {
    [v in XcmMLVersion]?: PolkadotXcmAssetParam[];
  },
  /**
   * fee
   */
  0,
  /**
   * weight
   */
  'Unlimited',
];

export enum XcmMLVersion {
  v1 = 'V1',
  v2 = 'V2',
}
export type PolkadotXcmAssetParam = {
  id: {
    Concrete: {
      parents: Parents;
      interior:
        | 'Here'
        | PolkadotXcmAssetParamInteriorX1
        | PolkadotXcmAssetParamInteriorX2;
    };
  };
  fun: {
    Fungible: bigint;
  };
};

export interface PolkadotXcmAssetParamInteriorX1 {
  X1: {
    PalletInstance: number;
  };
}

export interface PolkadotXcmAssetParamInteriorX2 {
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
