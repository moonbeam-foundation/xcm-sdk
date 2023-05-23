/* eslint-disable import/no-extraneous-dependencies */
import { dot, moonbeam, polkadot } from '@moonbeam-network/xcm-config';
import { Sdk } from '@moonbeam-network/xcm-sdk';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ethers } from 'ethers';

console.warn = () => null;

// Moonbeam Signer ===========================================================

const moonbeamPrivateKey = '';
const provider = new ethers.providers.WebSocketProvider(moonbeam.ws, {
  chainId: moonbeam.id,
  name: moonbeam.name,
});
const ethersSigner = new ethers.Wallet(moonbeamPrivateKey, provider);

// Polkadot Signer ===========================================================

const polkadotPrivateKey = '';

await cryptoWaitReady();
const keyring = new Keyring({
  ss58Format: polkadot.ss58Format,
  type: 'sr25519',
});
const pair = keyring.createFromUri(polkadotPrivateKey);

// ===========================================================================

async function fromPolkadot() {
  console.clear();
  const data = await Sdk().getTransferData({
    destinationAddress: ethersSigner.address,
    destinationKeyOrChain: moonbeam,
    ethersSigner,
    keyOrAsset: dot,
    polkadotSigner: pair,
    sourceAddress: pair.address,
    sourceKeyOrChain: polkadot,
  });

  console.log(
    `Moonbeam address: ${
      ethersSigner.address
    }. Balance: ${data.source.balance.toDecimal()} ${
      data.source.balance.symbol
    }`,
  );
  console.log(
    `Polkadot address: ${
      pair.address
    }. Balance: ${data.destination.balance.toDecimal()} ${
      data.destination.balance.symbol
    }`,
  );

  console.log(
    `You can send min: ${data.min.toDecimal()} ${
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

  const amount = +data.min.toDecimal() * 2;

  console.log(`Sending from Polkadot amount: ${amount}`);

  const hash = await data.transfer(amount);

  console.log(`Polkadot tx hash: ${hash}`);
}

async function main() {
  await fromPolkadot();
}

main()
  .then(() => console.log('done!'))
  .catch(console.error)
  .finally(() => process.exit());
