import { Chain, MoonChain } from '../../constants';
import { polkadotXcm } from './polkadotXcm';
import { PolkadotXcmExtrinsicSuccessEvent } from './polkadotXcm.constants';

describe('polkadotXcm', () => {
  const amount = 1000n;
  const account = '0xeF46c7649270C912704fB09B75097f6E32208b85';
  const chain = {
    chain: MoonChain.MoonbaseAlpha,
    name: 'Moonbase Alpha',
    ws: 'wss://wss.api.moonbase.moonbeam.network',
    parachainId: 1000,
  };
  const origin = {
    chain: Chain.AlphanetRelay,
    name: 'Alphanet Relay',
    ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
    parachainId: 0,
  };
  const extrinsic = polkadotXcm(chain);

  describe('limitedReserveTransferAssets', () => {
    describe('v0', () => {
      const cfg = extrinsic
        .limitedReserveTransferAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(origin)
        .V0();

      it('should be correct config', () => {
        expect(cfg).toMatchSnapshot();
      });

      it('should get correct params', () => {
        expect(cfg.getParams(account, amount)).toMatchSnapshot();
      });
    });

    describe('v1', () => {});
  });

  describe('limitedReserveWithdrawAssets', () => {});
});
