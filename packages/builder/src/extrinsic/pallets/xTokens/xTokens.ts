/* eslint-disable sort-keys */
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
      build: ({ address, amount, asset, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: 'transfer',
          getArgs: (func) => {
            const version = getExtrinsicArgumentVersion(func, 2);

            return [
              asset,
              amount,
              getDestination(version, address, destination),
              getWeight(),
            ];
          },
        }),
    }),
    transferMultiAsset: (originParachainId: number) => {
      const funcName = 'transferMultiasset';

      return {
        here: (): ExtrinsicConfigBuilder => ({
          build: ({ address, amount, destination }) =>
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
                        Fungible: amount,
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
          build: ({ address, amount, destination }) =>
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
                        Fungible: amount,
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
          build: ({ address, amount, asset, destination }) =>
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
                                GeneralKey: asset,
                              },
                            ],
                          },
                        },
                      },
                      fun: {
                        Fungible: amount,
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
      build: ({ address, amount, asset, destination, fee, feeAsset }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: 'transferMulticurrencies',
          getArgs: () => [
            [
              [asset, amount],
              [feeAsset, fee],
            ],
            1,
            getDestination(XcmVersion.v3, address, destination),
            getWeight(),
          ],
        }),
    }),
  };
}
