/* eslint-disable sort-keys */
import { ExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import { ExtrinsicConfig } from '../../ExtrinsicConfig';

const pallet = 'xTransfer';

export function xTransfer() {
  return {
    transfer: () => {
      const method = 'transfer';

      return {
        here: (): ExtrinsicConfigBuilder => ({
          build: ({ address, amount, destination }) =>
            new ExtrinsicConfig({
              pallet,
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
                    Fungible: amount,
                  },
                },
                {
                  parents: 1,
                  interior: {
                    X2: [
                      {
                        Parachain: destination.parachainId,
                      },
                      {
                        AccountKey20: {
                          key: address,
                        },
                      },
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
          build: ({ address, amount, destination, asset }) =>
            new ExtrinsicConfig({
              pallet,
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
                            PalletInstance: asset,
                          },
                        ],
                      },
                    },
                  },
                  fun: {
                    Fungible: amount,
                  },
                },
                {
                  parents: 1,
                  interior: {
                    X2: [
                      {
                        Parachain: destination.parachainId,
                      },
                      {
                        AccountKey20: {
                          key: address,
                        },
                      },
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
