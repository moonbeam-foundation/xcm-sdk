import { TypeRegistry, U128 } from '@polkadot/types';
import { BalanceBuilder } from './BalanceBuilder';

function balanceOf(number: number | string): U128 {
  return new U128(new TypeRegistry(), number);
}

describe('balanceBuilder', () => {
  const account = '<ACCOUNT>';
  const asset = '<ASSET>';

  describe('assets', () => {
    describe('account', () => {
      const config = BalanceBuilder()
        .assets()
        .account()
        .build({ account, asset });

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', () => {
        expect(config.transform({ balance: balanceOf(999) })).toBe(999n);
      });
    });
  });

  describe('ormlTokens', () => {
    describe('accounts', () => {
      const config = BalanceBuilder()
        .ormlTokens()
        .accounts()
        .build({ account, asset });

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', () => {
        expect(
          config.transform({ free: balanceOf(999), frozen: balanceOf(99) }),
        ).toBe(900n);
      });
    });
  });

  describe('system', () => {
    describe('account', () => {
      const config = BalanceBuilder()
        .system()
        .account()
        .build({ account, asset });

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly with frozen balance', () => {
        expect(
          config.transform({
            data: { free: balanceOf(999), frozen: balanceOf(99) },
          }),
        ).toBe(900n);
      });

      it('should transform correctly with miscFrozen balance', () => {
        expect(
          config.transform({
            data: { free: balanceOf(999), miscFrozen: balanceOf(99) },
          }),
        ).toBe(900n);
      });
    });

    describe('accountEquilibrium', () => {
      const config = BalanceBuilder()
        .system()
        .accountEquilibrium()
        .build({ account, asset: 25969 });

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should return 0 if response empty', () => {
        expect(
          config.transform({
            data: {
              isEmpty: true,
            },
          }),
        ).toBe(0n);
      });

      it('should transform v0 correctly', () => {
        expect(
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
        ).toBe(2954852364913n);
      });

      it('should transform correctly if not v0', () => {
        expect(
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
        ).toBe(62730076931n);
      });
    });
  });

  describe('tokens', () => {
    describe('accounts', () => {
      it('should be correct foreignAsset config', () => {
        const config = BalanceBuilder()
          .tokens()
          .accounts()
          .foreignAsset()
          .build({ account, asset });

        expect(config).toMatchSnapshot();
      });

      it('should be correct fungibleToken config', () => {
        const config = BalanceBuilder()
          .tokens()
          .accounts()
          .fungibleToken()
          .build({ account, asset });

        expect(config).toMatchSnapshot();
      });

      it('should be correct miningResource config', () => {
        const config = BalanceBuilder()
          .tokens()
          .accounts()
          .miningResource()
          .build({ account, asset });

        expect(config).toMatchSnapshot();
      });

      it('should be correct token config', () => {
        const config = BalanceBuilder()
          .tokens()
          .accounts()
          .token()
          .build({ account, asset });

        expect(config).toMatchSnapshot();
      });

      it('should be correct token2 config', () => {
        const config = BalanceBuilder()
          .tokens()
          .accounts()
          .token2()
          .build({ account, asset });

        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', () => {
        const config = BalanceBuilder()
          .tokens()
          .accounts()
          .foreignAsset()
          .build({ account, asset });

        expect(
          config.transform({ free: balanceOf(999), frozen: balanceOf(99) }),
        ).toBe(900n);
      });
    });
  });
});
