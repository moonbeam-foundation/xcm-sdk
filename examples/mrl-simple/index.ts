import { Mrl } from '@moonbeam-network/mrl';
import {
  fantomTestnet,
  ftmwh,
  moonbeam,
  peaqChain,
  polkadot,
} from '@moonbeam-network/xcm-config';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { Address, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

// disable unnecessary warning logs
console.warn = () => null;
console.clear();

const { EVM_PRIVATE_KEY, POLKADOT_PRIVATE_KEY } = process.env;

if (!EVM_PRIVATE_KEY || !POLKADOT_PRIVATE_KEY) {
  throw new Error(
    'Env variables EVM_PRIVATE_KEY and POLKADOT_PRIVATE_KEY must be defined',
  );
}

// EVM Signer ===========================================================

const account = privateKeyToAccount(EVM_PRIVATE_KEY as Address);
const walletClient = createWalletClient({
  account,
  chain: moonbeam.getViemChain(),
  transport: http(),
});

console.log(`\nEVM address: ${account.address}`);

// Polkadot Signer ===========================================================

await cryptoWaitReady();
const keyring = new Keyring({
  ss58Format: polkadot.ss58Format,
  type: 'sr25519',
});
const pair = keyring.createFromUri(POLKADOT_PRIVATE_KEY);

console.log(`Substrate address: ${pair.address}`);

// ===========================================================================

main()
  .then(() => console.log('done!'))
  .catch(console.error)
  .finally(() => process.exit());

async function main() {
  const data = await Mrl()
    .setSource(fantomTestnet)
    .setDestination(peaqChain)
    .setAsset(ftmwh)
    .setAddresses(account.address, pair.address);

  console.log(data);
}
