import { ExtrinsicConfig } from '../../../types/substrate/ExtrinsicConfig';
import type { ExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import { getExtrinsicAccount } from '../../ExtrinsicBuilder.utils';

const pallet = 'xTransfer';

export function xTransfer() {
  return {
    transfer: () => {
      const method = 'transfer';

      return {
        here: (): ExtrinsicConfigBuilder => ({
          build: ({ destinationAddress: address, asset, destination }) =>
            new ExtrinsicConfig({
              module: pallet,
              func: method,
              getArgs: () => [
                {
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
                {
                  parents: 1,
                  interior: {
                    X2: [
                      {
                        Parachain: destination.parachainId,
                      },
                      getExtrinsicAccount(address),
                    ],
                  },
                },
                {
                  refTime: 5_000_000_000,
                  proofSize: 0,
                },
              ],
            }),
        }),
        X2: (): ExtrinsicConfigBuilder => ({
          build: ({ destinationAddress, asset, destination }) =>
            new ExtrinsicConfig({
              module: pallet,
              func: method,
              getArgs: () => [
                {
                  id: {
                    Concrete: {
                      parents: 1,
                      interior: {
                        X2: [
                          {
                            Parachain: destination.parachainId,
                          },
                          {
                            PalletInstance: asset.getAssetPalletInstance(),
                          },
                        ],
                      },
                    },
                  },
                  fun: {
                    Fungible: asset.amount || 1n,
                  },
                },
                {
                  parents: 1,
                  interior: {
                    X2: [
                      {
                        Parachain: destination.parachainId,
                      },
                      getExtrinsicAccount(destinationAddress),
                    ],
                  },
                },
                {
                  refTime: 5_000_000_000,
                  proofSize: 0,
                },
              ],
            }),
        }),
      };
    },
  };
}
