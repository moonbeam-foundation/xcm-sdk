import { AssetSymbol, ChainKey } from '@moonbeam-network/xcm-config';
import { init, toDecimal } from '@moonbeam-network/xcm-sdk';
import { Keyring } from '@polkadot/api';
import { ethers } from 'ethers';
import { setTimeout } from 'timers/promises';

/**
 * Add your moonbeam private key
 */
const moonbeamPrivateKey = '';

/**
 * Add your polkadot menmonic or private key
 */
const polkadotSuri = '';

// ===========================================================================

const dot = AssetSymbol.DOT;
const polkadot = ChainKey.Polkadot;

const { moonbeam } = init();

const keyring = new Keyring({ type: 'sr25519' });

const provider = new ethers.providers.WebSocketProvider(moonbeam.moonChain.ws, {
  name: moonbeam.moonChain.name,
  chainId: moonbeam.moonChain.chainId,
});
const ethersSigner = new ethers.Wallet(moonbeamPrivateKey, provider);

// ===========================================================================

async function deposit() {
  const pair = keyring.addFromUri(polkadotSuri);

  const { chains, from } = moonbeam.deposit(dot);

  console.log(
    `\nYou can deposit ${dot} from these chains: `,
    chains.map((chain) => chain.name),
  );

  const { asset, sourceBalance, source, min, send } = await from(polkadot).get(
    ethersSigner.address,
    pair,
  );

  console.log(
    `Your ${asset.originSymbol} balance in ${source.name}: ${toDecimal(
      sourceBalance,
      asset.decimals,
    )}. Minimum transferable amount is: ${toDecimal(min, asset.decimals)}`,
  );

  // sending enough to withdraw later
  await send(600000000n, (event) => console.log(event));
}

async function withdraw() {
  const { chains, to } = moonbeam.withdraw(dot);
  const polkadotAddress = keyring.getPairs().at(0)?.address!;

  console.log(
    `\nYou can withdraw ${dot} to these chains: `,
    chains.map((chain) => chain.name),
  );

  const { asset, destination, destinationBalance, min, send } = await to(
    polkadot,
  ).get(polkadotAddress, { ethersSigner, originAccount: ethersSigner.address });

  console.log(
    `Your ${asset.originSymbol} balance in ${destination.name}: ${toDecimal(
      destinationBalance,
      asset.decimals,
    )}. Minimum transferable amount is: ${toDecimal(min, asset.decimals)}`,
  );

  await send(min, (event) => console.log(event));
}

async function main() {
  console.log('starting...');

  const thirtySeconds = 30 * 1000;
  const unsubscribe = await moonbeam.subscribeToAssetsBalanceInfo(
    ethersSigner.address,
    (balances) => {
      console.log('\nUpdated balances:');
      console.log('▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄');
      balances.forEach(({ asset, balance, origin }) => {
        console.log(
          `${balance.symbol}: ${toDecimal(
            balance.balance,
            balance.decimals,
          )} (${origin.name} ${asset.originSymbol})`,
        );
      });
      console.log('▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄');
    },
  );
  await setTimeout(3000);

  console.log('\ndepositing...');
  await deposit();
  await setTimeout(thirtySeconds);

  console.log('\nwithdrawing...');
  await withdraw();
  await setTimeout(thirtySeconds);

  unsubscribe();
}

// to suppress unnecessary warning from polkadot and ethers
console.warn = () => {};

main()
  .then(() => console.log('done!'))
  .catch(console.error)
  .finally(() => process.exit());
