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
import type { EvmSigner } from '../../packages/sdk/build';

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
  const isAutomatic = false;

  // await fromFantomToPeaq(agng, 10, isAutomatic);
  // await fromFantomToMoonbase(dev, 1.23, isAutomatic);
  // await fromMoonbaseToFantom(ftmwh, 0.01, isAutomatic);
  // await fromPeaqToFantom(ftmwh, 0.0121, isAutomatic);
  // await fromPeaqEvmToFantom(ftmwh, 1.5, isAutomatic);

  await redeemInMoonbaseAlpha();
  // await redeemInFantomTestnet();
}

async function redeemInMoonbaseAlpha() {
  const txId =
    '0x59e70ad73c57bce44cbb3e3308fc6a31d29ff0dcbb2957055b05025969545bed';
  const walletClient = createWalletClient({
    account,
    chain: moonbaseAlphaViem,
    transport: http(),
  });

  const data = await Mrl().getRedeemData({ txId, chain: moonbaseAlpha });
  console.log('data', data);

  await data.redeem(walletClient as EvmSigner);
}

async function redeemInFantomTestnet() {
  const txId =
    '0xa0032ff270885f7278a42d4d974fceab9e4feb039263db35b09beafe57bd6683';
  const walletClient = createWalletClient({
    account,
    chain: fantomTestnet.getViemChain(),
    transport: http(),
  });

  const data = await Mrl().getRedeemData({ txId, chain: fantomTestnet });
  console.log('data', data);

  await data.redeem(walletClient as EvmSigner);
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
    evmSigner: walletClient as EvmSigner,
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

  const hash = await data.transfer(amount, isAutomatic, {
    polkadotSigner: pair,
    evmSigner: walletClient as EvmSigner,
  });
  console.log('hash', hash);
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
    evmSigner: walletClient as EvmSigner,
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

  await data.transfer(amount, isAutomatic, {
    evmSigner: walletClient as EvmSigner,
  });
}
