import { MoonChainKey } from '../../constants';
import { MoonChain } from '../../interfaces';
import { eqBalances } from './eqBalances';
import { EqBalancesFee, EqBalancesSuccessEvent } from './eqBalances.constants';

describe('eqBalances', () => {
  const amount = 1000n;
  const account = '0xeF46c7649270C912704fB09B75097f6E32208b85';
  const eqId = 25_969;
  const chain: MoonChain = {
    key: MoonChainKey.MoonbaseAlpha,
    name: 'Moonbase Alpha',
    ws: 'wss://wss.api.moonbase.moonbeam.network',
    parachainId: 1000,
    decimals: 10,
    chainId: 1287,
    unitsPerSecond: 100n,
  };

  const extrinsic = eqBalances(chain);

  describe('xcmTransfer', () => {
    const cfg = extrinsic
      .xcmTransfer()
      .successEvent(EqBalancesSuccessEvent.ExtrinsicSuccess)
      .asset(eqId)
      .fee(EqBalancesFee.SovereignAccWillPay);

    it('should be correct config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(cfg.getParams({ account, amount })).toMatchSnapshot();
    });
  });
});
