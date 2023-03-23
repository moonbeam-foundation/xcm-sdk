import { MoonChain } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  EqBalancesExtrinsic,
  EqBalancesSuccessEvent,
} from './eqBalances.constants';
import { EqBalancesPallet } from './eqBalances.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function eqBalances(chain: MoonChain) {
  return {
    xcmTransfer: () => xcmTransfer(chain),
  };
}

function xcmTransfer(chain: MoonChain) {
  return {
    successEvent: (event: EqBalancesSuccessEvent) => ({
      asset: (id: number): EqBalancesPallet => ({
        pallet: ExtrinsicPallet.EqBalances,
        extrinsic: EqBalancesExtrinsic.XcmTransfer,
        successEvent: event,
        getParams: ({ account, amount }) => [
          id,
          amount,
          {
            parents: 1,
            interior: {
              X2: [
                {
                  Parachain: chain.parachainId,
                },
                {
                  AccountKey20: {
                    network: 'Any',
                    key: account,
                  },
                },
              ],
            },
          },
          'SovereignAccWillPay',
        ],
      }),
    }),
  };
}
