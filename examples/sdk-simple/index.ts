/* eslint-disable import/no-extraneous-dependencies */
import { dot, moonbeam, polkadot } from '@moonbeam-network/xcm-config';
import { EvmSigner, Sdk, TransferData } from '@moonbeam-network/xcm-sdk';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ethers } from 'ethers';
import { setTimeout } from 'node:timers/promises';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { moonbeam as moonbeamViem } from 'viem/chains';
// Moonbeam Signer ===========================================================

const moonbeamPrivateKey = '0x...';
const provider = new ethers.WebSocketProvider(moonbeam.ws[0], {
  chainId: moonbeam.id,
  name: moonbeam.name,
});

// Using ethers
// *****WARNING: IN THE UPCOMING VERSION OF THIS SDK, ethers SUPPORT WILL BE REMOVED, PLEASE SWITCH TO viem WHEN POSSIBLE
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ethersSigner = new ethers.Wallet(moonbeamPrivateKey, provider);

// Using viem
const account = privateKeyToAccount(moonbeamPrivateKey);
const viemSigner = createWalletClient({
  account,
  chain: moonbeamViem,
  transport: http('https://rpc.api.moonbeam.network'),
});

// ethers
// const evmSigner: EvmSigner = ethersSigner
// const address = ethersSigner.address
// viem
const evmSigner: EvmSigner = viemSigner;
const { address } = account;

// Polkadot Signer ===========================================================

const polkadotPrivateKey = '';

await cryptoWaitReady();
const keyring = new Keyring({
  ss58Format: polkadot.ss58Format,
  type: 'sr25519',
});
const pair = keyring.createFromUri(polkadotPrivateKey);

// ===========================================================================

export function logBalances(data: TransferData): void {
  console.log(
    `Balance on ${data.source.chain.name} ${data.source.balance.toDecimal()} ${
      data.source.balance.symbol
    }`,
  );
  console.log(
    `Balance on ${
      data.destination.chain.name
    } ${data.destination.balance.toDecimal()} ${
      data.destination.balance.symbol
    }`,
  );
}

export function logTxDetails(data: TransferData): void {
  console.log(
    `\nYou can send min: ${data.min.toDecimal()} ${
      data.min.symbol
    } and max: ${data.max.toDecimal()} ${data.max.symbol} from ${
      data.source.chain.name
    } to ${
      data.destination.chain.name
    }. You will pay ${data.source.fee.toDecimal()} ${
      data.source.fee.symbol
    } fee on ${
      data.source.chain.name
    } and ${data.destination.fee.toDecimal()} ${
      data.destination.fee.symbol
    } fee on ${data.destination.chain.name}.`,
  );
}

export async function fromPolkadot() {
  console.log('\nTransfer from Polkadot to Moonbeam\n');

  const data = await Sdk().getTransferData({
    destinationAddress: address,
    destinationKeyOrChain: moonbeam,
    keyOrAsset: dot,
    polkadotSigner: pair,
    sourceAddress: pair.address,
    sourceKeyOrChain: polkadot,
  });

  logBalances(data);
  logTxDetails(data);

  const amount = +data.min.toDecimal() * 2;

  console.log(`Sending from ${data.source.chain.name} amount: ${amount}`);

  const hash = await data.transfer(amount);

  console.log(`${data.source.chain.name} tx hash: ${hash}`);
}

export async function fromMoonbeam() {
  console.log('\nTransfer from Moonbeam to Polkadot\n');

  const data = await Sdk()
    .assets()
    .asset(dot)
    .source(moonbeam)
    .destination(polkadot)
    .accounts(address, pair.address, {
      evmSigner,
    });

  logBalances(data);
  logTxDetails(data);

  const amount = +data.min.toDecimal() * 2;

  console.log(`Sending from ${data.source.chain.name} amount: ${amount}`);

  const hash = await data.transfer(amount);

  console.log(`${data.source.chain.name} tx hash: ${hash}`);
}

async function main() {
  // disable unnecessary warning logs
  console.warn = () => null;
  console.clear();

  console.log(`\nMoonbeam address: ${address}.`);
  console.log(`Polkadot address: ${pair.address}.`);

  await fromPolkadot();
  console.log('\nWaiting 30 seconds...');
  await setTimeout(30000);
  await fromMoonbeam();
}

main()
  .then(() => console.log('done!'))
  .catch(console.error)
  .finally(() => process.exit());
