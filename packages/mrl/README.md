The Moonbeam MRL SDK enables developers to easily transfer liquidity into and across the Polkadot ecosystem from other ecosystems like Ethereum. With the SDK, you don't need to worry about setting up the different contract calls and extrinsics involved in the process of moving assets between the chains and ecosystems. It is an extension of the XCM SDK as it uses the same config and utils.

The MRL SDK offers helper functions that provide a very simple interface to execute transfers from parachains or contract calls from EVM chains. In addition, the MRL config package allows any external project to add their information in a standard way, allowing immediate support by the MRL SDK.

# Documentation

You can find the documentation at [https://moonbeam-foundation.github.io/xcm-sdk/latest/](https://moonbeam-foundation.github.io/xcm-sdk/latest/reference/mrl/).

# Installation

```bash
npm i @moonbeam-network/mrl
```

:warning: You need to have peer dependencies of SDK installed as well.

```bash
npm install @polkadot/api @polkadot/util-crypto
```

# Usage

The following sections contain basic examples of how to work with the MRL SDK to build transfer data to transfer an asset from one chain to another and how to submit the transfer. For a detailed overview on how to use it, please refer to the [XCM SDK docs](https://moonbeam-foundation.github.io/xcm-sdk/latest/example-usage/mrl).

## Build MRL Transfer Data

```js
import { Mrl } from '@moonbeam-network/mrl';

const fromEvm = async () => {
  const transferData = await Mrl()
    .setSource(ethereum)
    .setDestination(moonbeam)
    .setAsset(eth)
    .setIsAutomatic(false)
    .setAddresses({
      sourceAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      destinationAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    });
};

fromEvm();
```	

## Transfer

```js
...

const hash = await transferData.transfer({
    amount: 0.1,
    isAutomatic: false,
    signers: { evmSigner: ethereumWalletClient }, // Ethereum Signer, for example created with wagmi
  });
```

# Examples

- [mrl](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/examples/mrl-simple)

```bash
git clone git@github.com:moonbeam-foundation/xcm-sdk.git
cd xcm-sdk
pnpm install
cd examples/mrl-simple

# edit index.ts by adding your accounts

pnpm run start
```

# Contributing

First fork the repository and clone it.

```bash
git clone git@github.com:YOUR_GITHUB_USERNAME/xcm-sdk.git
pnpm install
```

Optionally, you can install the `pre-commit` hook to run the linter and tests before committing:

```bash
pnpm lefthook install
```

# Tests

## Unit tests

```bash
pnpm run test
```

## Acceptance tests

```bash
pnpm run test:acc
```

# Release

To create a dev version go to GitHub actions and run `publish dev versions` workflow.

To create a release version run:

```bash
pnpm run changeset
```

# Testing the change in the SDK locally

Build the project:

```bash
pnpm run build
```

Link the SDK:

```bash
pnpm run clean && pnpm run build && pnpm run link
```

In your project where you would like to test the changes:

```bash
pnpm link @moonbeam-network/xcm-types @moonbeam-network/xcm-utils @moonbeam-network/xcm-builder @moonbeam-network/xcm-config @moonbeam-network/xcm-sdk @moonbeam-network/mrl
```

If you need you can link other packages too.

After testing is done, unlink the SDK:

```bash
pnpm unlink @moonbeam-network/xcm-types @moonbeam-network/xcm-utils @moonbeam-network/xcm-builder @moonbeam-network/xcm-config @moonbeam-network/xcm-sdk @moonbeam-network/mrl
```

