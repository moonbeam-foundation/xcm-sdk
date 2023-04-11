import { MoonChain } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  EqBalancesExtrinsic,
  EqBalancesFee,
  EqBalancesSuccessEvent,
} from './eqBalances.constants';
import {
  EqBalancesTransferXcm,
  EqBalancesXcmTransfer,
} from './eqBalances.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function eqBalances(chain: MoonChain) {
  return {
    xcmTransfer: () => xcmTransfer(chain),
    transferXcm: () => transferXcm(chain),
  };
}

function xcmTransfer(chain: MoonChain) {
  return {
    successEvent: (event: EqBalancesSuccessEvent) => ({
      asset: (id: number) => ({
        fee: (fee: EqBalancesFee): EqBalancesXcmTransfer => ({
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
            fee,
          ],
        }),
      }),
    }),
  };
}

function transferXcm(chain: MoonChain) {
  return {
    successEvent: (event: EqBalancesSuccessEvent) => ({
      asset: (id: number) => ({
        feeAsset: (feeAsset: number): EqBalancesTransferXcm => ({
          pallet: ExtrinsicPallet.EqBalances,
          extrinsic: EqBalancesExtrinsic.TransferXcm,
          successEvent: event,
          getParams: ({ account, amount, fee = 0n }) => [
            [id, amount],
            [feeAsset, fee],
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
          ],
        }),
      }),
    }),
  };
}
