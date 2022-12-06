import { Parents, XcmExtrinsicGetParams } from '../common.interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  XTransferExtrinsic,
  XTransferExtrinsicSuccessEvent,
} from './xTransfer.constants';

export interface XTransferPallet {
  pallet: ExtrinsicPallet.XTransfer;
  extrinsic: XTransferExtrinsic;
  successEvent: XTransferExtrinsicSuccessEvent;
  getParams: (params: XcmExtrinsicGetParams) => XTransferPalletParams;
}

export type XTransferPalletParams = [
  /**
   * asset
   */
  {
    id: {
      Concrete: XTransferConcreteParam;
    };
    fun: {
      Fungible: bigint;
    };
  },
  /**
   * destination
   */
  {
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
  },
  /**
   * weight
   */
  number,
];

export interface XTransferConcreteParam {
  parents: Parents;
  interior: XTransferInteriorParam;
}

export type XTransferInteriorParam =
  | 'Here'
  | {
      X2: [
        {
          Parachain: number;
        },
        {
          PalletInstance: number;
        },
      ];
    };
