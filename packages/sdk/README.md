![Moonbeam](https://docs.moonbeam.network/images/builders/interoperability/xcm/sdk/xcm-sdk-banner.png)

The Moonbeam XCM SDK enables developers to easily deposit and withdraw assets to Moonbeam/Moonriver from the relay chain and other parachains in the Polkadot/Kusama ecosystem. With the SDK, you don't need to worry about determining the multilocation of the origin or destination assets or which extrinsics are used on which networks to send XCM transfers. To deposit or withdraw assets, you simply define the asset and origin chain you want to deposit from or withdraw back to, along with the sending account's signer, and the amount to send.

# Documentation

## v1 (current)

- TODO: (coming soon)

## v0 (previous)

- [usage](https://docs.moonbeam.network/builders/xcm/xcm-sdk/xcm-sdk/)
- [references](https://docs.moonbeam.network/builders/xcm/xcm-sdk/reference/)

# Installation

```bash
npm i @moonbeam-network/xcm-builder @moonbeam-network/xcm-config @moonbeam-network/xcm-types @moonbeam-network/xcm-utils @moonbeam-network/xcm-sdk
```

:warning: You need to have peer dependencies of SDK installed as well.

```bash
npm i @polkadot/api @polkadot/api-augment @polkadot/types @polkadot/util @polkadot/util-crypto ethers
```

# Usage

- TODO: (coming soon) - in the meantime, see examples below

# Examples

- [sdk](https://github.com/PureStake/xcm-sdk/blob/main/examples/sdk-simple)

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
