import { ChainKey } from '../../constants';
import { Chain, MoonChain } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  getCreateV1V2Extrinsic,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from '../polkadotXcm';

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
      origin: (origin: Chain<ChainKeys>) => {
        const createExtrinsic = getCreateV1V2Extrinsic(
          PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
          event,
          chain,
          origin,
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
    }),
  };
}
