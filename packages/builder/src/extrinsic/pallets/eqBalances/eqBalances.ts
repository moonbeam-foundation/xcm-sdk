/* eslint-disable sort-keys */
import { ExtrinsicConfig } from '../../ExtrinsicConfig';
import { ExtrinsicConfigBuilder } from '../../ExtrinsicConfigBuilder.interfaces';

const pallet = 'eqBalances';

export function eqBalances() {
  return {
    xcmTransfer: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, asset, destination, fee }) =>
        new ExtrinsicConfig({
          pallet,
          func: 'xcmTransfer',
          getArgs: () => [
            asset,
            amount,
            {
              parents: 1,
              interior: {
                X2: [
                  {
                    Parachain: destination.parachainId,
                  },
                  {
                    AccountKey20: {
                      network: 'Any',
                      key: address,
                    },
                  },
                ],
              },
            },
            fee,
          ],
        }),
    }),
    transferXcm: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, asset, destination, fee, feeAsset }) =>
        new ExtrinsicConfig({
          pallet,
          func: 'transferXcm',
          getArgs: () => {
            const amountWithoutFee = amount - fee > 0n ? amount - fee : 0n;

            return [
              [asset, asset === feeAsset ? amountWithoutFee : amount],
              [feeAsset, fee],
              {
                parents: 1,
                interior: {
                  X2: [
                    {
                      Parachain: destination.parachainId,
                    },
                    {
                      AccountKey20: {
                        network: 'Any',
                        key: address,
                      },
                    },
                  ],
                },
              },
            ];
          },
        }),
    }),
  };
}
