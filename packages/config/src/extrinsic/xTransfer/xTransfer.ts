import { ChainKey } from '../../constants';
import { Chain, MoonChain } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  XTransferExtrinsic,
  XTransferExtrinsicSuccessEvent,
} from './xTransfer.constants';
import {
  XTransferConcreteParam,
  XTransferPallet,
} from './xTransfer.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function xTransfer<ChainKeys extends ChainKey>(chain: MoonChain) {
  return {
    transfer: () => transfer<ChainKeys>(chain),
  };
}

function transfer<ChainKeys extends ChainKey>(chain: MoonChain) {
  return {
    successEvent: (event: XTransferExtrinsicSuccessEvent) => ({
      origin: (origin: Chain<ChainKeys>) => {
        const createExtrinsic = getCreateExtrinsic(
          XTransferExtrinsic.Transfer,
          event,
          chain,
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
                    Parachain: chain.parachainId,
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

function getCreateExtrinsic<ChainKeys extends ChainKey>(
  extrinsic: XTransferExtrinsic,
  event: XTransferExtrinsicSuccessEvent,
  chain: MoonChain,
  origin: Chain<ChainKeys>,
) {
  return (getConcrete: () => XTransferConcreteParam): XTransferPallet => ({
    pallet: ExtrinsicPallet.XTransfer,
    extrinsic,
    successEvent: event,
    getParams: ({ account, amount }) => [
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
      origin.weight,
    ],
  });
}
