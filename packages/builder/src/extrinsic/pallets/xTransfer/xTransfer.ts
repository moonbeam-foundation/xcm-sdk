/* eslint-disable sort-keys */
import { ExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import { getExtrinsicAccount } from '../../ExtrinsicBuilder.utils';
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
          build: ({ address, amount, destination, palletInstance }) =>
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
                            PalletInstance: palletInstance,
                          },
                        ],
                      },
                    },
                  },
                  fun: {
                    Fungible: amount || 1n,
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
      };
    },
  };
}
