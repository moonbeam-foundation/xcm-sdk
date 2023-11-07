/* eslint-disable sort-keys */
import { ExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import { getExtrinsicAccount } from '../../ExtrinsicBuilder.utils';
import { ExtrinsicConfig } from '../../ExtrinsicConfig';

export enum EqBalancesFee {
  SovereignAccWillPay = 'SovereignAccWillPay',
  TargetChainAccWillPay = 'TargetChainAccWillPay',
  ThisAccWillPay = 'ThisAccWillPay',
}

const pallet = 'eqBalances';

export function eqBalances() {
  return {
    xcmTransfer: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, asset, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
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
                  getExtrinsicAccount(address),
                ],
              },
            },
            EqBalancesFee.ThisAccWillPay,
          ],
        }),
    }),
    transferXcm: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, asset, destination, fee, feeAsset }) =>
        new ExtrinsicConfig({
          module: pallet,
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
                    getExtrinsicAccount(address),
                  ],
                },
              },
            ];
          },
        }),
    }),
  };
}
