import { EvmChain } from '@moonbeam-network/xcm-types';
import { getExtrinsicArgumentVersion } from '../../../../../extrinsic/ExtrinsicBuilder.utils';
import { ExtrinsicConfig } from '../../../../../types/substrate/ExtrinsicConfig';
import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';

const pallet = 'xcmPallet';

// TODO move this outside of wormhole provider
export function xcmPallet() {
  return {
    transferAssets: () => {
      const func = 'transferAssets';

      return {
        globalConsensus: (): MrlConfigBuilder => ({
          build: ({ asset, destination, destinationAddress, sourceApi }) => {
            console.log('building transferAssets extrinsic');
            if (!EvmChain.is(destination)) {
              throw new Error('Destination must be an EVM chain');
            }

            if (!sourceApi) {
              throw new Error('Source API needs to be defined');
            }

            return new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const version = getExtrinsicArgumentVersion(extrinsicFunction);
                const dest = {
                  [version]: {
                    parents: 1,
                    interior: {
                      X1: [
                        {
                          GlobalConsensus: {
                            Ethereum: { chainId: destination.id },
                          },
                        },
                      ],
                    },
                  },
                };

                const beneficiary = {
                  [version]: {
                    parents: 0,
                    interior: {
                      X1: [
                        {
                          AccountKey20: {
                            network: { Ethereum: { chainId: destination.id } },
                            key: destinationAddress,
                          },
                        },
                      ],
                    },
                  },
                };

                const assets = {
                  [version]: [
                    {
                      id: {
                        parents: 1,
                        interior: {
                          X1: [
                            {
                              GlobalConsensus: {
                                Ethereum: { chainId: destination.id },
                              },
                            },
                          ],
                        },
                      },
                      fun: { Fungible: asset.amount },
                    },
                  ],
                };

                return [
                  dest,
                  beneficiary,
                  assets,
                  0, // feeAssetItem
                  'Unlimited',
                ];
              },
            });
          },
        }),
      };
    },
  };
}
