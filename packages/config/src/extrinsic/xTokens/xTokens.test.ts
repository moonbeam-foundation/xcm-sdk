import { AssetSymbol, ChainKey, MoonChainKey } from '../../constants';
import { Chain, MoonChain } from '../../interfaces';
import { xTokens } from './xTokens';
import {
  XTokensExtrinsicCurrencyTypes,
  XTokensExtrinsicSuccessEvent,
} from './xTokens.constants';

describe('xTokens', () => {
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
  const asset = {
    id: '16797826370226091782818345603793389938',
    erc20Id: '0xffffffff0ca324c842330521525e7de111f38972',
    originSymbol: AssetSymbol.ASTR,
  };
  const extrinsic = xTokens(chain);

  describe('transfer', () => {
    const cfg = extrinsic
      .transfer()
      .successEvent(XTokensExtrinsicSuccessEvent.Transferred)
      .origin(origin)
      .asset({ Token: AssetSymbol.MOVR });

    it('should be correct config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(cfg.getParams({ account, amount })).toMatchSnapshot();
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
      expect(cfg.getParams({ account, amount })).toMatchSnapshot();
    });
  });

  describe('transferMultiCurrencies', () => {
    const cfg = extrinsic
      .transferMultiCurrencies()
      .successEvent(XTokensExtrinsicSuccessEvent.Transferred)
      .origin(origin)
      .assets(
        {
          [XTokensExtrinsicCurrencyTypes.Token]: asset.originSymbol,
        },
        {
          [XTokensExtrinsicCurrencyTypes.Token]: asset.originSymbol,
        },
      );

    it('should be correct config', () => {
      expect(cfg).toMatchSnapshot();
    });

    it('should get correct params', () => {
      expect(cfg.getParams({ account, amount, fee: 99n })).toMatchSnapshot();
    });
  });
});
