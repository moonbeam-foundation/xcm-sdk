import { AssetSymbol, ChainKey, moonbeam } from '@moonbeam-network/xcm-config';
import { ApiPromise, WsProvider } from '@polkadot/api';

const dot = AssetSymbol.DOT;
const polkadot = ChainKey.Polkadot;

const account = '5DnP2NuCTxfW4E9rJvzbt895sEsYRD7HC9QEgcqmNt7VWkD4';

/**
 * Example 1
 */

async function example1() {
  const { asset, origin, config } = moonbeam.deposit(dot).from(polkadot);

  const api = await ApiPromise.create({
    provider: new WsProvider(origin.ws),
  });

  await api.isReady;

  const balance = await api.query[config.balance.pallet][
    config.balance.function
  ](...config.balance.getParams(account));

  console.log(`Your balance`);
  console.log(balance.toHuman());

  api.disconnect();
}

/**
 * Example 2
 */

async function example2() {
  // const asset: MoonbeamAssets = moonbeam.assets.ACA.originSymbol;
  // const { chains, from } = moonbeam.deposit(asset);
  // const chain: Chain<MoonbeamChains> = chains[0]!;
  // const chainKey: MoonbeamChains = chain.key;
  // const config = from(chainKey);
  // console.log(config);
}

example1()
  .then(() =>
    console.log(
      '████████████████████▓▓▒▒░ Example 2 ░▒▒▓▓████████████████████',
    ),
  )
  .then(example2)
  .then(() => process.exit());
