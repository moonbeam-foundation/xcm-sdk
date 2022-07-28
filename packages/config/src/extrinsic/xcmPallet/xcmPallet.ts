import { ChainConfig, MoonChainConfig } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  getCreateExtrinsic,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from '../polkadotXcm';
import { XcmPallet } from './xcmPallet.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function xcmPallet(chain: MoonChainConfig) {
  return {
    limitedReserveTransferAssets: () => limitedReserveTransferAssets(chain),
  };
}

function limitedReserveTransferAssets(chain: MoonChainConfig) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      origin: (origin: ChainConfig): XcmPallet => {
        const createExtrinsic = getCreateExtrinsic(
          PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
          event,
          chain,
          origin,
        );

        return {
          ...createExtrinsic((amount) => ({
            V0: [
              {
                ConcreteFungible: {
                  id: 'Null',
                  amount,
                },
              },
            ],
          })),
          pallet: ExtrinsicPallet.XcmPallet,
        };
      },
    }),
  };
}
