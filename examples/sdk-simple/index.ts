import { dot, moonbeam, polkadot } from '@moonbeam-network/xcm-config';
import { Sdk } from '@moonbeam-network/xcm-sdk';
import { Keyring } from '@polkadot/api';
import { ethers } from 'ethers';

// Moonbeam Signer ===========================================================

const moonbeamPrivateKey = '';
const provider = new ethers.providers.WebSocketProvider(moonbeam.ws, {
  chainId: moonbeam.id,
  name: moonbeam.name,
});
const ethersSigner = new ethers.Wallet(moonbeamPrivateKey, provider);

console.log(`Moonbeam address: ${ethersSigner.address}`);

// Polkadot Signer ===========================================================

const polkadotPrivateKey = '';

const keyring = new Keyring();
const pair = keyring.createFromUri(polkadotPrivateKey);

console.log(`Polkadot address: ${pair.address}`);

// ===========================================================================

async function main() {
  const data = await Sdk().transfer({
    destinationAddress: ethersSigner.address,
    destinationKeyOrChain: moonbeam,
    ethersSigner,
    keyOrAsset: dot,
    polkadotSigner: pair,
    sourceAddress: pair.address,
    sourceKeyOrChain: polkadot,
  });

  console.log(data);
}

main()
  .then(() => console.log('done!'))
  .catch(console.error)
  .finally(() => process.exit());
