import { Mrl, type TransferData } from '@moonbeam-network/mrl';
import {
  fantomTestnet,
  ftm,
  moonbaseAlpha,
  peaqAlphanet,
} from '@moonbeam-network/xcm-config';
import { type Asset, EvmChain, Parachain } from '@moonbeam-network/xcm-types';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { http, type Address, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import type { EvmSigner } from '../../packages/sdk/build';

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
  console.warn = () => null;
  console.clear();

  /**
   *  Set the source, destination and asset
   */
  const source = fantomTestnet;
  const destination = moonbaseAlpha;
  const asset = ftm;

  /**
   * Set the transaction to be automatic or not
   * If it is automatic, the transaction will be completed by a relayer in the destination chain
   * If it is not automatic, you will have to manually complete the transaction in the destination chain
   */
  const isAutomatic = false;

  /**
   * Set the tx hash to be executed if the transaction is not automatic
   */
  const txHashToBeExecuted: string | undefined = undefined;

  if (txHashToBeExecuted) {
    await executeInEvm(txHashToBeExecuted, destination);
  } else if (EvmChain.is(source)) {
    await fromEvmChain(source, destination, asset, isAutomatic);
  } else if (Parachain.is(source)) {
    await fromParachain(source, destination, asset, isAutomatic);
  }
}

function logBalances(data: TransferData): void {
  console.log(
    `\nBalance on ${data.source.chain.name} ${data.source.balance.toDecimal()} ${data.source.balance.getSymbol()}`,
  );
  console.log(
    `Balance on ${
      data.destination.chain.name
    } ${data.destination.balance.toDecimal()} ${data.destination.balance.getSymbol()}`,
  );
}

async function fromEvmChain(
  source: EvmChain,
  destination: EvmChain,
  asset: Asset,
  isAutomatic: boolean,
) {
  const fantomWalletClient = createWalletClient({
    account,
    chain: fantomTestnet.getViemChain(),
    transport: http(),
  });

  console.log(`\Source address: ${account.address}`);

  const transferData = await Mrl()
    .setSource(source)
    .setDestination(destination)
    .setAsset(asset)
    .setIsAutomatic(isAutomatic)
    .setAddresses({
      sourceAddress: account.address,
      destinationAddress: account.address,
    });
  logBalances(transferData);

  const amount = +transferData.min.toDecimal() * 1.5 + 0.000001;

  console.log(
    `\nSending ${amount} ${transferData.source.balance.getSymbol()} from ${transferData.source.chain.name} to ${transferData.destination.chain.name}`,
  );

  const result = await transferData.transfer(amount, isAutomatic, {
    evmSigner: fantomWalletClient,
  });
  const hash = result.pop();

  if (!isAutomatic && hash) {
    console.log(
      `\nYou will have to manually complete the transaction in ${transferData.moonChain.chain.name} and you will need to pay ${transferData.moonChain.fee.toDecimal()} ${transferData.moonChain.fee.getSymbol()} for completing it`,
    );
    console.log(
      `Balance for fees on ${
        transferData.moonChain.chain.name
      } ${transferData.moonChain.feeBalance.toDecimal()} ${transferData.moonChain.feeBalance.getSymbol()}`,
    );

    const redeemChainWalletClient = createWalletClient({
      account,
      chain: transferData.moonChain.chain.getViemChain(),
      transport: http(),
    });

    console.log('\nWaiting 30 seconds for tx to be confirmed before executing');
    await new Promise((resolve) => setTimeout(resolve, 30000));

    console.log(`Redeeming tx ${hash} in ${transferData.moonChain.chain.name}`);

    const executeTransferData = await Mrl().getExecuteTransferData({
      txId: hash,
      chain: transferData.moonChain.chain,
    });

    await executeTransferData.executeTransfer(redeemChainWalletClient);
  } else {
    console.log(
      `\nRedeeming will happen automatically for this tx ${hash} in ${transferData.moonChain.chain.name}`,
    );
  }
}

async function fromParachain(
  source: Parachain,
  destination: EvmChain,
  asset: Asset,
  isAutomatic: boolean,
) {
  const transferData = await Mrl()
    .setSource(source)
    .setDestination(destination)
    .setAsset(asset)
    .setIsAutomatic(isAutomatic)
    .setAddresses({
      sourceAddress: pair.address,
      destinationAddress: account.address,
    });
  logBalances(transferData);

  console.log(`Source address: ${pair.address}`);
  console.log(`Destination address: ${account.address}`);

  const amount = +transferData.min.toDecimal() * 1.5 + 0.000001;

  console.log(
    `\nSending ${amount} ${transferData.source.balance.getSymbol()} from ${transferData.source.chain.name} to ${transferData.destination.chain.name}`,
  );
  console.log(
    `Sending also ${transferData.moonChain.fee.toDecimal()} ${transferData.moonChain.fee.getSymbol()} from ${transferData.source.chain.name} to ${transferData.moonChain.chain.name} to cover for fees`,
  );

  await transferData.transfer(amount, isAutomatic, {
    polkadotSigner: pair,
  });

  console.log(
    `\nA remote execution will be sent to the computed origin account (${transferData.moonChain.address}) in ${transferData.moonChain.chain.name} which will relay the ${amount} ${transferData.source.balance.getSymbol()} to ${transferData.destination.chain.name}`,
  );

  if (isAutomatic) {
    console.log(
      `\nThe transaction will be completed automatically in ${transferData.destination.chain.name} once picked up by a relayer`,
    );
  } else {
    console.log(
      `\nYou will have to manually complete the transaction in ${transferData.destination.chain.name} once the transaction is confirmed`,
    );
    console.log(
      'This sdk does not yet return the tx hash that needs to be executed, so you will have to look it up in the explorer and paste it in the executeInEvm function',
    );
  }
}

async function executeInEvm(txHashToBeExecuted: string, destination: EvmChain) {
  const walletClient = createWalletClient({
    account,
    chain: destination.getViemChain(),
    transport: http(),
  });

  const data = await Mrl().getExecuteTransferData({
    txId: txHashToBeExecuted,
    chain: fantomTestnet,
  });

  console.log(`Executing tx ${txHashToBeExecuted} in ${destination.name}`);

  await data.executeTransfer(walletClient as EvmSigner);
}
