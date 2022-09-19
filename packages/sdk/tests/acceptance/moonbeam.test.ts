import { MoonbeamAssets } from '@moonbeam-network/xcm-config';
import { init } from '../../src';

// TODO: get from seed and private key?
const moonbeamAddress = '0xeF46c7649270C912704fB09B75097f6E32208b85';
const substrateAddress = '5DG5Fn3ww3KPza1RLoap6QJNzQfEvRebxypDGp35YuMX5y2K';

function getMoonbeam() {
  const { moonbeam } = init();

  return moonbeam;
}

describe('moonbeam acceptance', () => {
  const moonbeam = getMoonbeam();
  const assets = Object.keys(moonbeam.assets) as MoonbeamAssets[];

  describe.each(assets)('asset %s', (asset) => {
    const { chains: fromChains, from } = moonbeam.deposit(asset);
    const { chains: toChains, to } = moonbeam.withdraw(asset);

    describe.each(fromChains)('deposit from $key', (chain) => {
      it('should deposit', async () => {
        const data = await from(chain.key).get(
          moonbeamAddress,
          substrateAddress,
        );

        expect(data).toBeTruthy();
      });
    });

    describe.each(toChains)('withdraw to $key', (chain) => {
      it('should withdraw', async () => {
        const data = await to(chain.key).get(substrateAddress);

        expect(data).toBeTruthy();
      });
    });
  });
});
