import { ChainConfig, MoonChainConfig } from '../constants';
import {
  XcmPallet,
  PolkadotXcmExtrinsic,
  PolkadotXcmExtrinsicSuccessEvent,
} from './extrinsic.constants';
import { PolkadotXcmAssetParam } from './extrinsic.interfaces';
import { PolkadotXcmPallet } from './polkadotXcm/polkadotXcm.interfaces';

export function getCreateExtrinsic(
  extrinsic: PolkadotXcmExtrinsic,
  event: PolkadotXcmExtrinsicSuccessEvent,
  config: MoonChainConfig,
  origin: ChainConfig,
) {
  return (
    getAsset: (amount: bigint) => PolkadotXcmAssetParam,
  ): PolkadotXcmPallet => ({
    pallet: XcmPallet.PolkadotXcm,
    extrinsic,
    successEvent: event,
    getParams: (account, amount) => [
      {
        V1: {
          parents: 1,
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
    ],
  });
}
