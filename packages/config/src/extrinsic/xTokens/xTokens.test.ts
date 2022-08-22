import { Asset, Chain, MoonChain } from '../../constants';
import { ChainConfig, MoonChainConfig } from '../../interfaces';
import { xTokens } from './xTokens';
import { XTokensExtrinsicSuccessEvent } from './xTokens.constants';

describe('xTokens', () => {
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
  const asset = {
    id: '16797826370226091782818345603793389938',
    erc20Id: '0xffffffff0ca324c842330521525e7de111f38972',
    originSymbol: Asset.ASTR,
  };
  const extrinsic = xTokens(chain);

  describe('transfer', () => {
    const cfg = extrinsic
      .transfer()
      .successEvent(XTokensExtrinsicSuccessEvent.Transferred)
      .origin(origin)
      .asset({ Token: 'MOVR' });

    it('should be correct config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(cfg.getParams(account, amount)).toMatchSnapshot();
    });
  });

  describe('transferMultiAsset', () => {
    const cfg = extrinsic
      .transferMultiAsset()
      .successEvent(XTokensExtrinsicSuccessEvent.Transferred)
      .origin(origin)
      .asset(asset);

    it('should be correct config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(cfg.getParams(account, amount)).toMatchSnapshot();
    });
  });

  describe('transferMultiCurrencies', () => {
    const cfg = extrinsic
      .transferMultiCurrencies()
      .successEvent(XTokensExtrinsicSuccessEvent.Transferred)
      .origin(origin)
      .assets(asset, asset);

    it('should be correct config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(cfg.getParams(account, amount, 99n)).toMatchSnapshot();
    });
  });
});
