---
title: Using the XCM SDK v2
description: Use the Moonbeam XCM SDK to easily transfer cross-chain assets between parachains or between a parachain and relay chain within the Polkadot/Kusama ecosystems.
template: tutorial.html
---

# Using the Moonbeam XCM SDK

## Introduction {: #introduction }

The Moonbeam XCM SDK enables developers to easily transfer assets between chains, either between parachains or between a parachain and the relay chain, within the Polkadot/Kusama ecosystem. With the SDK, you don't need to worry about determining the multilocation of the origin or destination assets or which extrinsics are used on which networks to send XCM transfers.

The XCM SDK offers helper functions that provide a very simple interface for executing XCM transfers between chains in the Polkadot/Kusama ecosystem. In addition, the XCM config package allows any parachain project to [add their information](./contribute.md) in a standard way, so the XCM SDK can immediately support them.

For an overview of the available methods and interfaces in the Moonbeam XCM SDK, please refer to the [Reference](./reference/interfaces.md){target=\_blank} page.

This guide shows how to transfer DOT from Polkadot to Moonbeam.

## Install the XCM SDK {: #install-the-xcm-sdk }

To get started with the Moonbeam XCM SDK, you'll need first to install the SDK:

```bash
npm install @moonbeam-network/xcm-sdk
```

You'll also need to install a few additional dependencies that you'll use to interact with the SDK in this guide. You'll need the Polkadot.js API to create a Polkadot signer:

```bash
npm install @polkadot/api @polkadot/util-crypto
```

You'll also need an Ethereum signer if you're interacting with an Ethereum-compatible chain like Moonbeam. This guide will cover using Ethers.js and viem. You'll need to install whichever library you want to use:

=== "Ethers.js"

    ```bash
    npm install ethers@6
    ```

=== "viem"

    ```bash
    npm install viem@2
    ```

## Create Signers {: #create-signers }

When transferring assets between chains, you'll need signers in place to sign the transactions. If you're interacting with an Ethereum-compatible chain that uses standard Ethereum-style H160 addresses, such as Moonbeam, you'll need to have an Ethereum signer, which can be an [Ethers.js](https://docs.ethers.org/v5/){target=\_blank} signer or a [viem Wallet Client](https://viem.sh/docs/clients/wallet.html){target=\_blank}. To interact with the relay chain or other parachains, you'll need a [Polkadot](https://polkadot.js.org/docs/api/){target=\_blank} signer.

You can pass, for example, a [browser extension wallet as a signer into Ethers](https://docs.ethers.org/v5/getting-started/#getting-started--connecting){target=\_blank} or [viem](https://viem.sh/docs/clients/wallet.html#json-rpc-accounts){target=\_blank}, such as MetaMask. Similarly, with Polkadot, you can [pass a compatible wallet to the signer using the `@polkadot/extension-dapp` library](https://polkadot.js.org/docs/extension/){target=\_blank}.

To create an EVM signer and a Polkadot signer, you can refer to the following sections.

!!! warning
**Never store your private key or mnemonic in a JavaScript or TypeScript file.**

### Create an EVM Signer {: #create-a-evm-signer }

To create an Ethers signer, you can use the following code snippet:

```js
import { ethers } from 'ethers';

const privateKey = 'INSERT_PRIVATE_KEY';
const provider = new ethers.WebSocketProvider('INSERT_WS_ENDPOINT', {
  chainId: INSERT_CHAIN_ID,
  name: 'INSERT_CHAIN_NAME',
});
const evmSigner = new ethers.Wallet(privateKey, provider);
```

For Moonbeam specifically, you can use the following configurations:

=== "Moonbeam"

    ```js
    import { ethers } from 'ethers';

    const privateKey = 'INSERT_PRIVATE_KEY';
    const provider = new ethers.WebSocketProvider(
      '{{ networks.moonbeam.wss_url }}',
      {
        chainId: {{ networks.moonbeam.chain_id }},
        name: 'moonbeam',
      }
    );
    const evmSigner = new ethers.Wallet(privateKey, provider);
    ```

=== "Moonriver"

    ```js
    import { ethers } from 'ethers';

    const privateKey = 'INSERT_PRIVATE_KEY';
    const provider = new ethers.WebSocketProvider(
      '{{ networks.moonriver.wss_url }}',
      {
        chainId: {{ networks.moonriver.chain_id }},
        name: 'moonriver',
      }
    );
    const evmSigner = new ethers.Wallet(privateKey, provider);
    ```

=== "Moonbase Alpha"

    ```js
    import { ethers } from 'ethers';

    const privateKey = 'INSERT_PRIVATE_KEY';
    const provider = new ethers.WebSocketProvider(
      '{{ networks.moonbase.wss_url }}',
      {
        chainId: {{ networks.moonbase.chain_id }},
        name: 'moonbase',
      }
    );
    const evmSigner = new ethers.Wallet(privateKey, provider);
    ```

Alternatively, you can create a viem Wallet Client to pass as an EVM signer:

=== "Moonbeam"

    ```js
    import { createWalletClient, http } from 'viem';
    import { privateKeyToAccount } from 'viem/accounts'
    import { moonbeam } from 'viem/chains';

    const privateKey = 'INSERT_PRIVATE_KEY';
    const account = privateKeyToAccount(privateKey);

    const evmSigner = createWalletClient({
      account,
      chain: moonbeam,
      transport: http(),
    });
    ```

=== "Moonriver"

    ```js
    import { createWalletClient, http } from 'viem';
    import { privateKeyToAccount } from 'viem/accounts'
    import { moonriver } from 'viem/chains';

    const privateKey = 'INSERT_PRIVATE_KEY';
    const account = privateKeyToAccount(privateKey);

    const evmSigner = createWalletClient({
      account,
      chain: moonriver,
      transport: http(),
    });
    ```

=== "Moonbase Alpha"

    ```js
    import { createWalletClient, http } from 'viem';
    import { privateKeyToAccount } from 'viem/accounts'
    import { moonbaseAlpha } from 'viem/chains';

    const privateKey = 'INSERT_PRIVATE_KEY';
    const account = privateKeyToAccount(privateKey);

    const evmSigner = createWalletClient({
      account,
      chain: moonbaseAlpha,
      transport: http(),
    });
    ```

If you want to pass in a browser extension wallet to viem, you can use the following code:

=== "Moonbeam"

    ```js
    import { createWalletClient, custom } from 'viem';
    import { moonbeam } from 'viem/chains';

    const evmSigner = createWalletClient({
      chain: moonbeam,
      transport: custom(window.ethereum),
    });
    ```

=== "Moonriver"

    ```js
    import { createWalletClient, custom } from 'viem';
    import { moonriver } from 'viem/chains';

    const evmSigner = createWalletClient({
      chain: moonriver,
      transport: custom(window.ethereum),
    });
    ```

=== "Moonbase Alpha"

    ```js
    import { createWalletClient, custom } from 'viem';
    import { moonbaseAlpha } from 'viem/chains';

    const evmSigner = createWalletClient({
      chain: moonbaseAlpha,
      transport: custom(window.ethereum),
    });
    ```

!!! note
--8<-- 'text/endpoint-setup.md'

### Create a Polkadot Signer {: #create-a-polkadot-signer }

In this example, you can use a [Polkadot.js Keyring](https://polkadot.js.org/docs/api/start/keyring/){target=\_blank} to sign transactions. Please note that this approach is not recommended for production applications.

```js
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';

const privateKey = 'INSERT_PRIVATE_KEY';

const createPolkadotSigner = async () => {
  await cryptoWaitReady();
  const keyring = new Keyring({
    ss58Format: 'INSERT_SS58_FORMAT',
    type: 'sr25519',
  });
  const pair = keyring.createFromUri(privateKey);
};

createPolkadotSigner();
```

!!! note
In the above `INSERT_PRIVATE_KEY` field, you can specify a seed phrase instead of a private key.

## Get Asset and Chain Data {: #asset-chain-data }

You can use any of the following code examples to retrieve information on the supported assets and the chains that support these assets.

### Get List of Supported Assets {: #get-list-of-supported-assets }

To get a list of all of the assets supported by the XCM SDK, you can instantiate the XCM SDK and call the [`assets`](./reference/methods.md#the-assets-method) function.

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const assets = sdkInstance.assets();

console.log('The supported assets are as follows:');
assets.assets.forEach((asset) => {
  console.log(`- ${asset.originSymbol}`);
});
```

### Get List of Supported Assets by Ecosystem {: #get-supported-assets-by-ecosystem }

To get a list of the supported assets for a particular [ecosystem](./reference/interfaces.md#the-ecosystem-type), you can pass in the ecosystem name: `polkadot`, `kusama`, or `alphanet-relay`. For example, the following snippet will get all of the Polkadot assets supported:

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const assets = sdkInstance.assets('polkadot');

console.log(
  'The supported assets within the Polkadot ecosystem are as follows:',
);
assets.assets.forEach((asset) => {
  console.log(`- ${asset.originSymbol}`);
});
```

### Get List of Supported Chains by Asset {: #get-list-of-supported-assets-by-chain }

To get a list of the supported [source](./reference/methods.md#the-source-method) and [destination](./reference/methods.md#the-destination-method) chains for a given asset, you can use the following code snippet, which logs the supported chains by asset for all of the supported assets in the Polkadot ecosystem:

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const assets = sdkInstance.assets('polkadot');

assets.assets.forEach((asset) => {
  const { sourceChains, source } = assets.asset(asset);
  console.log(`You can send ${asset.originSymbol}...`);
  if (sourceChains.length > 1) {
    sourceChains.forEach((sourceChain) => {
      const { destinationChains } = source(sourceChain);
      if (destinationChains.length > 0) {
        destinationChains.forEach((destination) => {
          console.log(`- From ${source.name} to ${destination.name}`);
        });
      }
    });
  }
});
```

## Build XCM Transfer Data {: #build-xcm-transfer-data }

To transfer an asset from one chain to another, you'll need to first build the transfer data, which defines the asset to be transferred, the source chain and address, the destination chain and address, and the associated signer for the transaction. Building the transfer data is the first step; in the next section, you'll learn how to use it to actually transfer the asset.

To get started, you'll use the [`Sdk`](./reference/methods.md#initialize-the-sdk) function, which will expose two methods for building the XCM transfer data: [`assets`](./reference/methods.md#the-assets-method) and [`getTransferData`](./reference/methods.md#the-get-transfer-data-method).

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
```

You can choose either method, as both will return the data necessary to initiate an asset transfer between the source and destination chains. Using `assets` will provide additional data along the way, including the list of supported assets and, once an asset is selected, the supported source and destination chains that can send and receive it.

The process for using `assets` to build the transfer data is as follows:

1. Call the `assets` function and optionally pass in the ecosystem that you want to retrieve a list of assets for or that the asset you want to transfer belongs to. The available ecosystems are: `polkadot`, `kusama`, and `alphanet-relay`. For example:

   ```js
   const { assets, asset } = sdkInstance.assets('polkadot');
   ```

   This will return a list of the supported assets and the [`asset`](./reference/methods.md#the-asset-method) function that can be used to define the asset to be transferred

2. Call the `asset` function and pass in the key or asset object (which includes the key and the origin symbol) to define the asset to be transferred. For example:

   ```js
   // Using the key
   const { sourceChains, source } = asset('dot');
   ```

   This will return a list of the supported source chains and the [`source`](./reference/methods.md#the-source-method) function, which is used to define the source chain to transfer the asset from

3. Call the `source` function and pass in the key or the chain object (which includes the key, name, and chain type). For example:

   ```js
   // Using the key
   const { destinationChains, destination } = source('polkadot');
   ```

   This will return a list of the supported destination chains where there is an open XCM channel from the source chain for the given asset and the [`destination`](./reference/methods.md#the-destination-method) function, which is used to define the destination chain to transfer the asset to

4. Call the `destination` function and pass in the key or the chain object (which includes the key, name, and chain type). For example:

   ```js
   // Using the key
   const { accounts } = destination('moonbeam');
   ```

   This will return the [`accounts`](./reference/methods.md#the-accounts-method) function, which is used to define the source and destination addresses and the associated signers for each address

The asset and chain objects are managed within the `@moonbeam-network/xcm-config` package. You do not need to directly interact with this package as the SDK exposes this data, but there you can find the list of [assets](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/config/src/assets.ts){target=\_blank} and [chain data](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/config/src/chains.ts){target=\_blank}.

An example of the steps described above to build the transfer data to transfer DOT from the Polkadot relay chain to Moonbeam is as follows:

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();

const fromPolkadot = async () => {
  const { assets, asset } = sdkInstance.assets();
  console.log(
    `The supported assets are: ${assets.map((asset) => asset.originSymbol)}`,
  );

  const { sourceChains, source } = asset('dot');
  console.log(
    `The supported source chains are: ${sourceChains.map(
      (chain) => chain.name,
    )}`,
  );

  const { destinationChains, destination } = source('polkadot');
  console.log(
    `The supported destination chains are: ${destinationChains.map(
      (chain) => chain.name,
    )}`,
  );

  const { accounts } = destination('moonbeam');
  const data = await accounts(
    pair.address,
    evmSigner.address, // If using viem, use evmSigner.account.address
    {
      evmSigner,
      polkadotSigner: pair,
    },
  );
};

fromPolkadot();
```

!!! note
For more information on each of the `Sdk().assets()` builder functions, including the parameters and returned data, please refer to the [XCM SDK Reference](./reference/methods.md#build-the-transfer-data-starting-with-assets){target=\_blank}.

If you don't need any of the asset or chain information, you can use the `getTransferData` function:

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();

const fromPolkadot = async () => {
  const data = await sdkInstance.getTransferData({
    destinationAddress: evmSigner.address, // If using viem, use evmSigner.account.address
    destinationKeyOrChain: 'moonbeam',
    keyOrAsset: 'dot',
    polkadotSigner: pair,
    sourceAddress: pair.address,
    sourceKeyOrChain: 'polkadot',
    evmSigner,
  });
};

fromPolkadot();
```

!!! note
For more information on the `Sdk().getTransferData()` function, including the parameters and returned data, please refer to the [XCM SDK Reference](./reference/methods.md#the-get-transfer-data-method){target=\_blank}.

As previously mentioned, the same output will be generated regardless of which method you use to build the transfer data.

??? code "Example response"

    ```js
    // Send DOT from Polkadot to Moonbeam
    // data
    {
      destination: {
        balance: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        },
        chain: l {
          ecosystem: 'polkadot',
          isTestChain: false,
          key: 'moonbeam',
          name: 'Moonbeam',
          type: 'evm-parachain',
          assetsData: [Map],
          genesisHash: '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
          parachainId: 2004,
          ss58Format: 1284,
          usesChainDecimals: false,
          weight: 1000000000,
          ws: 'wss://wss.api.moonbeam.network',
          id: 1284,
          rpc: 'https://rpc.api.moonbeam.network'
        },
        existentialDeposit: e {
          key: 'glmr',
          originSymbol: 'GLMR',
          amount: 0n,
          decimals: 18,
          symbol: 'GLMR'
        },
        fee: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 33068783n,
          decimals: 10,
          symbol: 'DOT'
        },
        min: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        }
      },
      getEstimate: [Function: getEstimate],
      isSwapPossible: true,
      max: e {
        key: 'dot',
        originSymbol: 'DOT',
        amount: 0n,
        decimals: 10,
        symbol: 'DOT'
      },
      min: e {
        key: 'dot',
        originSymbol: 'DOT',
        amount: 33068783n,
        decimals: 10,
        symbol: 'DOT'
      },
      source: {
        balance: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        },
        chain: m {
          ecosystem: 'polkadot',
          isTestChain: false,
          key: 'polkadot',
          name: 'Polkadot',
          type: 'parachain',
          assetsData: Map(0) {},
          genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
          parachainId: 0,
          ss58Format: 0,
          usesChainDecimals: false,
          weight: 1000000000,
          ws: 'wss://rpc.polkadot.io'
        },
        destinationFeeBalance: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        },
        existentialDeposit: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 10000000000n,
          decimals: 10,
          symbol: 'DOT'
        },
        fee: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 169328990n,
          decimals: 10,
          symbol: 'DOT'
        },
        feeBalance: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        },
        max: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        },
        min: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        }
      },
      swap: [AsyncFunction: swap],
      transfer: [AsyncFunction: transfer]
    }
    ```

As you may have noticed in the example response, the transfer data contains information on the asset, source, and destination chain. In addition, a few functions have been exposed:

- [`swap`](./reference/methods.md#the-swap-method) - returns the transfer data necessary to swap the asset from the destination chain back to the source chain
- [`transfer`](./reference/methods.md#the-transfer-method) - transfers a given amount of the asset from the source chain to the destination chain
- [`getEstimate`](./reference/methods.md#the-get-estimate-method) - returns an estimated amount of the asset that will be received on the destination chain, less any destination fees

## Transfer an Asset {: #transfer-an-asset }

Now that you've built the transfer data, you can transfer the asset from the source chain to the destination chain. To do so, you can use the [`transfer`](./reference/methods.md#the-transfer-method) function, but first, you'll need to specify an amount to send. You can specify the amount in integer or decimal format. For example, if you wanted to send 0.1 DOT, you could use `1000000000n` or `'0.1'`. You can use [asset conversion methods](./reference/methods.md#asset-utilities){target=\_blank}, like [`toDecimal`](./reference/methods.md#the-to-decimal-method) to convert the asset to decimal format.

For this example, you can transfer twice the minimum amount required of DOT:

```js
...

const amount = data.min.toDecimal() * 2;
console.log(`Sending from ${data.source.chain.name} amount: ${amount}`);
const hash = await data.transfer(amount);
console.log(`${data.source.chain.name} tx hash: ${hash}`);
```

As the above snippet shows, the `transfer` function returns a transaction hash on the source chain.

!!! note
For more information on the parameters and returned data for `transfer`, please refer to the [XCM SDK Reference](./reference/methods.md#the-transfer-method){target=\_blank}.

## Swap an Asset {: #swap-an-asset}

To swap an asset, you can use the same transfer data and call `data.swap()` to switch the source and destination chain information. You can call the `transfer` function to execute the swap from there.

```js
...

const swapData = await data.swap();
const amount = swapData.min.toDecimal() * 2;
console.log(`Sending from ${swapData.source.chain.name} amount: ${amount}`);
const hash = await swapData.transfer(amount);
console.log(`${swapData.source.chain.name} tx hash: ${hash}`);
```

The `swap` function returns the transfer data with the original source chain and destination chains swapped. Using the previous example of sending DOT from Polkadot to Moonbeam, the swap transfer data would send DOT from Moonbeam to Polkadot.

??? code "Example response"

    ```js
    // swapData
    {
      destination: {
        balance: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        },
        chain: m {
          ecosystem: 'polkadot',
          isTestChain: false,
          key: 'polkadot',
          name: 'Polkadot',
          type: 'parachain',
          assetsData: Map(0) {},
          genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
          parachainId: 0,
          ss58Format: 0,
          usesChainDecimals: false,
          weight: 1000000000,
          ws: 'wss://rpc.polkadot.io'
        },
        existentialDeposit: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 10000000000n,
          decimals: 10,
          symbol: 'DOT'
        },
        fee: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 169328990n,
          decimals: 10,
          symbol: 'DOT'
        },
        feeBalance: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        },
        max: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        },
        min: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        }
      },
      getEstimate: [Function: getEstimate],
      isSwapPossible: true,
      max: e {
        key: 'dot',
        originSymbol: 'DOT',
        amount: 0n,
        decimals: 10,
        symbol: 'DOT'
      },
      min: e {
        key: 'dot',
        originSymbol: 'DOT',
        amount: 33068783n,
        decimals: 10,
        symbol: 'DOT'
      },
      source: {
        balance: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        },
        chain: l {
          ecosystem: 'polkadot',
          isTestChain: false,
          key: 'moonbeam',
          name: 'Moonbeam',
          type: 'evm-parachain',
          assetsData: [Map],
          genesisHash: '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
          parachainId: 2004,
          ss58Format: 1284,
          usesChainDecimals: false,
          weight: 1000000000,
          ws: 'wss://wss.api.moonbeam.network',
          id: 1284,
          rpc: 'https://rpc.api.moonbeam.network'
        },
        destinationFeeBalance: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        },
        existentialDeposit: e {
          key: 'glmr',
          originSymbol: 'GLMR',
          amount: 0n,
          decimals: 18,
          symbol: 'GLMR'
        },
        fee: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 33068783n,
          decimals: 10,
          symbol: 'DOT'
        },
        min: e {
          key: 'dot',
          originSymbol: 'DOT',
          amount: 0n,
          decimals: 10,
          symbol: 'DOT'
        }
      },
      swap: [AsyncFunction: swap],
      transfer: [AsyncFunction: transfer]
    }
    ```

!!! note
For more information on the parameters and returned data for `swap`, please refer to the [XCM SDK Reference](./reference/methods.md#the-swap-method){target=\_blank}.

## Get an Estimate of the Asset to Be Received on the Destination Chain {: #get-estimate }

When you send an XCM message, you typically pay fees on the destination chain to execute the XCM instructions. Before you transfer the asset, you can use the [`getEstimate`](./reference/methods.md#the-get-estimate-method) function to calculate an estimated amount of the asset that will be received on the destination chain minus any fees.

The `getEstimate` function is tied to a specific transfer request as it is based on the asset being transferred and the destination chain fees, so you'll need to create the [transfer data](#build-xcm-transfer-data) first.

You must provide the amount to be transferred to the `getEstimate` function. In the following example, you'll get the estimated amount of DOT that will be received on Moonbeam when 0.1 DOT is transferred. You can specify the amount in integer (`1000000000n`) or decimal (`'0.1'`) format.

```js
...

const amount = '0.1';
const estimatedAmount = data.getEstimate(amount);

console.log(
  `The estimated amount of ${
    data.source.balance.originSymbol
  } to be received on ${
    data.destination.chain.name
  } is: ${estimatedAmount.toDecimal()} ${data.destination.balance.symbol}`
);
```

The `getEstimate` function returns the estimated amount along with information on the asset being transferred.

??? code "Example response"

    ```js
    // estimatedAmount
    {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 966931217n,
      decimals: 10,
      symbol: 'DOT'
    }
    ```

!!! note
For more information on the parameters and returned data for `getEstimate`, please refer to the [XCM SDK Reference](./reference/methods.md#the-get-estimate-method){target=\_blank}.

## Get Transfer Minimum and Maximum Amounts {: #transfer-min-max-amounts }

You can use [transfer data](#build-xcm-transfer-data) to retrieve the minimum and maximum amount of an asset that can be transferred. To do so, you'll access the `min` and `max` properties of the asset being transferred:

=== "Minimum"

    ```js
    ...

    const amount = data.min.toDecimal();
    const symbol = data.min.originSymbol;

    console.log(`You can send min: ${amount} ${symbol}`);
    ```

=== "Maximum"

    ```js
    ...

    const amount = data.max.toDecimal();
    const symbol = data.max.originSymbol;

    console.log(`You can send max: ${amount} ${symbol}`);
    ```

The `min` and `max` properties return the minimum and maximum amount of the asset that can be transferred, along with information on the asset. If the source account does not hold a balance of the chosen asset, the `data.max` amount will be `0n`.

??? code "Example response"

    ```js
    // data.min
    {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 33068783n,
      decimals: 10,
      symbol: 'DOT'
    }
    // data.max
    {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 0n,
      decimals: 10,
      symbol: 'DOT'
    }
    ```

!!! note
For more information on assets and asset amounts, please refer to the [XCM SDK Reference](./reference/interfaces.md#assets){target=\_blank}.

## Get Transfer Fees {: #get-transfer-fees }

The [transfer data](#build-xcm-transfer-data) provides information on transfer fees for the source and destination chains. You can retrieve the fees using the following snippet:

```js
...
const sourceChain = data.source.chain.name;
const sourceFee = data.source.fee;

const destinationChain = data.destination.chain.name;
const destinationFee = data.destination.fee;

console.log(
  `You will pay ${sourceFee.toDecimal()} ${
    sourceFee.symbol
  } fee on ${
    sourceChain
  } and ${destinationFee.toDecimal()} ${
    destinationFee.symbol
  } fee on ${destinationChain}.`
);
```

The `fee` property returns the fees to be paid along with information on the asset.

??? code "Example response"

    ```js
    // sourceFee
    {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 169328990n,
      decimals: 10,
      symbol: 'DOT'
    }
    // destinationFee
    {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 33068783n,
      decimals: 10,
      symbol: 'DOT'
    }
    ```

!!! note
For more information on assets and asset amounts, including fees, please refer to the [XCM SDK Reference](./reference/interfaces.md#assets){target=\_blank}.

--8<-- 'text/third-party-content.md'
