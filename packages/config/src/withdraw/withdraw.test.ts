import { createWithdrawBuilder } from './withdraw';

describe('withdraw', () => {
  const withdraw = createWithdrawBuilder();

  describe('xTokens', () => {
    const cfg = withdraw.xTokens({
      balance: '<BALANCE>' as any,
      destination: { parachainId: 100 } as any,
      feePerWeight: 8,
    });

    it('should be correct withdraw config', () => {
      expect(cfg).toMatchSnapshot();
    });
    describe('substrate account', () => {
      const account = '5GWpSdqkkKGZmdKQ9nkSF7TmHp6JWt28BMGQNuG4MXtSvq3e';

      it('should get params with parachain id', () => {
        expect(cfg.getParams(account, false)).toMatchSnapshot();
      });

      it('should get params without parachain id', () => {
        const cfg2 = withdraw.xTokens({
          balance: '<BALANCE>' as any,
          destination: {} as any,
          feePerWeight: 8,
        });

        expect(cfg2.getParams(account, false)).toMatchSnapshot();
      });
    });

    describe('eth account', () => {
      const account = '0xeF46c7649270C912704fB09B75097f6E32208b85';

      it('should get params with parachain id', () => {
        expect(cfg.getParams(account, true)).toMatchSnapshot();
      });

      it('should get params without parachain id', () => {
        const cfg2 = withdraw.xTokens({
          balance: '<BALANCE>' as any,
          destination: {} as any,
          feePerWeight: 8,
        });

        expect(cfg2.getParams(account, true)).toMatchSnapshot();
      });
    });
  });
});
