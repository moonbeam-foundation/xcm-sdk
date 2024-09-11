// import { MoonChain } from '@moonbeam-network/xcm-config';
// import { Keyring } from '@polkadot/api';
// import { assert } from '@polkadot/util';
// // import { KeyringPair } from '@polkadot/keyring/types';
// // import { cryptoWaitReady } from '@polkadot/util-crypto';
// import { ethers, Wallet } from 'ethers';

// const keyring = new Keyring({ type: 'sr25519' });

// let wallet: Wallet;
// let keyringPair: KeyringPair;

// export function getEthersWalletSigner(chain: MoonChain): Wallet {
//   if (wallet) {
//     return wallet;
//   }

//   const { TESTS_MOONBEAM_PRIVATE_KEY } = process.env;

//   assert(
//     TESTS_MOONBEAM_PRIVATE_KEY,
//     'Please provide a private key of Moonbeam account as environment variable TESTS_MOONBEAM_PRIVATE_KEY',
//   );

//   const provider = new ethers.providers.WebSocketProvider(chain.ws, {
//     name: chain.name,
//     chainId: chain.chainId,
//   });

//   wallet = new ethers.Wallet(TESTS_MOONBEAM_PRIVATE_KEY, provider);

//   return wallet;
// }

// export async function getPolkadotKeyringPair(): Promise<KeyringPair> {
//   if (keyringPair) {
//     return keyringPair;
//   }

//   const { TESTS_POLKADOT_SURI } = process.env;

//   assert(
//     TESTS_POLKADOT_SURI,
//     'Please provide a seed phrase of Polkadot account as environment variable TESTS_POLKADOT_SURI',
//   );

//   await cryptoWaitReady();

//   return keyring.createFromUri(TESTS_POLKADOT_SURI);
// }
