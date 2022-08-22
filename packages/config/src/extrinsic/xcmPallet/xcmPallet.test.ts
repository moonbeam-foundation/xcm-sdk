import { Chain, MoonChain } from '../../constants';
import { ChainConfig, MoonChainConfig } from '../../interfaces';
import { PolkadotXcmExtrinsicSuccessEvent } from '../polkadotXcm';
import { xcmPallet } from './xcmPallet';

describe('xcmPallet', () => {
  const amount = 1000n;
  const account = '0xeF46c7649270C912704fB09B75097f6E32208b85';
  const chain: MoonChainConfig = {
    chain: MoonChain.MoonbaseAlpha,
    name: 'Moonbase Alpha',
    ws: 'wss://wss.api.moonbase.moonbeam.network',
    parachainId: 1000,
    decimals: 10,
    unitsPerSecond: 100n,
  };
  const origin: ChainConfig = {
    chain: Chain.AlphanetRelay,
    name: 'Alphanet Relay',
    ws: 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network',
    weight: 1_000_000_000,
    parachainId: 0,
  };
  const extrinsic = xcmPallet(chain);

  describe('limitedReserveTransferAssets', () => {
    const cfg = extrinsic
      .limitedReserveTransferAssets()
      .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
      .origin(origin);

    it('should be correct config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(cfg.getParams(account, amount)).toMatchSnapshot();
    });
  });
});
