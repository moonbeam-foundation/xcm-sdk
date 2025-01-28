import { ExtrinsicConfig } from '../../../types/substrate/ExtrinsicConfig';
import type { ExtrinsicConfigBuilder } from '../../ExtrinsicBuilder.interfaces';
import { getExtrinsicAccount } from '../../ExtrinsicBuilder.utils';

export enum EqBalancesFee {
  SovereignAccWillPay = 'SovereignAccWillPay',
  TargetChainAccWillPay = 'TargetChainAccWillPay',
  ThisAccWillPay = 'ThisAccWillPay',
}

const pallet = 'eqBalances';

export function eqBalances() {
  return {
    xcmTransfer: (): ExtrinsicConfigBuilder => ({
      build: ({ destinationAddress, asset, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: 'xcmTransfer',
          getArgs: () => [
            asset.getAssetId(),
            asset.amount,
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
            EqBalancesFee.ThisAccWillPay,
          ],
        }),
    }),
    transferXcm: (): ExtrinsicConfigBuilder => ({
      build: ({ destinationAddress: address, asset, destination, fee }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: 'transferXcm',
          getArgs: () => {
            const amountWithoutFee =
              asset.amount - fee.amount > 0n ? asset.amount - fee.amount : 0n;

            return [
              [
                asset.getAssetId(),
                asset.isSame(fee) ? amountWithoutFee : asset.amount,
              ],
              [fee.getAssetId(), fee.amount],
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
