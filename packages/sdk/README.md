![Moonbeam](https://moonbeam.network/wp-content/uploads/2020/03/Moonbeam-Logo-Final-500px.png)

# XCM-SDK

## Installation

```bash
npm i @moonbeam-network/xcm-config @moonbeam-network/xcm-sdk
```

## Usage

### Init

```typescript
import { init } from '@moonbeam-network/xcm-sdk';

const { moonbeam } = init();

// Optionally you can provide signers or do it on get()
const { moonbeam } = init({
  ethersSigner,
  polkadotSigner,
});
```

### Accounts

```typescript
const moonbeamAddress = '0xeF46c7649270C912704fB09B75097f6E32208b85';
const substrateAddress = '5DG5Fn3ww3KPza1RLoap6QJNzQfEvRebxypDGp35YuMX5y2K';
```

### Deposit

```typescript
// moonbeam.symbols is a list of asset symbols that you can deposit/withdraw
// chains is a list of chains from which you can deposit asset
const { chains, from } = moonbeam.deposit(moonbeam.symbols[0]);

const { min, send } = await from(chains[0]).get(
  moonbeamAddress,
  substrateAddress,
  // if you haven't provided on init
  { polkadotSigner },
);

await send(min, (event) => console.log(event));
```

### Withdraw

```typescript
const { chains, to } = moonbeam.withdraw(moonbeam.symbols[0]);

const { min, send } = await to(chains[0]).get(
  substrateAddress,
  // if you haven't provided on init
  { ethersSigner },
);

await send(min, (event) => console.log(event));
```

### Get balances

```typescript
const unsubscribe = await moonbeam.subscribeToAssetsBalanceInfo(
  moonbeamAddress,
  (balances) => {
    balances.forEach(({ asset, balance, origin }) => {
      // xcDOT: 0.073742 (Polkadot DOT)
      // ...
      console.log(
        `${balance.symbol}: ${toDecimal(balance.balance, balance.decimals)} (${
          origin.name
        } ${asset.originSymbol})`,
      );
    });
  },
);

unsubscribe();
```

## Examples

- [simple](https://github.com/PureStake/xcm-sdk/blob/main/packages/sdk/examples/simple)

```bash
git clone git@github.com:PureStake/xcm-sdk.git
cd packages/sdk/examples/simple/
npm i

// edit index.ts by adding your accounts

npm start
```
