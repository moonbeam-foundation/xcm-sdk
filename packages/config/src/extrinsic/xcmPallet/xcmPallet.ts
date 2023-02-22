import { ChainKey } from '../../constants';
import { Chain, MoonChain } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  getCreateExtrinsic,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
  XcmMLVersion,
} from '../polkadotXcm';
import { XcmPallet } from './xcmPallet.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function xcmPallet<ChainKeys extends ChainKey>(chain: MoonChain) {
  return {
    limitedReserveTransferAssets: () =>
      limitedReserveTransferAssets<ChainKeys>(chain),
  };
}

function limitedReserveTransferAssets<ChainKeys extends ChainKey>(
  chain: MoonChain,
) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      origin: (origin: Chain<ChainKeys>): XcmPallet => {
        const createExtrinsic = getCreateExtrinsic(
          PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
          event,
          chain,
          origin,
          0,
        );

        return {
          ...createExtrinsic(
            (amount) => ({
              V0: [
                {
                  ConcreteFungible: {
                    id: 'Null',
                    amount,
                  },
                },
              ],
            }),
            XcmMLVersion.v0,
          ),
          pallet: ExtrinsicPallet.XcmPallet,
        };
      },
    }),
  };
}
