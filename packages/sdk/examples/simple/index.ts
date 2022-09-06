import { AssetSymbol, ChainKey } from '@moonbeam-network/xcm-config';
import { init, toDecimal } from '@moonbeam-network/xcm-sdk';
import { Keyring } from '@polkadot/api';
import { ethers } from 'ethers';
import { setTimeout } from 'timers/promises';

/**
 * Add your moonbeam address and private key
 */
const moonbeamAddress = '';
const moonbeamPrivateKey = '';

/**
 * Add your polkadot address and seed phrase
 */
const polkadotAddress = '';
const polkadotSeed = '';

// ===========================================================================

const dot = AssetSymbol.DOT;
const polkadot = ChainKey.Polkadot;

const { moonbeam } = init();

const keyring = new Keyring({ type: 'sr25519' });

const provider = new ethers.providers.WebSocketProvider(moonbeam.moonChain.ws, {
  name: moonbeam.moonChain.name,
  chainId: moonbeam.moonChain.chainId,
});
const signer = new ethers.Wallet(moonbeamPrivateKey, provider);

// ===========================================================================

async function deposit() {
  const polkadotAccount = keyring.addFromUri(polkadotSeed);

  const { chains, from } = moonbeam.deposit(dot);

  console.log(
    `\nYou can deposit ${dot} from these chains: `,
    chains.map((chain) => chain.name),
  );

  const { asset, sourceBalance, source, min, send } = await from(polkadot).get(
    moonbeamAddress,
    polkadotAccount,
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

  console.log(
    `\nYou can withdraw ${dot} to these chains: `,
    chains.map((chain) => chain.name),
  );

  const { asset, destination, destinationBalance, min, send } = await to(
    polkadot,
  ).get(polkadotAddress, {
    ethersSigner: signer,
  });

  console.log(
    `Your ${asset.originSymbol} balance in ${destination.name}: ${toDecimal(
      destinationBalance,
      asset.decimals,
    )}. Minimum transferable amount is: ${toDecimal(min, asset.decimals)}`,
  );

  await send(min, (event) => console.log(event));
}

async function main() {
  const thirtySeconds = 30 * 1000;
  const unsubscribe = await moonbeam.subscribeToAssetsBalanceInfo(
    moonbeamAddress,
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

  await deposit();
  await setTimeout(thirtySeconds);
  await withdraw();
  await setTimeout(thirtySeconds);

  unsubscribe();
}

main().then(() => process.exit());
