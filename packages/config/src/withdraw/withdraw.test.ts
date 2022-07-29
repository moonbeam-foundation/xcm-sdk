import { createWithdrawBuilder } from './withdraw';

describe('withdraw', () => {
  const account = '0xeF46c7649270C912704fB09B75097f6E32208b85';
  const withdraw = createWithdrawBuilder();

  describe('xTokens', () => {
    const cfg = withdraw.xTokens({
      balance: '<BALANCE>' as any,
      destination: { parachainId: 1000 } as any,
      existentialDeposit: 100_000_000_000,
      feePerWeight: 8,
    });

    it('should be correct withdraw config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get params with parachain id', () => {
      expect(cfg.getParams(account)).toMatchSnapshot();
    });

    it('should get params without parachain id', () => {
      const cfg2 = withdraw.xTokens({
        balance: '<BALANCE>' as any,
        destination: {} as any,
        existentialDeposit: 100_000_000_000,
        feePerWeight: 8,
      });

      expect(cfg2.getParams(account)).toMatchSnapshot();
    });
  });
});
