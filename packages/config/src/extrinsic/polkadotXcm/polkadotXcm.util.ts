import { SubmittableExtrinsicFunction } from '@polkadot/api/types';
import { getTypeDef } from '@polkadot/types/create';
import { MoonChain } from '../../interfaces';
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

function getAvailableVersion(
  extrinsicCall?: SubmittableExtrinsicFunction<'promise'>,
): XcmMLVersion {
  if (!extrinsicCall) return XcmMLVersion.v1;

  const { type } = extrinsicCall.meta.args[0];
  const instance = extrinsicCall.meta.registry.createType(type.toString());
  const raw = getTypeDef(instance?.toRawType());

  if (Array.isArray(raw.sub) && raw.sub.find((x) => x.name === 'V2'))
    return XcmMLVersion.v2;

  return XcmMLVersion.v1;
}

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
      const versionKey = getAvailableVersion(extrinsicCall);
      return [
        {
          [versionKey]: {
            parents,
            interior: {
              X1: {
                Parachain: config.parachainId,
              },
            },
          },
        },
        {
          [versionKey]: {
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
          [versionKey]: getAsset(amount),
        },
        0,
        'Unlimited',
      ];
    },
  });
}
