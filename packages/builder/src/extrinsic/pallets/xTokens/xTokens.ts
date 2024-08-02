import {
  ExtrinsicConfigBuilder,
  XcmVersion,
} from '../../ExtrinsicBuilder.interfaces';
import { getExtrinsicArgumentVersion } from '../../ExtrinsicBuilder.utils';
import { ExtrinsicConfig } from '../../ExtrinsicConfig';
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
            const version = getExtrinsicArgumentVersion(func, 2);

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

      return {
        here: (): ExtrinsicConfigBuilder => ({
          build: ({ destinationAddress: address, asset, destination }) =>
            new ExtrinsicConfig({
              module: pallet,
              func: funcName,
              getArgs: (func) => {
                const version = getExtrinsicArgumentVersion(func, 1);

                return [
                  {
                    [version]: {
                      id: {
                        Concrete: {
                          parents: 0,
                          interior: 'Here',
                        },
                      },
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
                const version = getExtrinsicArgumentVersion(func, 1);

                return [
                  {
                    [version]: {
                      id: {
                        Concrete: {
                          parents: 1,
                          interior: {
                            X1: {
                              Parachain: originParachainId,
                            },
                          },
                        },
                      },
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
                const version = getExtrinsicArgumentVersion(func, 1);

                return [
                  {
                    [version]: {
                      id: {
                        Concrete: {
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
                        },
                      },
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
