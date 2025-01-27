The Moonbeam XCM SDK enables developers to easily transfer assets between chains, either between parachains or between a parachain and the relay chain, within the Polkadot/Kusama ecosystem. With the SDK, you don't need to worry about determining the multilocation of the origin or destination assets or which extrinsics are used on which networks to send XCM transfers.

The XCM SDK offers helper functions that provide a very simple interface to execute XCM transfers between chains in the Polkadot/Kusama ecosystem. In addition, the XCM config package allows any parachain project to add their information in a standard way, so they can be immediately supported by the XCM SDK.

# Documentation

You can find the documentation at [https://moonbeam-foundation.github.io/xcm-sdk/latest/](https://moonbeam-foundation.github.io/xcm-sdk/latest/).

# Installation

```bash
npm i @moonbeam-network/xcm-sdk
```

:warning: You need to have peer dependencies of SDK installed as well.

```bash
npm i @polkadot/api @polkadot/util-crypto
```

# Usage

The following sections contain basic examples of how to work with the XCM SDK to build transfer data to transfer an asset from one chain to another and how to submit the transfer. For a detailed overview on how to use it, please refer to the [XCM SDK docs](https://moonbeam-foundation.github.io/xcm-sdk/latest/example-usage/xcm).

## Build XCM Transfer Data

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';

const transferData = async () => {
  const transferData = await Sdk()
  .setAsset(INSERT_ASSET)
  .setSource(INSERT_SOURCE_CHAIN)
  .setDestination(INSERT_DESTINATION_CHAIN)
  .setAddresses({
    sourceAddress: INSERT_SOURCE_ADDRESS,
      destinationAddress: INSERT_DESTINATION_ADDRESS,
    });
  };

fromPolkadot();
```

## Transfer

```js
...

const hash = await transferData.transfer(INSERT_TRANSFER_AMOUNT, { INSERT_SIGNERS });
```

# Examples

- [sdk](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/examples/sdk-simple)

```bash
git clone git@github.com:moonbeam-foundation/xcm-sdk.git
cd xcm-sdk
pnpm install
cd examples/sdk-simple

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
pnpm link @moonbeam-network/xcm-types @moonbeam-network/xcm-utils @moonbeam-network/xcm-builder @moonbeam-network/xcm-config @moonbeam-network/xcm-sdk
```

If you need you can link other packages too.

After testing is done, unlink the SDK:

```bash
pnpm unlink @moonbeam-network/xcm-types @moonbeam-network/xcm-utils @moonbeam-network/xcm-builder @moonbeam-network/xcm-config @moonbeam-network/xcm-sdk
```
