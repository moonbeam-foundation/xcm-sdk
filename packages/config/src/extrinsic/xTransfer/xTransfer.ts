import { ChainConfig, MoonChainConfig } from '../../constants';
import { Pallet } from '../extrinsic.constants';
import {
  XTransferExtrinsic,
  XTransferExtrinsicSuccessEvent,
} from './xTransfer.constants';
import {
  XTransferConcreteParam,
  XTransferPallet,
} from './xTransfer.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function xTransfer(config: MoonChainConfig) {
  return {
    transfer: () => transfer(config),
  };
}

function transfer(config: MoonChainConfig) {
  return {
    successEvent: (event: XTransferExtrinsicSuccessEvent) => ({
      params: (origin: ChainConfig) => {
        const createExtrinsic = getCreateExtrinsic(
          XTransferExtrinsic.Transfer,
          event,
          config,
          origin,
        );

        return {
          here: () =>
            createExtrinsic(() => ({
              parents: 0,
              interior: 'Here',
            })),
          X2: (palletInstance: number) =>
            createExtrinsic(() => ({
              parents: 1,
              interior: {
                X2: [
                  {
                    Parachain: config.parachainId,
                  },
                  {
                    PalletInstance: palletInstance,
                  },
                ],
              },
            })),
        };
      },
    }),
  };
}

export function getCreateExtrinsic(
  extrinsic: XTransferExtrinsic,
  event: XTransferExtrinsicSuccessEvent,
  config: MoonChainConfig,
  origin: ChainConfig,
) {
  return (getConcrete: () => XTransferConcreteParam): XTransferPallet => ({
    pallet: Pallet.XTransfer,
    extrinsic,
    successEvent: event,
    getParams: (account, amount) => [
      {
        id: {
          Concrete: getConcrete(),
        },
        fun: {
          Fungible: amount,
        },
      },
      {
        parents: 1,
        interior: {
          X2: [
            {
              Parachain: config.parachainId,
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
      origin.weight,
    ],
  });
}
