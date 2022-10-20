import {
  ChainKey,
  MoonChainKey,
  MOON_CHAINS,
} from '@moonbeam-network/xcm-config';
import { init } from '@moonbeam-network/xcm-transact';
import { ethers } from 'ethers';
import { setTimeout } from 'timers/promises';

/**
 * Add your moonbeam private key
 */
const moonbeamPrivateKey = '';

/**
 * Add your moonbeam private key
 */
const callHash =
  '0x0303d1d463af8df4f2318d700598c0c0479f19396ba41300008a5d78456301';

/**
 * Add your polkadot menmonic or private key
 */
// const polkadotSuri = '';

// ===========================================================================

const alpha = MOON_CHAINS[MoonChainKey.MoonbaseAlpha];

// const keyring = new Keyring({ type: 'sr25519' });

const provider = new ethers.providers.WebSocketProvider(alpha.ws, {
  name: alpha.name,
  chainId: alpha.chainId,
});
const ethersSigner = new ethers.Wallet(moonbeamPrivateKey, provider);

const { moonbase } = init({ ethersSigner, polkadotSigner: {} });

// ===========================================================================

async function toBeta() {
  const { send } = await moonbase.to(ChainKey.MoonbaseBeta).transact(callHash);

  await send((event) => console.log(event));
}

async function fromBeta() {
  //
}

async function main() {
  console.log('starting...');

  const thirtySeconds = 30 * 1000;

  console.log('\ndepositing...');
  await toBeta();
  await setTimeout(thirtySeconds);

  console.log('\nwithdrawing...');
  await fromBeta();
  // await setTimeout(thirtySeconds);
}

// to suppress unnecessary warning from polkadot and ethers
console.warn = () => {};

main()
  .then(() => console.log('done!'))
  .catch(console.error)
  .finally(() => process.exit());
