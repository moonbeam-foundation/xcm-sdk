import { ChainKey } from '../../constants';
import { Chain, MoonChain } from '../../interfaces';
import { Parents } from '../common.interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import {
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from './polkadotXcm.constants';
import {
  PolkadotXcmAssetParam,
  PolkadotXcmPallet,
  PolkadotXcmPalletParams,
  XcmMLVersion,
} from './polkadotXcm.interfaces';

export function getCreateExtrinsic<ChainKeys extends ChainKey>(
  extrinsic: PolkadotXcmExtrinsic,
  event: PolkadotXcmExtrinsicSuccessEvent,
  config: MoonChain,
  origin: Chain<ChainKeys>,
  parents: Parents = 1,
) {
  return (
    getAsset: (amount: bigint) => PolkadotXcmAssetParam,
    xcmMLVersion: XcmMLVersion,
  ): PolkadotXcmPallet => ({
    pallet: ExtrinsicPallet.PolkadotXcm,
    extrinsic,
    successEvent: event,
    getParams: ({ account, amount }): PolkadotXcmPalletParams => {
      if (xcmMLVersion === XcmMLVersion.v2)
        return [
          {
            V2: {
              parents,
              interior: {
                X1: {
                  Parachain: config.parachainId,
                },
              },
            },
          },
          {
            V2: {
              parents: 0,
              interior: {
                X1: {
                  AccountKey20: {
                    network: 'Any',
                    key: account,
                  },
                },
              },
            },
          },
          getAsset(amount),
          0,
          'Unlimited',
        ];

      return [
        {
          V1: {
            parents,
            interior: {
              X1: {
                Parachain: config.parachainId,
              },
            },
          },
        },
        {
          V1: {
            parents: 0,
            interior: {
              X1: {
                AccountKey20: {
                  network: 'Any',
                  key: account,
                },
              },
            },
          },
        },
        getAsset(amount),
        0,
        {
          Limited: origin.weight,
        },
      ];
    },
  });
}
