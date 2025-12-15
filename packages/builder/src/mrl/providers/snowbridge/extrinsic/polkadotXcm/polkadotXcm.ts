import { EvmChain } from '@moonbeam-network/xcm-types';
import { TransferType } from '../../../../../contract';
import { getExtrinsicArgumentVersion } from '../../../../../extrinsic/ExtrinsicBuilder.utils';
import { ExtrinsicConfig } from '../../../../../types/substrate/ExtrinsicConfig';
import {
  type MrlConfigBuilder,
  Provider,
} from '../../../../MrlBuilder.interfaces';

const pallet = 'polkadotXcm';

// TODO mjm add tests
export function polkadotXcm() {
  return {
    transferAssetsUsingTypeAndThen: () => {
      const func = 'transferAssetsUsingTypeAndThen';
      const provider = Provider.Snowbridge;

      return {
        // TODO mjm rename
        canonicalEth: (): MrlConfigBuilder => ({
          provider,
          build: ({ asset, fee, destination, destinationAddress }) => {
            if (!EvmChain.is(destination)) {
              throw new Error(
                'Destination must be an EVM chain for globalConsensus function',
              );
            }

            return new ExtrinsicConfig({
              module: pallet,
              func,
              getArgs: (extrinsicFunction) => {
                const version = getExtrinsicArgumentVersion(extrinsicFunction);
                const dest = {
                  [version]: {
                    parents: 1,
                    interior: 'Here',
                  },
                };

                const assets = {
                  [version]: [
                    {
                      id: {
                        parents: 1,
                        interior: 'Here',
                      },
                      fun: { Fungible: fee.amount },
                    },
                    {
                      id: {
                        parents: 2,
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
                const assetsTransferType = TransferType.DestinationReserve;
                const remoteFeesId = {
                  [version]: {
                    parents: 1,
                    interior: 'Here',
                  },
                };
                const feesTransferType = TransferType.DestinationReserve;
                const customXcmOnDest = {
                  [version]: [
                    {
                      InitiateReserveWithdraw: {
                        assets: {
                          Definite: [
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
                        },
                        reserve: {
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
                        xcm: [
                          {
                            DepositAsset: {
                              Definite: [
                                {
                                  id: {
                                    parents: 0,
                                    interior: 'Here',
                                  },
                                  fun: { Fungible: asset.amount },
                                },
                              ],
                            },
                          },
                        ],
                        beneficiary: {
                          parents: 0,
                          interior: {
                            X1: [
                              {
                                AccountKey20: {
                                  network: {
                                    Ethereum: { chainId: destination.id },
                                  },
                                  key: destinationAddress,
                                },
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                };

                return [
                  dest,
                  assets,
                  assetsTransferType,
                  remoteFeesId,
                  feesTransferType,
                  customXcmOnDest,
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
