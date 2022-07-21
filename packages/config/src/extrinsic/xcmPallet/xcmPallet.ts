import { ChainConfig, MoonChainConfig } from '../../constants';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  getCreateExtrinsic,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from '../polkadotXcm';
import { XcmPallet } from './xcmPallet.interfaces';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function xcmPallet(config: MoonChainConfig) {
  return {
    limitedReserveTransferAssets: () => limitedReserveTransferAssets(config),
  };
}

function limitedReserveTransferAssets(config: MoonChainConfig) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => ({
      params: (origin: ChainConfig): XcmPallet => {
        const createExtrinsic = getCreateExtrinsic(
          PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
          event,
          config,
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
