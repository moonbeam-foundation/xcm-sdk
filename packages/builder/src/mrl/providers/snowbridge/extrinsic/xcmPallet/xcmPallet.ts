import { EvmChain } from '@moonbeam-network/xcm-types';
import { ExtrinsicConfig } from '../../../../../types/substrate/ExtrinsicConfig';
import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';
import { getGlobalConsensusArgs } from './xcmPallet.utils';

const pallet = 'xcmPallet';

export function xcmPallet() {
  return {
    transferAssets: () => {
      const func = 'transferAssets';
      const provider = 'snowbridge' as const;

      return {
        globalConsensus: (): MrlConfigBuilder => ({
          provider,
          build: ({ asset, destination, destinationAddress }) => {
            if (!EvmChain.is(destination)) {
              throw new Error(
                'Destination must be an EVM chain for globalConsensus function',
              );
            }

            return new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const assets = [
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
                ];

                return getGlobalConsensusArgs({
                  assets,
                  destination,
                  destinationAddress,
                  func: extrinsicFunction,
                });
              },
            });
          },
        }),
        globalConsensusErc20: (): MrlConfigBuilder => ({
          provider,
          build: ({ asset, destination, destinationAddress }) => {
            if (!EvmChain.is(destination)) {
              throw new Error(
                'Destination must be an EVM chain for globalConsensusErc20 function',
              );
            }

            const assetInDestination = destination.getChainAsset(asset);

            return new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const assets = [
                  {
                    id: {
                      parents: 1,
                      interior: {
                        X2: [
                          {
                            GlobalConsensus: {
                              Ethereum: { chainId: destination.id },
                            },
                          },
                          {
                            AccountKey20: {
                              network: {
                                Ethereum: { chainId: destination.id },
                              },
                              key: assetInDestination.address,
                            },
                          },
                        ],
                      },
                    },
                    fun: { Fungible: asset.amount },
                  },
                ];

                return getGlobalConsensusArgs({
                  assets,
                  destination,
                  destinationAddress,
                  func: extrinsicFunction,
                });
              },
            });
          },
        }),
      };
    },
  };
}
