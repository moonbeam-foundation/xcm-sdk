import { Mrl, type TransferData } from '@moonbeam-network/mrl';
import {
  fantomTestnet,
  ftm,
  ftmwh,
  moonbaseAlpha,
  peaqAlphanet,
} from '@moonbeam-network/xcm-config';
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

  const isAutomatic = false;

  // await fromEvmChain(isAutomatic);
  await fromParachain(isAutomatic);
}

export function logBalances(data: TransferData): void {
  console.log(
    `\nBalance on ${data.source.chain.name} ${data.source.balance.toDecimal()} ${data.source.balance.getSymbol()}`,
  );
  console.log(
    `Balance on ${
      data.destination.chain.name
    } ${data.destination.balance.toDecimal()} ${data.destination.balance.getSymbol()}`,
  );
}

export function logTxDetails(data: TransferData, isAutomatic: boolean): void {
  console.log(
    `\nYou can send min: ${data.min.toDecimal()} ${data.min.getSymbol()} and max: ${data.max.toDecimal()} ${data.max.getSymbol()} from ${
      data.source.chain.name
    } to ${data.destination.chain.name}.`,
  );
  if (!isAutomatic) {
    console.log(
      `You will have to manually complete the transaction in ${data.moonChain.chain.name} and you will need to pay ${data.moonChain.fee.toDecimal()} ${data.moonChain.fee.getSymbol()} for completing it`,
    );
  } else {
    console.log(
      `This transaction will be completed automatically in ${data.moonChain.chain.name}`,
    );
  }
}

async function fromEvmChain(isAutomatic: boolean) {
  const fantomWalletClient = createWalletClient({
    account,
    chain: fantomTestnet.getViemChain(),
    transport: http(),
  });

  console.log(`\Source address: ${account.address}`);

  const transferData = await Mrl()
    .setSource(fantomTestnet)
    .setDestination(moonbaseAlpha)
    .setAsset(ftm)
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

    console.log('\nWaiting 30 seconds for tx to be confirmed before redeeming');
    await new Promise((resolve) => setTimeout(resolve, 30000));

    console.log(`Redeeming tx ${hash} in ${transferData.moonChain.chain.name}`);

    const redeemData = await Mrl().getRedeemData({
      txId: hash,
      chain: transferData.moonChain.chain,
    });

    await redeemData.redeem(redeemChainWalletClient);
  } else {
    console.log(
      `\nRedeeming will happen automatically for this tx ${hash} in ${transferData.moonChain.chain.name}`,
    );
  }
}

async function fromParachain(isAutomatic: boolean) {
  const transferData = await Mrl()
    .setSource(peaqAlphanet)
    .setDestination(fantomTestnet)
    .setAsset(ftmwh)
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
      `\nYou will have to manually complete the transaction in ${transferData.destination.chain.name} once the transaction is confirmed
      This sdk does not yet return the tx hash that needs to be redeemed, so you will have to look it up in the explorer and paste it in the redeemInEvm function`,
    );
  }
}

async function redeemInEvm() {
  const txHashToBeRedeemed =
    '0xaaa0d615da43544eb0ae6f11148d14be809973d90c52041ce1c8d682db0c48c2';
  const walletClient = createWalletClient({
    account,
    chain: fantomTestnet.getViemChain(),
    transport: http(),
  });

  const data = await Mrl().getRedeemData({
    txId: txHashToBeRedeemed,
    chain: fantomTestnet,
  });
  console.log('data', data);

  await data.redeem(walletClient as EvmSigner);
}
