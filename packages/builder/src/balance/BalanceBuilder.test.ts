import { describe, expect, it } from 'vitest';

import { TypeRegistry, U128 } from '@polkadot/types';
import type {
  FrameSystemAccountInfo,
  PalletBalancesAccountData,
} from '@polkadot/types/lookup';
import { testChainAsset } from '../../fixtures';
import type { SubstrateQueryConfig } from '../types/substrate/SubstrateQueryConfig';
import {
  BalanceBuilder,
  calculateSystemAccountBalance,
} from './BalanceBuilder';
import type { PalletBalancesAccountDataOld } from './BalanceBuilder.interfaces';

function balanceOf(number: number | string): U128 {
  return new U128(new TypeRegistry(), number);
}

/**
 * Using snapshot to test bigint values because jest does not support bigint
 */

describe('balanceBuilder', () => {
  const address = '<ADDRESS>';
  const asset = testChainAsset;

  describe('assets', () => {
    describe('account', () => {
      const config = BalanceBuilder()
        .substrate()
        .assets()
        .account()
        .build({ address, asset }) as SubstrateQueryConfig;

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

  describe('foreignAssets', () => {
    describe('account', () => {
      const config = BalanceBuilder()
        .substrate()
        .foreignAssets()
        .account()
        .build({
          address,
          asset,
        }) as SubstrateQueryConfig;

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
        .build({ address, asset }) as SubstrateQueryConfig;

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly with frozen balance', async () => {
        await expect(
          config.transform({
            data: {
              free: balanceOf(999),
              frozen: balanceOf(99),
              reserved: balanceOf(0),
            },
          }),
        ).resolves.toMatchSnapshot();
      });

      it('should transform correctly with reserved balance', async () => {
        await expect(
          config.transform({
            data: {
              free: balanceOf(999),
              frozen: balanceOf(99),
              reserved: balanceOf(99),
            },
          }),
        ).resolves.toMatchSnapshot();
      });

      it('should transform correctly with miscFrozen balance', async () => {
        await expect(
          config.transform({
            data: {
              free: balanceOf(999),
              miscFrozen: balanceOf(99),
              reserved: balanceOf(0),
            },
          }),
        ).resolves.toMatchSnapshot();
      });
    });

    describe('accountEquilibrium', () => {
      const config = BalanceBuilder()
        .substrate()
        .system()
        .accountEquilibrium()
        .build({
          address,
          asset: testChainAsset.copyWith({
            ids: {
              balanceId: 25969,
            },
          }),
        }) as SubstrateQueryConfig;

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
        .build({ address, asset }) as SubstrateQueryConfig;

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', async () => {
        await expect(
          config.transform({
            free: balanceOf(999),
            frozen: balanceOf(99),
            reserved: balanceOf(0),
          }),
        ).resolves.toMatchSnapshot();
      });
    });
  });

  describe('calculateSystemAccountBalance', () => {
    it('should correctly calculate balance with PalletBalancesAccountData', async () => {
      const response = {
        data: {
          flags: balanceOf(0),
          free: balanceOf(1000),
          frozen: balanceOf(300),
          reserved: balanceOf(200),
        } as PalletBalancesAccountData,
      } as FrameSystemAccountInfo;

      const result = await calculateSystemAccountBalance(response);
      expect(result).toBe(BigInt(900));
    });

    it('should correctly calculate balance with PalletBalancesAccountDataOld', async () => {
      const response = {
        data: {
          feeFrozen: balanceOf(0),
          free: balanceOf(1000),
          miscFrozen: balanceOf(300),
          reserved: balanceOf(200),
        } as PalletBalancesAccountDataOld,
      } as unknown as FrameSystemAccountInfo;

      const result = await calculateSystemAccountBalance(response);
      expect(result).toBe(BigInt(900));
    });

    it('should handle when reserved is greater than frozen', async () => {
      const response = {
        data: {
          flags: balanceOf(0),
          free: balanceOf(1000),
          frozen: balanceOf(300),
          reserved: balanceOf(400),
        } as PalletBalancesAccountData,
      } as FrameSystemAccountInfo;

      const result = await calculateSystemAccountBalance(response);
      expect(result).toBe(BigInt(1000));
    });

    it('should return 0 when all balances are zero', async () => {
      const response = {
        data: {
          flags: balanceOf(0),
          free: balanceOf(0),
          frozen: balanceOf(0),
          reserved: balanceOf(0),
        } as PalletBalancesAccountData,
      } as FrameSystemAccountInfo;

      const result = await calculateSystemAccountBalance(response);
      expect(result).toBe(BigInt(0));
    });

    it('should handle large numbers correctly', async () => {
      const largeNumber = '123456789012345678901234567890';
      const response = {
        data: {
          flags: balanceOf(0),
          free: balanceOf(largeNumber),
          frozen: balanceOf(largeNumber),
          reserved: balanceOf(100),
        } as PalletBalancesAccountData,
      } as FrameSystemAccountInfo;

      const result = await calculateSystemAccountBalance(response);
      expect(result).toBe(
        BigInt(largeNumber) - (BigInt(largeNumber) - BigInt(100)),
      );
    });
  });
});
