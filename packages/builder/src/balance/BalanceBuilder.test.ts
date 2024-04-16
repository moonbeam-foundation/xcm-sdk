import { TypeRegistry, U128 } from '@polkadot/types';
import { describe, expect, it } from '@jest/globals';
import { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';
import { BalanceBuilder } from './BalanceBuilder';

function balanceOf(number: number | string): U128 {
  return new U128(new TypeRegistry(), number);
}

/**
 * Using snapshot to test bigint values because jest does not support bigint
 */

describe('balanceBuilder', () => {
  const account = '<ACCOUNT>';
  const asset = '<ASSET>';

  describe('assets', () => {
    describe('account', () => {
      const config = BalanceBuilder()
        .substrate()
        .assets()
        .account()
        .build({ address: account, asset }) as SubstrateQueryConfig;

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', async () => {
        await expect(
          config.transform({
            unwrapOrDefault: () => ({ balance: balanceOf(999) }),
          }),
        ).resolves.toMatchSnapshot();
      });
    });
  });

  describe('system', () => {
    describe('account', () => {
      const config = BalanceBuilder()
        .substrate()
        .system()
        .account()
        .build({ address: account, asset }) as SubstrateQueryConfig;

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly with frozen balance', async () => {
        await expect(
          config.transform({
            data: { free: balanceOf(999), frozen: balanceOf(99) },
          }),
        ).resolves.toMatchSnapshot();
      });

      it('should transform correctly with miscFrozen balance', async () => {
        await expect(
          config.transform({
            data: { free: balanceOf(999), miscFrozen: balanceOf(99) },
          }),
        ).resolves.toMatchSnapshot();
      });
    });

    describe('accountEquilibrium', () => {
      const config = BalanceBuilder()
        .substrate()
        .system()
        .accountEquilibrium()
        .build({ address: account, asset: 25969 }) as SubstrateQueryConfig;

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should return 0 if response empty', async () => {
        await expect(
          config.transform({
            data: {
              isEmpty: true,
            },
          }),
        ).resolves.toMatchSnapshot();
      });

      it('should transform v0 correctly', async () => {
        await expect(
          config.transform({
            data: {
              isEmpty: false,
              toJSON: () => ({
                v0: {
                  balance: [
                    [
                      25969,
                      {
                        positive: 2954852364913,
                      },
                    ],
                    [
                      6648164,
                      {
                        positive: 18800000000,
                      },
                    ],
                    [
                      1735159154,
                      {
                        positive: 245805795,
                      },
                    ],
                  ],
                  lock: 0,
                },
              }),
            },
          }),
        ).resolves.toMatchSnapshot();
      });

      it('should transform correctly if not v0', async () => {
        await expect(
          config.transform({
            data: {
              isEmpty: false,
              toJSON: () => [
                [
                  25969,
                  {
                    positive: 62730076931,
                  },
                ],
                [
                  1735159154,
                  {
                    positive: 44972367,
                  },
                ],
              ],
            },
          }),
        ).resolves.toMatchSnapshot();
      });
    });
  });

  describe('tokens', () => {
    describe('accounts', () => {
      const config = BalanceBuilder()
        .substrate()
        .tokens()
        .accounts()
        .build({ address: account, asset }) as SubstrateQueryConfig;

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', async () => {
        await expect(
          config.transform({ free: balanceOf(999), frozen: balanceOf(99) }),
        ).resolves.toMatchSnapshot();
      });
    });
  });
});
