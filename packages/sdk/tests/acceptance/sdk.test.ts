/* eslint-disable jest/max-expects */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jest/no-standalone-expect */
/* eslint-disable jest/require-hook */
import {
  AssetSymbol,
  ChainKey,
  MoonChainKey,
} from '@moonbeam-network/xcm-config';
import { KeyringPair } from '@polkadot/keyring/types';
import { Wallet } from 'ethers';
import { get } from 'lodash';
import { ExtrinsicStatus, init } from '../../src';
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
      deposit: { [ChainKey.Interlay]: 57525733900n },
      withdraw: { [ChainKey.Interlay]: 53529278900n },
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

describe('sdk', () => {
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
      const { chains: fromChains, from } = sdk.deposit(symbol);
      const { chains: toChains, to } = sdk.withdraw(symbol);

      fromChains.length &&
        describe.each(fromChains)('deposit from $key', (chain) => {
          const amount: bigint | undefined = get(CONFIG, [
            sdk.moonChain.key,
            symbol,
            'deposit',
            chain.key,
          ]);

          itIf(!!amount)('should deposit', (done) => {
            from(chain)
              .get(ethersSigner.address, keyringPair)
              .then(({ send }) => {
                const hash = send(amount!, (event) => {
                  expect(event.status).not.toBe(ExtrinsicStatus.Failed);

                  if (event.status === ExtrinsicStatus.Success) {
                    expect(event.txHash).toBeDefined();
                    expect(event.blockHash).toBeDefined();
                    done();
                  }
                });

                expect(hash).toBeDefined();
              });
          });
        });

      toChains.length &&
        describe.each(toChains)('withdraw to $key', (chain) => {
          const amount: bigint | undefined = get(CONFIG, [
            sdk.moonChain.key,
            symbol,
            'withdraw',
            chain.key,
          ]);

          itIf(!!amount)('should withdraw', (done) => {
            to(chain)
              .get(keyringPair.address, {
                ethersSigner,
              })
              .then(({ send }) => {
                const hash = send(amount!, (event) => {
                  expect(event.status).not.toBe(ExtrinsicStatus.Failed);

                  if (event.status === ExtrinsicStatus.Success) {
                    expect(event.txHash).toBeDefined();
                    expect(event.blockHash).toBeDefined();
                    done();
                  }
                });

                expect(hash).toBeDefined();
              });
          });
        });
    });
  });
});
