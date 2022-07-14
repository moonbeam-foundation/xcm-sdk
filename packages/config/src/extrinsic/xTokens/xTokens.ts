import { Pallet } from '../extrinsic.constants';
import {
  XTokensExtrinsic,
  XTokensExtrinsicSuccessEvent,
} from './xTokens.constants';
import {
  XTokensTransferExtrinsic,
  XTokensTransferOptions,
} from './xTokens.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function xTokens<Assets>() {
  return {
    transfer: () => transfer<Assets>(),
    transferMultiAsset: () => transferMultiAsset<Assets>(),
    transferMultiCurrencies: () => transferMultiCurrencies<Assets>(),
  };
}

function transfer<Assets>() {
  return {
    successEvent: (event: XTokensExtrinsicSuccessEvent) => ({
      options: ({
        token,
        weight,
        parachainId,
      }: XTokensTransferOptions<Assets>): XTokensTransferExtrinsic<Assets> => ({
        pallet: Pallet.XTokens,
        extrinsic: XTokensExtrinsic.Transfer,
        successEvent: event,
        getParams: (account, amount) => [
          token,
          amount,
          {
            V1: {
              parents: 1,
              interior: {
                X2: [
                  {
                    Parachain: parachainId,
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
          },
          weight,
        ],
      }),
    }),
  };
}

function transferMultiAsset<Assets>() {
  return {};
}

function transferMultiCurrencies<Assets>() {
  return {};
}
