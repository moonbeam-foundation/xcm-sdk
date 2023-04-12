import { XcmExtrinsicGetParams } from '../common.interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  EqBalancesExtrinsic,
  EqBalancesFee,
  EqBalancesSuccessEvent,
} from './eqBalances.constants';

export type EqBalancesPallet = EqBalancesXcmTransfer | EqBalancesTransferXcm;

export interface EqBalancesXcmTransfer {
  pallet: ExtrinsicPallet.EqBalances;
  extrinsic: EqBalancesExtrinsic.XcmTransfer;
  successEvent: EqBalancesSuccessEvent;
  getParams: (params: XcmExtrinsicGetParams) => EqBalancesXcmTransferParams;
}

export interface EqBalancesTransferXcm {
  pallet: ExtrinsicPallet.EqBalances;
  extrinsic: EqBalancesExtrinsic.TransferXcm;
  successEvent: EqBalancesSuccessEvent;
  getParams: (params: XcmExtrinsicGetParams) => EqBalancesTransferXcmParams;
}

export type EqBalancesXcmTransferParams = [
  /**
   * asset
   */
  number,
  /**
   * amount
   */
  bigint,
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
   * Fee type
   */
  EqBalancesFee,
];

export type EqBalancesTransferXcmParams = [
  /**
   * asset
   */
  TransferXcmAsset,
  /**
   * Fee
   */
  TransferXcmAsset,
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
];

/**
 * [id, amount]
 */
export type TransferXcmAsset = [number, bigint];
