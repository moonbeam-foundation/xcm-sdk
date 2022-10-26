import {
  ChainKey,
  MoonChainKey,
  MOON_CHAINS,
} from '@moonbeam-network/xcm-config';
import { init } from '@moonbeam-network/xcm-transact';
import { Keyring } from '@polkadot/api';
import { ethers } from 'ethers';
import { setTimeout } from 'timers/promises';

/**
 * Add your alpha private key
 * Get from MetaMask
 */
const alphaPrivateKey = '';

/**
 * Add your beta private key
 *
 */
const betaPrivateKey = '';

/**
 * Add your moonbeam private key
 */
const callHash = '';

// ===========================================================================

const alpha = MOON_CHAINS[MoonChainKey.MoonbaseAlpha];

const keyring = new Keyring({ type: 'ethereum' });
const pair = keyring.createFromUri(`0x${betaPrivateKey}`);

const provider = new ethers.providers.WebSocketProvider(alpha.ws, {
  name: alpha.name,
  chainId: alpha.chainId,
});
const ethersSigner = new ethers.Wallet(alphaPrivateKey, provider);

const { moonbase } = init({ ethersSigner, polkadotSigner: {} });

// ===========================================================================

async function toBeta() {
  const data = await moonbase.to(ChainKey.MoonbaseBeta).transact(callHash);

  console.log('data', data);

  await data.send((event) => console.log(event));
}

async function fromBeta() {
  const data = await moonbase
    .from(ChainKey.MoonbaseBeta)
    .transact(callHash, pair);

  console.log('data', data);

  await data.send((event) => console.log(event));
}

async function main() {
  console.log('starting...');

  const fortyFiveSeconds = 45 * 1000;

  console.log('\nto...');
  await toBeta();
  await setTimeout(fortyFiveSeconds);

  console.log('\nfrom...');
  await fromBeta();
  await setTimeout(fortyFiveSeconds);
}

// to suppress unnecessary warning from polkadot and ethers
console.warn = () => {};

main()
  .then(() => console.log('done!'))
  .catch(console.error)
  .finally(() => process.exit());
