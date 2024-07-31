import { ExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import { ExtrinsicConfig } from '../../ExtrinsicConfig';
import {
  getPolkadotXcmExtrinsicArgs,
  shouldFeeAssetPrecedeAsset,
} from './polkadotXcm.util';

const pallet = 'polkadotXcm';

export function polkadotXcm() {
  return {
    limitedReserveTransferAssets: () => {
      const func = 'limitedReserveTransferAssets';

      return {
        here: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) =>
                getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: {
                        Concrete: {
                          parents: 0,
                          interior: 'Here',
                        },
                      },
                      fun: {
                        Fungible: params.amount,
                      },
                    },
                  ],
                }),
            }),
        }),
        X1: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) =>
                getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: {
                        Concrete: {
                          parents: 0,
                          interior: {
                            X1: {
                              PalletInstance: params.palletInstance,
                            },
                          },
                        },
                      },
                      fun: {
                        Fungible: params.amount,
                      },
                    },
                  ],
                }),
            }),
        }),
        X2: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const isAssetDifferent =
                  !!params.feeAsset && params.asset !== params.feeAsset;
                const assets = [
                  {
                    id: {
                      Concrete: {
                        parents: 0,
                        interior: {
                          X2: [
                            {
                              PalletInstance: params.palletInstance,
                            },
                            {
                              GeneralIndex: params.asset,
                            },
                          ],
                        },
                      },
                    },
                    fun: {
                      Fungible: params.amount,
                    },
                  },
                ];

                const shouldFeeAssetPrecede =
                  shouldFeeAssetPrecedeAsset(params);

                if (isAssetDifferent) {
                  const feeAsset = {
                    id: {
                      Concrete: {
                        parents: 0,
                        interior: {
                          X2: [
                            {
                              PalletInstance: params.palletInstance,
                            },
                            {
                              GeneralIndex: params.feeAsset,
                            },
                          ],
                        },
                      },
                    },
                    fun: {
                      Fungible: params.fee,
                    },
                  };

                  if (shouldFeeAssetPrecede) {
                    assets.unshift(feeAsset);
                  } else {
                    assets.push(feeAsset);
                  }
                }

                return getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: assets,
                  feeIndex: isAssetDifferent && !shouldFeeAssetPrecede ? 1 : 0,
                });
              },
            }),
        }),
      };
    },
    limitedReserveWithdrawAssets: () => {
      const func = 'limitedReserveWithdrawAssets';

      return {
        X2: (): ExtrinsicConfigBuilder => ({
          build: (params) =>
            new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) =>
                getPolkadotXcmExtrinsicArgs({
                  ...params,
                  func: extrinsicFunction,
                  asset: [
                    {
                      id: {
                        Concrete: {
                          parents: 1,
                          interior: {
                            X2: [
                              {
                                Parachain: params.destination.parachainId,
                              },
                              {
                                PalletInstance: params.palletInstance,
                              },
                            ],
                          },
                        },
                      },
                      fun: {
                        Fungible: params.amount,
                      },
                    },
                  ],
                }),
            }),
        }),
      };
    },
  };
}
