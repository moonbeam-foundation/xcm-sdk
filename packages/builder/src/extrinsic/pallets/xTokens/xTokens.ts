import { ExtrinsicConfig } from '../../../types/substrate/ExtrinsicConfig';
import {
  type ExtrinsicConfigBuilder,
  XcmVersion,
} from '../../ExtrinsicBuilder.interfaces';
import {
  getExtrinsicArgumentVersion,
  normalizeConcrete,
  normalizeX1,
} from '../../ExtrinsicBuilder.utils';
import { getDestination, getWeight } from './xTokens.utils';

const pallet = 'xTokens';

export function xTokens() {
  return {
    transfer: (): ExtrinsicConfigBuilder => ({
      build: ({ destinationAddress, asset, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: 'transfer',
          getArgs: (func) => {
            const destIndex = 2;
            const version = getExtrinsicArgumentVersion(func, destIndex);

            return [
              asset.getAssetId(),
              asset.amount,
              getDestination(version, destinationAddress, destination),
              getWeight(),
            ];
          },
        }),
    }),
    transferMultiAsset: (originParachainId: number) => {
      const funcName = 'transferMultiasset';
      const destIndex = 1;

      return {
        here: (): ExtrinsicConfigBuilder => ({
          build: ({ destinationAddress: address, asset, destination }) =>
            new ExtrinsicConfig({
              module: pallet,
              func: funcName,
              getArgs: (func) => {
                const version = getExtrinsicArgumentVersion(func, destIndex);

                return [
                  {
                    [version]: {
                      id: normalizeConcrete(version, {
                        parents: 0,
                        interior: 'Here',
                      }),
                      fun: {
                        Fungible: asset.amount,
                      },
                    },
                  },
                  getDestination(version, address, destination),
                  getWeight(),
                ];
              },
            }),
        }),
        X1: (): ExtrinsicConfigBuilder => ({
          build: ({ destinationAddress: address, asset, destination }) =>
            new ExtrinsicConfig({
              module: pallet,
              func: funcName,
              getArgs: (func) => {
                const version = getExtrinsicArgumentVersion(func, destIndex);

                return [
                  {
                    [version]: {
                      id: normalizeConcrete(
                        version,
                        normalizeX1(version, {
                          parents: 1,
                          interior: {
                            X1: {
                              Parachain: originParachainId,
                            },
                          },
                        }),
                      ),
                      fun: {
                        Fungible: asset.amount,
                      },
                    },
                  },
                  getDestination(version, address, destination),
                  getWeight(),
                ];
              },
            }),
        }),
        X2: (): ExtrinsicConfigBuilder => ({
          build: ({ destinationAddress: address, asset, destination }) =>
            new ExtrinsicConfig({
              module: pallet,
              func: funcName,
              getArgs: (func) => {
                const version = getExtrinsicArgumentVersion(func, destIndex);

                return [
                  {
                    [version]: {
                      id: normalizeConcrete(version, {
                        parents: 1,
                        interior: {
                          X2: [
                            {
                              Parachain: originParachainId,
                            },
                            {
                              GeneralKey: asset.getAssetId(),
                            },
                          ],
                        },
                      }),
                      fun: {
                        Fungible: asset.amount,
                      },
                    },
                  },
                  getDestination(version, address, destination),
                  getWeight(),
                ];
              },
            }),
        }),
      };
    },
    transferMultiCurrencies: (): ExtrinsicConfigBuilder => ({
      build: ({ destinationAddress: address, asset, destination, fee }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: 'transferMulticurrencies',
          getArgs: () => [
            [
              [asset.getAssetId(), asset.amount],
              [fee.getAssetId(), fee.amount],
            ],
            1,
            getDestination(XcmVersion.v3, address, destination),
            getWeight(),
          ],
        }),
    }),
  };
}
