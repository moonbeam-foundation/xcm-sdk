import { ChainKey } from '../../constants';
import { Chain, MoonChain } from '../../interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  getCreateExtrinsic,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
  XcmMLVersion,
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
        const createExtrinsic = getCreateExtrinsic(
          PolkadotXcmExtrinsic.LimitedReserveTransferAssets,
          event,
          chain,
          origin,
          0,
        );

        return {
          V0: () => ({
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
          }),
          V2: () => ({
            ...createExtrinsic(
              (amount) => ({
                V2: [
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
                ],
              }),
              XcmMLVersion.v2,
            ),
            pallet: ExtrinsicPallet.XcmPallet,
          }),
        };
      },
    }),
  };
}
