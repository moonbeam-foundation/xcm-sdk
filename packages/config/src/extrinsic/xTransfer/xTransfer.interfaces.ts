import { Pallet } from '../extrinsic.constants';
import { Parents } from '../extrinsic.interfaces';
import {
  XTransferExtrinsic,
  XTransferExtrinsicSuccessEvent,
} from './xTransfer.constants';

export interface XTransferPallet {
  pallet: Pallet.XTransfer;
  extrinsic: XTransferExtrinsic;
  successEvent: XTransferExtrinsicSuccessEvent;
  getParams: (account: string, amount: bigint) => XTransferPalletParams;
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
