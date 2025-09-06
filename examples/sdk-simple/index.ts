import { dot, moonbeam, polkadot } from '@moonbeam-network/xcm-config';
// You can also import the assets and chains from the config package
// import { dot } from '@moonbeam-network/xcm-config/assets';
// import { moonbeam, polkadot } from '@moonbeam-network/xcm-config/chains';
import { Sdk, type TransferData } from '@moonbeam-network/xcm-sdk';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { type Address, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const { EVM_PRIVATE_KEY, POLKADOT_PRIVATE_KEY } = process.env;

if (!EVM_PRIVATE_KEY || !POLKADOT_PRIVATE_KEY) {
  throw new Error(
    'Env variables EVM_PRIVATE_KEY and POLKADOT_PRIVATE_KEY must be defined',
  );
}
// Moonbeam Signer ===========================================================

const account = privateKeyToAccount(EVM_PRIVATE_KEY as Address);
const walletClient = createWalletClient({
  account,
  chain: moonbeam.getViemChain(),
  transport: http(),
});

console.log(`\nMoonbeam address: ${account.address}`);

// Polkadot Signer ===========================================================

await cryptoWaitReady();
const keyring = new Keyring({
  ss58Format: polkadot.ss58Format,
  type: 'sr25519',
});
const pair = keyring.createFromUri(POLKADOT_PRIVATE_KEY);

console.log(`Substrate address: ${pair.address}`);

// ===========================================================================

export function logBalances(data: TransferData): void {
  console.log(
    `Balance on ${data.source.chain.name} ${data.source.balance.toDecimal()} ${data.source.balance.getSymbol()}`,
  );
  console.log(
    `Balance on ${
      data.destination.chain.name
    } ${data.destination.balance.toDecimal()} ${data.destination.balance.getSymbol()}`,
  );
}

export function logTxDetails(data: TransferData): void {
  console.log(
    `\nYou can send min: ${data.min.toDecimal()} ${data.min.getSymbol()} and max: ${data.max.toDecimal()} ${data.max.getSymbol()} from ${
      data.source.chain.name
    } to ${
      data.destination.chain.name
    }. You will pay ${data.source.fee.toDecimal()} ${data.source.fee.getSymbol()} fee on ${
      data.source.chain.name
    } and ${data.destination.fee.toDecimal()} ${data.destination.fee.getSymbol()} fee on ${data.destination.chain.name}.`,
  );
}

export async function fromPolkadot() {
  console.log('\nTransfer from Polkadot to Moonbeam\n');

  const data = await Sdk()
    .setAsset(dot)
    .setSource(polkadot)
    .setDestination(moonbeam)
    .setAddresses({
      sourceAddress: pair.address,
      destinationAddress: account.address,
    });

  logBalances(data);
  logTxDetails(data);

  const amount = +data.min.toDecimal() * 1.5;

  console.log(`Sending from ${data.source.chain.name} amount: ${amount}`);

  const hash = await data.transfer({
    amount,
    signers: { polkadotSigner: pair },
  });

  console.log(`${data.source.chain.name} tx hash: ${hash}`);
}

export async function fromMoonbeam() {
  console.log('\nTransfer from Moonbeam to Polkadot\n');

  const data = await Sdk()
    .setAsset(dot)
    .setSource(moonbeam)
    .setDestination(polkadot)
    .setAddresses({
      sourceAddress: account.address,
      destinationAddress: pair.address,
    });

  logBalances(data);
  logTxDetails(data);

  const amount = +data.min.toDecimal() * 1.5;

  console.log(`Sending from ${data.source.chain.name} amount: ${amount}`);

  const hash = await data.transfer({
    amount,
    signers: { evmSigner: walletClient },
    // Monitoring callbacks - Optional
    onSourceFinalized: () =>
      console.log('Transaction sent successfully from Moonbeam'),
    onSourceError: (error) => console.error('Error sending transaction', error),
    onDestinationFinalized: () =>
      console.log('Assets successfully received on Polkadot'),
    onDestinationError: (error) =>
      console.error('Error receiving assets', error),
  });
  // Give it time to be able to see the logs on the monitoring callbacks
  await new Promise((resolve) => setTimeout(resolve, 30000));

  console.log(`${data.source.chain.name} tx hash: ${hash}`);
}

async function main() {
  // disable unnecessary warning logs
  console.warn = () => null;
  console.clear();

  console.log(`\nMoonbeam address: ${account.address}.`);
  console.log(`Polkadot address: ${pair.address}.`);

  await fromPolkadot();
  console.log('\nWaiting 30 seconds...');
  await new Promise((resolve) => setTimeout(resolve, 30000));
  await fromMoonbeam();
}

main()
  .then(() => console.log('done!'))
  .catch(console.error)
  .finally(() => process.exit());
