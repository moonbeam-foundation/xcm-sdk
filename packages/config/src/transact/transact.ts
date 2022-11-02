import { getPalletInstance } from '../config/config.utils';
import { ChainKey } from '../constants';
import { Chain } from '../interfaces';
import {
  PrecompileXcmTransactThroughSignedMultilocationParams,
  XcmTransactThroughSigned,
  XcmTransactThroughSignedMultilocation,
  XcmTransactThroughSignedParams,
} from './transact.interfaces';

export function createTransactBuilder<ChainKeys extends ChainKey = ChainKey>() {
  return {
    xcmTransactor: () => ({
      transactThroughSigned: (
        chain: Chain<ChainKeys>,
      ): XcmTransactThroughSigned => ({
        getParams: ({
          callHash,
          overallFee,
          overallWeight,
          txWeight,
        }): XcmTransactThroughSignedParams => {
          const palletInstance = getPalletInstance(chain);

          return [
            // TODO: use multiLocation module
            {
              V1: {
                parents: 1,
                interior: {
                  X1: {
                    Parachain: chain.parachainId,
                  },
                },
              },
            },
            {
              currency: {
                AsMultiLocation: {
                  V1: {
                    parents: 1,
                    interior: {
                      X2: [
                        { Parachain: chain.parachainId },
                        { PalletInstance: palletInstance },
                      ],
                    },
                  },
                },
              },
              feeAmount: overallFee,
            },
            callHash,
            {
              transactRequiredWeightAtMost: txWeight,
              overallWeight,
            },
          ];
        },
      }),
      transactThroughSignedMultilocation: (
        chain: Chain<ChainKeys>,
      ): XcmTransactThroughSignedMultilocation => ({
        getParams: ({
          callHash,
          overallFee,
          overallWeight,
          txWeight,
        }): PrecompileXcmTransactThroughSignedMultilocationParams => {
          const palletInstance = getPalletInstance(chain);
          const parachainId = `0x0000000${chain.parachainId.toString(16)}`;

          return {
            destination: [1, [parachainId]],
            asset: [1, [parachainId, `0x040${palletInstance}`]],
            txWeight,
            callHash,
            overallFee,
            overallWeight,
          };
        },
      }),
    }),
  };
}
