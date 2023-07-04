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
import _ from 'lodash';
import { ExtrinsicStatus, init } from '../../src';
import { getEthersWalletSigner, getPolkadotKeyringPair } from '../utils/auth';
import { itIf } from '../utils/itIf';

const CONFIG = {
  [MoonChainKey.Moonbeam]: {
    [AssetSymbol.IBTC]: {
      deposit: { [ChainKey.Interlay]: true },
      withdraw: { [ChainKey.Interlay]: true },
    },
    [AssetSymbol.USDT]: {
      deposit: { [ChainKey.polkadotAssetHub]: true },
      withdraw: { [ChainKey.polkadotAssetHub]: true },
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
          const skip: boolean | undefined = _.get(CONFIG, [
            sdk.moonChain.key,
            symbol,
            'deposit',
            chain.key,
          ]);

          itIf(!skip)('should deposit', (done) => {
            from(chain)
              .get(ethersSigner.address, keyringPair)
              .then(({ min, send }) => {
                const hash = send(min, (event) => {
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
          const skip: boolean | undefined = _.get(CONFIG, [
            sdk.moonChain.key,
            symbol,
            'withdraw',
            chain.key,
          ]);

          itIf(!skip)('should withdraw', (done) => {
            to(chain)
              .get(keyringPair.address, {
                ethersSigner,
              })
              .then(({ min, send }) => {
                const hash = send(min, (event) => {
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
