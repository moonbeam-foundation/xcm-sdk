import { MoonChain } from '../../interfaces';
import { Parents } from '../common.interfaces';
import { ExtrinsicPallet } from '../extrinsic.constants';
import { getExtrinsicArgumentVersion } from '../extrinsic.utils';
import {
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from './polkadotXcm.constants';
import {
  PolkadotXcmAssetParam,
  PolkadotXcmPallet,
  PolkadotXcmPalletParams,
} from './polkadotXcm.interfaces';

export function getCreateV1V2Extrinsic(
  extrinsic: PolkadotXcmExtrinsic,
  event: PolkadotXcmExtrinsicSuccessEvent,
  config: MoonChain,
  parents: Parents = 1,
) {
  return (
    getAsset: (amount: bigint) => PolkadotXcmAssetParam[],
  ): PolkadotXcmPallet => ({
    pallet: ExtrinsicPallet.PolkadotXcm,
    extrinsic,
    successEvent: event,
    getParams: ({
      account,
      amount,
      extrinsicCall,
    }): PolkadotXcmPalletParams => {
      const version = getExtrinsicArgumentVersion(extrinsicCall);

      return [
        {
          [version]: {
            parents,
            interior: {
              X1: {
                Parachain: config.parachainId,
              },
            },
          },
        },
        {
          [version]: {
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
        {
          [version]: getAsset(amount),
        },
        0,
        'Unlimited',
      ];
    },
  });
}
