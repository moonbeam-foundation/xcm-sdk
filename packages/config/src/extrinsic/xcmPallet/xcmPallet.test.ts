import { ChainKey, MoonChainKey } from '../../constants';
import { Chain, MoonChain } from '../../interfaces';
import { PolkadotXcmExtrinsicSuccessEvent } from '../polkadotXcm';
import { xcmPallet } from './xcmPallet';

describe('xcmPallet', () => {
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
    ss58Format: 42,
    genesisHash:
      '0xe1ea3ab1d46ba8f4898b6b4b9c54ffc05282d299f89e84bd0fd08067758c9443',
  };
  const extrinsic = xcmPallet(chain);

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
        expect(cfg.getParams({ account, amount })).toMatchSnapshot();
      });
    });

    describe('v2', () => {
      const cfg = extrinsic
        .limitedReserveTransferAssets()
        .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
        .origin(origin)
        .V2();

      it('should be correct config', () => {
        expect(cfg).toMatchSnapshot();
      });

      it('should get correct params', () => {
        expect(cfg.getParams({ account, amount })).toMatchSnapshot();
      });
    });
  });
});
