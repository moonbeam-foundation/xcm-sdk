import { AssetSymbol, ChainKey, moonbeam } from '@moonbeam-network/xcm-config';
import { ApiPromise, WsProvider } from '@polkadot/api';

const dot = AssetSymbol.DOT;
const polkadot = ChainKey.Polkadot;
/**
 * Add your polkadot address
 */
const account = '';

/**
 * Example 1
 */

async function example1() {
  const { asset, origin, config } = moonbeam.deposit(dot).from(polkadot);

  const api = await ApiPromise.create({
    provider: new WsProvider(origin.ws),
  });

  await api.isReady;

  const { pallet, function: fn, getParams } = config.balance;
  const balance = await api.query[pallet][fn](...getParams(account));

  console.log(`Your ${asset.originSymbol} balance in ${origin.name} is`);
  console.log(balance.toHuman());

  api.disconnect();
}

/**
 * Example 2
 */

async function example2() {
  console.log(`You can deposit/withdraw these assets: ${moonbeam.symbols}\n`);

  for (const symbol of moonbeam.symbols) {
    const { chains: depositChains, from } = moonbeam.deposit(symbol);
    const { chains: withdrawChains, to } = moonbeam.withdraw(symbol);

    /**
     * Deposit
     */
    console.log(
      `Deposit ${symbol} from ${depositChains.map((chain) => chain.name)}`,
    );
    depositChains.forEach((chain) => {
      const {
        config: { balance, extrinsic },
      } = from(chain.key);
      console.log(
        `Balance pallet: ${balance.pallet} function: ${balance.function}`,
      );
      console.log(
        `Extrinsic pallet: ${extrinsic.pallet} extrinsic: ${extrinsic.extrinsic}\n`,
      );
    });

    /**
     * Withdraw
     */
    console.log(
      `Withdraw ${symbol} to ${withdrawChains.map((chain) => chain.name)}`,
    );
    withdrawChains.forEach((chain) => {
      const {
        config: { balance },
      } = to(chain.key);
      console.log(
        `Balance pallet: ${balance.pallet}d function: ${balance.function}`,
      );
    });

    console.log('▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\n');
  }
}

console.log('████████████████████▓▓▒▒░ Example 1 ░▒▒▓▓████████████████████');
example1()
  .then(() =>
    console.log(
      '████████████████████▓▓▒▒░ Example 2 ░▒▒▓▓████████████████████',
    ),
  )
  .then(example2)
  .then(() => process.exit());
