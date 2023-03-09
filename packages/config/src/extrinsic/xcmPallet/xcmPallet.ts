import { MoonChain } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  getCreateV1V2Extrinsic,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from '../polkadotXcm';

/* eslint-disable @typescript-eslint/no-use-before-define */
export function xcmPallet(chain: MoonChain) {
  return {
    limitedReserveTransferAssets: () => limitedReserveTransferAssets(chain),
  };
}

function limitedReserveTransferAssets(chain: MoonChain) {
  return {
    successEvent: (event: PolkadotXcmExtrinsicSuccessEvent) => {
      const createExtrinsic = getCreateV1V2Extrinsic(
        PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
        event,
        chain,
        0,
      );

      return {
        ...createExtrinsic((amount) => [
          {
            id: {
              Concrete: {
                parents: 0,
                interior: 'Here',
              },
            },
            fun: {
              Fungible: amount,
            },
          },
        ]),
        pallet: ExtrinsicPallet.XcmPallet,
      };
    },
  };
}
