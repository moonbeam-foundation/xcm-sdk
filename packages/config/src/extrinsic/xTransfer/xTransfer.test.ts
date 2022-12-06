import { ChainKey, MoonChainKey } from '../../constants';
import { Chain, MoonChain } from '../../interfaces';
import { xTransfer } from './xTransfer';
import { XTransferExtrinsicSuccessEvent } from './xTransfer.constants';

describe('xTransfer', () => {
  const amount = 1000n;
  const account = '0xeF46c7649270C912704fB09B75097f6E32208b85';
  const chain: MoonChain = {
    key: MoonChainKey.MoonbaseAlpha,
    name: 'Moonbase Alpha',
    ws: 'wss://wss.api.moonbase.moonbeam.network',
    parachainId: 1000,
    decimals: 10,
    chainId: 1287,
    unitsPerSecond: 100n,
  };
  const origin: Chain = {
    key: ChainKey.AlphanetRelay,
    name: 'Alphanet Relay',
    ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
    parachainId: 0,
  };
  const extrinsic = xTransfer(chain);

  describe('transfer', () => {
    describe('here', () => {
      const cfg = extrinsic
        .transfer()
        .successEvent(XTransferExtrinsicSuccessEvent.Deposited)
        .origin(origin)
        .here();

      it('should be correct config', () => {
        expect(cfg).toMatchSnapshot();
      });

      it('should get correct params', () => {
        expect(cfg.getParams({ account, amount })).toMatchSnapshot();
      });
    });

    describe('x2', () => {
      const cfg = extrinsic
        .transfer()
        .successEvent(XTransferExtrinsicSuccessEvent.Deposited)
        .origin(origin)
        .X2(99);

      it('should be correct config', () => {
        expect(cfg).toMatchSnapshot();
      });

      it('should get correct params', () => {
        expect(cfg.getParams({ account, amount })).toMatchSnapshot();
      });
    });
  });
});
