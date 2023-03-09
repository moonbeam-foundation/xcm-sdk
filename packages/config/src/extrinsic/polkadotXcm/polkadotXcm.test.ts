import { MoonChainKey } from '../../constants';
import { MoonChain } from '../../interfaces';
import { polkadotXcm } from './polkadotXcm';
import { PolkadotXcmExtrinsicSuccessEvent } from './polkadotXcm.constants';

describe('polkadotXcm', () => {
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
  const extrinsic = polkadotXcm(chain);

  describe('limitedReserveTransferAssets', () => {
    describe('v1v2', () => {
      describe('here', () => {
        const cfg = extrinsic
          .limitedReserveTransferAssets()
          .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
          .V1V2()
          .here();

        it('should be correct config', () => {
          expect(cfg).toMatchSnapshot();
        });

        it('should get correct params', () => {
          expect(cfg.getParams({ account, amount })).toMatchSnapshot();
        });
      });

      describe('x1', () => {
        const cfg = extrinsic
          .limitedReserveTransferAssets()
          .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
          .V1V2()
          .X1();

        it('should be correct config', () => {
          expect(cfg).toMatchSnapshot();
        });

        it('should get correct params', () => {
          expect(cfg.getParams({ account, amount })).toMatchSnapshot();
        });
      });

      describe('x2', () => {
        const cfg = extrinsic
          .limitedReserveTransferAssets()
          .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
          .V1V2()
          .X2(10, 50);

        it('should be correct config', () => {
          expect(cfg).toMatchSnapshot();
        });

        it('should get correct params', () => {
          expect(cfg.getParams({ account, amount })).toMatchSnapshot();
        });
      });
    });
  });

  describe('limitedReserveWithdrawAssets', () => {
    describe('v1v2', () => {
      describe('x2', () => {
        const cfg = extrinsic
          .limitedReserveWithdrawAssets()
          .successEvent(PolkadotXcmExtrinsicSuccessEvent.Attempted)
          .V1V2()
          .X2(10);

        it('should be correct config', () => {
          expect(cfg).toMatchSnapshot();
        });

        it('should get correct params', () => {
          expect(cfg.getParams({ account, amount })).toMatchSnapshot();
        });
      });
    });
  });
});
