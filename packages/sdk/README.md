![Moonbeam](https://docs.moonbeam.network/images/builders/xcm/sdk/xcm-sdk-banner.png)

The Moonbeam XCM SDK enables developers to easily deposit and withdraw assets to Moonbeam/Moonriver from the relay chain and other parachains in the Polkadot/Kusama ecosystem. With the SDK, you don't need to worry about determining the multilocation of the origin or destination assets or which extrinsics are used on which networks to send XCM transfers. To deposit or withdraw assets, you simply define the asset and origin chain you want to deposit from or withdraw back to, along with the sending account's signer, and the amount to send.

# Documentation

- [usage](https://docs.moonbeam.network/builders/xcm/xcm-sdk/xcm-sdk/)
- [references](https://docs.moonbeam.network/builders/xcm/xcm-sdk/reference/)

# Installation

```bash
npm i @moonbeam-network/xcm-config @moonbeam-network/xcm-sdk
```

# Usage

## Init

```typescript
import { init } from '@moonbeam-network/xcm-sdk';

const { moonbeam } = init();

// Optionally you can provide signers or do it on get()
const { moonbeam } = init({
  ethersSigner,
  polkadotSigner,
});
```

## Accounts

```typescript
const moonbeamAddress = '0xeF46c7649270C912704fB09B75097f6E32208b85';
const substrateAddress = '5DG5Fn3ww3KPza1RLoap6QJNzQfEvRebxypDGp35YuMX5y2K';
```

## Deposit

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

## Withdraw

```typescript
const { chains, to } = moonbeam.withdraw(moonbeam.symbols[0]);

const { min, send } = await to(chains[0]).get(
  substrateAddress,
  // if you haven't provided on init
  { ethersSigner },
);

await send(min, (event) => console.log(event));
```

## Get balances

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

# Examples

- [sdk](https://github.com/PureStake/xcm-sdk/blob/main/examples/sdk-simple)
- [config](https://github.com/PureStake/xcm-sdk/blob/main/examples/config-simple)
- [transact](https://github.com/PureStake/xcm-sdk/blob/main/examples/transact-simple)

```bash
git clone git@github.com:PureStake/xcm-sdk.git
cd xcm-sdk
npm i
cd examples/sdk-simple

# edit index.ts by adding your accounts

npm start
```

# Contributing

```bash
git clone git@github.com:PureStake/xcm-sdk.git
npm i
npm run dev
```

# Tests

## Unit tests

```bash
npm run test
```

## Acceptance tests

```bash
cp .env.example .env
# add private key and suri to .env file

npm run test:acc
```
