import { XcmExtrinsicGetParams } from '../common.interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  EqBalancesExtrinsic,
  EqBalancesSuccessEvent,
} from './eqBalances.constants';

export interface EqBalancesPallet {
  pallet: ExtrinsicPallet.EqBalances;
  extrinsic: EqBalancesExtrinsic;
  successEvent: EqBalancesSuccessEvent;
  getParams: (params: XcmExtrinsicGetParams) => EqBalancesPalletParams;
}

export type EqBalancesPalletParams = [
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
  'SovereignAccWillPay',
];
