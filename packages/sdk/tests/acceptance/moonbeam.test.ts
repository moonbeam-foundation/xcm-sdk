import { MoonbeamAssets } from '@moonbeam-network/xcm-config';
import { KeyringPair } from '@polkadot/keyring/types';
import { Wallet } from 'ethers';
import { init } from '../../src';
import { getEthersWalletSigner, getPolkadotKeyringPair } from '../utils/auth';

describe('moonbeam acceptance', () => {
  jest.setTimeout(30000);

  const { moonbeam } = init();
  const assets = Object.keys(moonbeam.assets) as MoonbeamAssets[];
  // to hide polkadot unnecessary warnings
  const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();

  let ethersSigner: Wallet;
  let keyringPair: KeyringPair;

  beforeAll(async () => {
    ethersSigner = getEthersWalletSigner(moonbeam.moonChain);
    keyringPair = await getPolkadotKeyringPair();
  });

  afterAll(() => consoleWarnMock.mockRestore());

  describe.each(assets)('asset %s', (asset) => {
    const { chains: fromChains, from } = moonbeam.deposit(asset);
    const { chains: toChains, to } = moonbeam.withdraw(asset);

    describe.each(fromChains)('deposit from $key', (chain) => {
      it('should deposit', async () => {
        const data = await from(chain.key).get(
          ethersSigner.address,
          keyringPair,
        );

        expect(data).toBeTruthy();
      });
    });

    describe.each(toChains)('withdraw to $key', (chain) => {
      it('should withdraw', async () => {
        const data = await to(chain.key).get(keyringPair.address, {
          ethersSigner,
        });

        expect(data).toBeTruthy();
      });
    });
  });
});
