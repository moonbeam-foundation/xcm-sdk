import { MoonChain } from '@moonbeam-network/xcm-config';
import { Keyring } from '@polkadot/api';
import { assert } from '@polkadot/util';
import { ethers } from 'ethers';

const keyring = new Keyring({ type: 'sr25519' });

export function getEthersWalletSigner(chain: MoonChain) {
  const { TESTS_MOONBEAM_ACCOUNT_PRIVATE_KEY } = process.env;

  assert(
    TESTS_MOONBEAM_ACCOUNT_PRIVATE_KEY,
    'Please provide a private key of Moonbeam account as environment variable TESTS_MOONBEAM_ACCOUNT_PRIVATE_KEY',
  );

  const provider = new ethers.providers.WebSocketProvider(chain.ws, {
    name: chain.name,
    chainId: chain.chainId,
  });

  return new ethers.Wallet(TESTS_MOONBEAM_ACCOUNT_PRIVATE_KEY, provider);
}

export function getPolkadotKeyringPair() {
  const { TESTS_POLKADOT_ACCOUNT_SEED } = process.env;

  assert(
    TESTS_POLKADOT_ACCOUNT_SEED,
    'Please provide a seed phrase of Polkadot account as environment variable TESTS_POLKADOT_ACCOUNT_SEED',
  );

  return keyring.createFromUri(TESTS_POLKADOT_ACCOUNT_SEED);
}
