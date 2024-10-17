import { Mrl } from '@moonbeam-network/mrl';
import {
  agng,
  dev,
  fantomTestnet,
  ftm,
  ftmwh,
  moonbaseAlpha,
  moonbaseBeta,
  peaqAlphanet,
  peaqEvmAlphanet,
} from '@moonbeam-network/xcm-config';
import type { Asset } from '@moonbeam-network/xcm-types';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { http, type Address, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { moonbaseAlpha as moonbaseAlphaViem } from 'viem/chains';

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

console.log(`\nEVM address: ${account.address}`);

// Polkadot Signer ===========================================================

await cryptoWaitReady();
const keyring = new Keyring({
  ss58Format: peaqAlphanet.ss58Format,
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
  const isAutomatic = true;
  // await fromFantomToPeaq(ftm, 0.011, isAutomatic);
  // await fromFantomToMoonbase(ftm, 0.01, isAutomatic);
  // await fromMoonbaseToFantom(ftmwh, 0.01, isAutomatic);
  await fromPeaqToFantom(agng, 20, isAutomatic);
  // await fromPeaqEvmToFantom(ftmwh, 1.5, isAutomatic);
}

async function fromFantomToPeaq(
  asset: Asset,
  amount: number,
  isAutomatic: boolean,
) {
  const walletClient = createWalletClient({
    account,
    chain: fantomTestnet.getViemChain(),
    transport: http(),
  });

  const data = await Mrl()
    .setSource(fantomTestnet)
    .setDestination(peaqAlphanet)
    .setAsset(asset)
    .setAddresses({
      sourceAddress: account.address,
      destinationAddress: pair.address,
    });

  console.log(data);

  await data.transfer(amount, isAutomatic, {
    polkadotSigner: pair,
    evmSigner: walletClient,
  });
}

async function fromFantomToMoonbase(
  asset: Asset,
  amount: number,
  isAutomatic: boolean,
) {
  const walletClient = createWalletClient({
    account,
    chain: fantomTestnet.getViemChain(),
    transport: http(),
  });

  const data = await Mrl()
    .setSource(fantomTestnet)
    .setDestination(moonbaseAlpha)
    .setAsset(asset)
    .setAddresses({
      sourceAddress: account.address,
      destinationAddress: account.address,
    });

  console.log(data);

  await data.transfer(amount, isAutomatic, {
    polkadotSigner: pair,
    evmSigner: walletClient,
  });
}

async function fromMoonbaseToFantom(
  asset: Asset,
  amount: number,
  isAutomatic: boolean,
) {
  const walletClient = createWalletClient({
    account,
    chain: moonbaseAlphaViem,
    transport: http(),
  });
  const data = await Mrl()
    .setSource(moonbaseAlpha)
    .setDestination(fantomTestnet)
    .setAsset(asset)
    .setAddresses({
      sourceAddress: account.address,
      destinationAddress: account.address,
    });

  console.log(data);

  await data.transfer(amount, isAutomatic, {
    polkadotSigner: pair,
    evmSigner: walletClient,
  });
}

async function fromPeaqToFantom(
  asset: Asset,
  amount: number,
  isAutomatic: boolean,
) {
  const data = await Mrl()
    .setSource(peaqAlphanet)
    .setDestination(fantomTestnet)
    .setAsset(asset)
    .setAddresses({
      sourceAddress: pair.address,
      destinationAddress: account.address,
    });

  console.log(data);

  await data.transfer(amount, isAutomatic, {
    polkadotSigner: pair,
  });
}

async function fromPeaqEvmToFantom(
  asset: Asset,
  amount: number,
  isAutomatic: boolean,
) {
  const walletClient = createWalletClient({
    account,
    chain: peaqEvmAlphanet.getViemChain(),
    transport: http(),
  });

  const data = await Mrl()
    .setSource(peaqEvmAlphanet)
    .setDestination(fantomTestnet)
    .setAsset(asset)
    .setAddresses({
      sourceAddress: account.address,
      destinationAddress: account.address,
    });

  console.log(data);

  await data.transfer(amount, isAutomatic, { evmSigner: walletClient });
}
