/* eslint-disable jest/no-standalone-expect */
/* eslint-disable jest/require-hook */
import {
  AssetSymbol,
  ChainKey,
  MoonChainKey,
} from '@moonbeam-network/xcm-config';
import { KeyringPair } from '@polkadot/keyring/types';
import { Wallet } from 'ethers';
import { init } from '../../src';
import { getEthersWalletSigner, getPolkadotKeyringPair } from '../utils/auth';
import { itIf } from '../utils/itIf';

const CONFIG = {
  [MoonChainKey.Moonbeam]: {
    [AssetSymbol.ACA]: {
      deposit: { [ChainKey.Acala]: 0n },
      withdraw: { [ChainKey.Acala]: 0n },
    },
    [AssetSymbol.ASTR]: {
      deposit: { [ChainKey.Astar]: 0n },
      withdraw: { [ChainKey.Astar]: 0n },
    },
    [AssetSymbol.AUSD]: {
      deposit: { [ChainKey.Acala]: 0n },
      withdraw: { [ChainKey.Acala]: 0n },
    },
    [AssetSymbol.DOT]: {
      deposit: { [ChainKey.Polkadot]: 0n },
      withdraw: { [ChainKey.Polkadot]: 0n },
    },
    [AssetSymbol.GLMR]: {
      deposit: { [ChainKey.Acala]: 0n },
      withdraw: { [ChainKey.Acala]: 0n },
    },
    [AssetSymbol.IBTC]: {
      deposit: { [ChainKey.Interlay]: 0n },
      withdraw: { [ChainKey.Interlay]: 0n },
    },
    [AssetSymbol.INTR]: {
      deposit: { [ChainKey.Interlay]: 0n },
      withdraw: { [ChainKey.Interlay]: 0n },
    },
    [AssetSymbol.PARA]: {
      deposit: { [ChainKey.Parallel]: 0n },
      withdraw: { [ChainKey.Parallel]: 0n },
    },
    [AssetSymbol.PHA]: {
      deposit: { [ChainKey.Phala]: 0n },
      withdraw: { [ChainKey.Phala]: 0n },
    },
    [AssetSymbol.USDT]: {
      deposit: { [ChainKey.Statemint]: 0n },
      withdraw: { [ChainKey.Statemint]: 0n },
    },
  },
};

// eslint-disable-next-line no-console
console.log('CONFIG', CONFIG);

describe('sdk', () => {
  jest.setTimeout(5 * 60 * 1000);

  const { moonbeam } = init();
  // to hide polkadot unnecessary warnings
  const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();

  let ethersSigner: Wallet;
  let keyringPair: KeyringPair;

  beforeAll(async () => {
    ethersSigner = getEthersWalletSigner(moonbeam.moonChain);
    keyringPair = await getPolkadotKeyringPair();
  });

  afterAll(() => consoleWarnMock.mockRestore());

  describe.each([moonbeam])('on $moonChain.name', (sdk) => {
    describe.each(sdk.symbols)('%s', (symbol) => {
      const { chains: fromChains, from } = moonbeam.deposit(symbol);
      const { chains: toChains, to } = moonbeam.withdraw(symbol);
      describe.each(fromChains)('deposit from $key', (chain) => {
        itIf(true)('should deposit', async () => {
          const data = await from(chain).get(ethersSigner.address, keyringPair);
          expect(data).toBeTruthy();
        });
      });

      describe.each(toChains)('withdraw to $key', (chain) => {
        itIf(true)('should withdraw', async () => {
          const data = await to(chain).get(keyringPair.address, {
            ethersSigner,
          });

          expect(data).toBeTruthy();
        });
      });
    });
  });
});
