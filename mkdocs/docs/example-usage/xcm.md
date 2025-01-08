---
title: Using the XCM SDK v3
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

You'll also need an Ethereum signer if you're interacting with an Ethereum-compatible chain like Moonbeam. For that you'll need to install [viem](https://viem.sh/docs/installation){target=\_blank}:


```bash
npm install viem@2
```

## Create Signers {: #create-signers }

When transferring assets between chains, you'll need signers in place to sign the transactions. If you're interacting with an Ethereum-compatible chain that uses standard Ethereum-style H160 addresses, such as Moonbeam, you'll need to have an Ethereum signer, like a [viem Wallet Client](https://viem.sh/docs/clients/wallet.html){target=\_blank}. To interact with the relay chain or other parachains, you'll need a [Polkadot](https://polkadot.js.org/docs/api/){target=\_blank} signer.

You can pass, for example, a [browser extension wallet as a signer into viem](https://viem.sh/docs/clients/wallet.html#json-rpc-accounts){target=\_blank}, such as MetaMask. Similarly, with Polkadot, you can [pass a compatible wallet to the signer using the `@polkadot/extension-dapp` library](https://polkadot.js.org/docs/extension/){target=\_blank}.

To create an EVM signer and a Polkadot signer, you can refer to the following sections.

!!! warning
**Never store your private key or mnemonic in a JavaScript or TypeScript file.**

### Create an EVM Signer {: #create-a-evm-signer }

You can create a viem Wallet Client to pass as an EVM signer. Here are some examples of configurations:

=== "Moonbeam"

    ```js
    import { moonbeam } from '@moonbeam-network/xcm-config';
    import { createWalletClient, http, type Address } from 'viem';
    import { privateKeyToAccount } from 'viem/accounts'

    const privateKey = 'INSERT_PRIVATE_KEY';
    const account = privateKeyToAccount(privateKey as Address);

    const evmSigner = createWalletClient({
      account,
      chain: moonbeam.getViemChain(),
      transport: http(),
    });
    ```

=== "Moonriver"

    ```js
    import { moonriver } from '@moonbeam-network/xcm-config';
    import { createWalletClient, http, type Address } from 'viem';
    import { privateKeyToAccount } from 'viem/accounts'

    const privateKey = 'INSERT_PRIVATE_KEY';
    const account = privateKeyToAccount(privateKey as Address);

    const evmSigner = createWalletClient({
      account,
      chain: moonriver.getViemChain(),
      transport: http(),
    });
    ```

=== "Moonbase Alpha"

    ```js
    import { moonbaseAlpha } from '@moonbeam-network/xcm-config';
    import { createWalletClient, http, type Address } from 'viem';
    import { privateKeyToAccount } from 'viem/accounts'

    const privateKey = 'INSERT_PRIVATE_KEY';
    const account = privateKeyToAccount(privateKey as Address);

    const evmSigner = createWalletClient({
      account,
      chain: moonbaseAlpha.getViemChain(),
      transport: http(),
    });
    ```

If you want to pass in a browser extension wallet to viem, you can use the following code:

=== "Moonbeam"

    ```js
    import { moonbeam } from '@moonbeam-network/xcm-config';
    import { createWalletClient, custom } from 'viem';

    const evmSigner = createWalletClient({
      chain: moonbeam.getViemChain(),
      transport: custom(window.ethereum),
    });
    ```

=== "Moonriver"

    ```js
    import { moonriver } from '@moonbeam-network/xcm-config';
    import { createWalletClient, custom } from 'viem';

    const evmSigner = createWalletClient({
      chain: moonriver.getViemChain(),
      transport: custom(window.ethereum),
    });
    ```

=== "Moonbase Alpha"

    ```js
    import { moonbaseAlpha } from '@moonbeam-network/xcm-config';
    import { createWalletClient, custom } from 'viem';

    const evmSigner = createWalletClient({
      chain: moonbaseAlpha.getViemChain(),
      transport: custom(window.ethereum),
    });
    ```

!!! note
--8<-- 'text/endpoint-setup.md'

### Create a Polkadot Signer {: #create-a-polkadot-signer }

In this example, you can use a [Polkadot.js Keyring](https://polkadot.js.org/docs/api/start/keyring/){target=\_blank} to sign transactions. Please note that this approach is not recommended for production applications. 

```js
import { polkadot } from '@moonbeam-network/xcm-config';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';

const privateKey = 'INSERT_PRIVATE_KEY';

const createPolkadotSigner = async () => {
  await cryptoWaitReady();
  const keyring = new Keyring({
    ss58Format: polkadot.ss58Format,
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

To get a list of all of the assets supported by the XCM SDK, you can instantiate the XCM SDK and get the assets property.

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const assets = sdkInstance.assets;

console.log('The supported assets are as follows:');
assets.forEach((asset) => {
  console.log(`- ${asset.originSymbol}`);
});
```

### Get List of Supported Assets by Ecosystem {: #get-supported-assets-by-ecosystem }

<!-- TODO mjm exosystem reference -->
To get a list of the supported assets for a particular [ecosystem](./reference/interfaces.md#the-ecosystem-type), you can pass in the ecosystem: `polkadot`, `kusama`, or `alphanet-relay`. For example, the following snippet will get all of the Polkadot assets supported:

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';
import { Ecosystem } from '../../packages/types/build';

const sdkInstance = Sdk({ ecosystem: Ecosystem.Polkadot });
const assets = sdkInstance.assets;

console.log(
  'The supported assets within the Polkadot ecosystem are as follows:',
);
assets.forEach((asset) => {
  console.log(`- ${asset.originSymbol}`);
});

```

### Get List of Supported Routes by Asset {: #get-list-of-supported-routes-by-asset }
<!-- TODO mjm source and destination reference -->
To get a list of the supported [source](./reference/methods.md#the-source-method) and [destination](./reference/methods.md#the-destination-method) chains for a given asset, you can use the following code snippet, which logs the supported routes by asset for all of the supported assets in the Polkadot ecosystem:

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';
import { Ecosystem } from '../../packages/types/build';

const sdkInstance = Sdk({ ecosystem: Ecosystem.Polkadot });
const assets = sdkInstance.assets;

assets.forEach((asset) => {
  const { sources, setSource } = sdkInstance.setAsset(asset);
  console.log(`You can send ${asset.originSymbol}...`);
  if (sources.length > 1) {
    sources.forEach((source) => {
      const { destinations } = setSource(source);
      if (destinations.length > 0) {
        destinations.forEach((destination) => {
          console.log(`- From ${source.name} to ${destination.name}`);
        });
      }
    });
  }
});
```

## Build XCM Transfer Data {: #build-xcm-transfer-data }

To transfer an asset from one chain to another, you'll need to first build the transfer data, which defines the asset to be transferred, the source chain and address, the destination chain and address, and the associated signer for the transaction. Building the transfer data is the first step; in the next section, you'll learn how to use it to actually transfer the asset.

In this guide, we'll show you first how to build the transfer data if you already know the route you want to use and don't need chain or asset information. Then, we'll show you how to build the transfer data if you need to retrieve the list of supported assets and chains for a given asset, which is useful if you're building a UI to allow users to select the asset, source, and destination chains.


### Simple Example {: #build-xcm-transfer-data-simple }
<!-- TODO mjm sdk, setSource, setDestination reference -->
In this example, we want to transfer DOT from Polkadot to Moonbeam. So to get the transfer data, we'll need to set the asset, source, and destination chains. First we'll need to instantiate the SDK, by calling the [`Sdk`](./reference/methods.md#initialize-the-sdk) function and then calling the `setAsset`, `setSource`, and `setDestination` functions.
You can optionally pass in the ecosystem to the `Sdk` function, but in this example, we know the route we want to use, so there is no need to pass in the ecosystem.

```js
import { Sdk } from '@moonbeam-network/xcm-sdk';
import { dot, polkadot, moonbeam } from '@moonbeam-network/xcm-config';

const fromPolkadot = async () => {
  const transferData = await Sdk()
  .setAsset(dot)
  .setSource(polkadot)
  .setDestination(moonbeam)
.setAddresses({
  sourceAddress: pair.address,
    destinationAddress: account.address,
  });
};

fromPolkadot();
```
	
### Example with assets and chains information {: #build-xcm-transfer-data-information }

<!-- TODO mjm sdk, assets, getTransferData reference -->
To get started, you'll use the [`Sdk`](./reference/methods.md#initialize-the-sdk) function, which eventually will return the transfer data after calling a series of chained methods. In this case you'll want to include the ecosystem, as you'll need to retrieve the list of supported assets and chains for the asset you want to transfer.


```js
import { Sdk } from '@moonbeam-network/xcm-sdk';
import { Ecosystem } from '../../packages/types/build';

const sdkInstance = Sdk({ ecosystem: Ecosystem.Polkadot });
```

The chained methods will provide data on the assets and chains along the way, but the final method will return the transfer data. The process of calling the methods is as follows:

1. Get the list of supported assets for the specified ecosystem

   ```js
   const { assets, setAsset } = sdkInstance;
   ```

2. Call the `setAasset` function and pass in the key or asset object (which includes the key and the origin symbol) to define the asset to be transferred. For example:

   ```js
   import { dot } from '@moonbeam-network/xcm-config';

   // Using the key
   const { sources, setSource } = setAsset(dot);
   ```

  <!-- TODO mjm setSource reference -->
   This will return a list of the supported source chains for this asset and the [`setSource`]() function, which is used to define the source chain to transfer the asset from

3. Call the `setSource` function and pass in the chain object (which includes the key, name, and chain type). For example:

   ```js
   import { polkadot } from '@moonbeam-network/xcm-config';

   const { destinations, setDestination } = setSource(polkadot);
   ```

  <!-- TODO mjm setDestination reference -->
   This will return a list of the supported destination chains where there is an open XCM channel from the source chain for the given asset and the [`setDestination`](./reference/methods.md#the-destination-method) function, which is used to define the destination chain to transfer the asset to

4. Call the `setDestination` function and pass in the the chain object (which includes the key, name, and chain type). For example:

   ```js
   const { setAddresses } = setDestination(moonbeam);
   ```

  <!-- TODO mjm setAddresses reference -->
   This will return the [`setAddresses`](./reference/methods.md#the-accounts-method) function, which is used to define the source and destination addresses.

The asset and chain objects are managed within the `@moonbeam-network/xcm-config` package. You do not need to directly interact with this package as the SDK exposes this data, but there you can find the list of [assets](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/config/src/assets.ts){target=\_blank} and [chain data](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/config/src/chains.ts){target=\_blank}.

An example of the steps described above to build the transfer data to transfer DOT from the Polkadot relay chain to Moonbeam is as follows:

```js
import { dot, moonbeam, polkadot } from '@moonbeam-network/xcm-config';
import { Sdk } from '@moonbeam-network/xcm-sdk';
import { Ecosystem } from '../../packages/types/build';

const fromPolkadot = async () => {
  const sdkInstance = Sdk({ ecosystem: Ecosystem.Polkadot });

  const { assets, setAsset } = sdkInstance;

  console.log(
    `The supported assets are: ${assets.map((asset) => asset.originSymbol)}`,
  );

  const { sources, setSource } = setAsset(dot);
  console.log(
    `The supported source chains are: ${sources.map((chain) => chain.name)}`,
  );

  const { destinations, setDestination } = setSource(polkadot);
  console.log(
    `The supported destination chains are: ${destinations.map(
      (chain) => chain.name,
    )}`,
  );

  const { setAddresses } = setDestination(moonbeam);

  const transferData = await setAddresses({
    sourceAddress: pair.address,
    destinationAddress: account.address,
  });

}

fromPolkadot();
```

!!! note
<!-- TODO mjm set references here -->
<!-- For more information on each of the `Sdk().assets()` builder functions, including the parameters and returned data, please refer to the [XCM SDK Reference](./reference/methods.md#build-the-transfer-data-starting-with-assets){target=\_blank}. -->


!!! note
<!-- TODO mjm set references here -->
<!-- For more information on the `Sdk().getTransferData()` function, including the parameters and returned data, please refer to the [XCM SDK Reference](./reference/methods.md#the-get-transfer-data-method){target=\_blank}. -->

The same output will be generated regardless of which example you used to build the transfer data.

??? code "Example response"

    ```js
    // Send DOT from Polkadot to Moonbeam
    // transfer data
    {
      destination: {
        chain: _EvmParachain {
          assets: Map(45) {
            "aca": [Object ...],
            "astr": [Object ...],
            "aseed": [Object ...],
            "axlusdc": [Object ...],
            "bnc": [Object ...],
            "bncs": [Object ...],
            "cfg": [Object ...],
            "dai": [Object ...],
            "ded": [Object ...],
            "dot": [Object ...],
            "eq": [Object ...],
            "eqd": [Object ...],
            "fil": [Object ...],
            "glmr": [Object ...],
            "hdx": [Object ...],
            "ibtc": [Object ...],
            "intr": [Object ...],
            "ldot": [Object ...],
            "manta": [Object ...],
            "nodl": [Object ...],
            "neuro": [Object ...],
            "peaq": [Object ...],
            "pha": [Object ...],
            "pen": [Object ...],
            "ring": [Object ...],
            "sub": [Object ...],
            "usdc": [Object ...],
            "usdcwh": [Object ...],
            "usdtwh": [Object ...],
            "usdt": [Object ...],
            "vastr": [Object ...],
            "vdot": [Object ...],
            "vfil": [Object ...],
            "vglmr": [Object ...],
            "vmanta": [Object ...],
            "wbtc": [Object ...],
            "weth": [Object ...],
            "ztg": [Object ...],
            "pink": [Object ...],
            "stink": [Object ...],
            "apillon": [Object ...],
            "wifd": [Object ...],
            "wbtce": [Object ...],
            "wethe": [Object ...],
            "wstethe": [Object ...],
          },
          ecosystem: "polkadot",
          explorer: "https://moonbeam.moonscan.io",
          isTestChain: false,
          key: "moonbeam",
          name: "Moonbeam",
          wh: [Object ...],
          checkSovereignAccountBalances: false,
          genesisHash: "0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d",
          isRelay: false,
          parachainId: 2004,
          ss58Format: 1284,
          usesChainDecimals: false,
          weight: undefined,
          ws: [ "wss://wss.api.moonbeam.network" ],
          id: 1284,
          rpc: "https://rpc.api.moonbeam.network",
          isEvmSigner: true,
          contracts: undefined,
          getViemChain: [Function: getViemChain],
          nativeAsset: [Getter],
          isEqual: [Function: isEqual],
          getChainAsset: [Function: getChainAsset],
          getWormholeName: [Function: getWormholeName],
        },
        balance: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
          decimals: 10,
          ids: [Object ...],
          min: undefined,
          symbol: undefined,
          amount: 17683227925n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        existentialDeposit: _AssetAmount {
          key: "glmr",
          originSymbol: "GLMR",
          address: "0x0000000000000000000000000000000000000802",
          decimals: 18,
          ids: [Object ...],
          min: 100000000000000000n,
          symbol: undefined,
          amount: 0n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        fee: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
          decimals: 10,
          ids: [Object ...],
          min: undefined,
          symbol: undefined,
          amount: 84005160n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        min: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
          decimals: 10,
          ids: [Object ...],
          min: undefined,
          symbol: undefined,
          amount: 0n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        sovereignAccountBalances: undefined,
      },
      getEstimate: [Function: getEstimate],
      max: _AssetAmount {
        key: "dot",
        originSymbol: "DOT",
        address: undefined,
        decimals: 10,
        ids: undefined,
        min: undefined,
        symbol: undefined,
        amount: 18514479903n,
        isSame: [Function: isSame],
        isEqual: [Function: isEqual],
        copyWith: [Function: copyWith],
        convertDecimals: [Function: convertDecimals],
        toBig: [Function: toBig],
        toBigDecimal: [Function: toBigDecimal],
        toDecimal: [Function: toDecimal],
        getSymbol: [Function: getSymbol],
        getAssetId: [Function: getAssetId],
        getBalanceAssetId: [Function: getBalanceAssetId],
        getMinAssetId: [Function: getMinAssetId],
        getAssetPalletInstance: [Function: getAssetPalletInstance],
        getAssetMin: [Function: getAssetMin],
        hasOnlyAddress: [Function: hasOnlyAddress],
      },
      min: _AssetAmount {
        key: "dot",
        originSymbol: "DOT",
        address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
        decimals: 10,
        ids: {
          id: "42259045809535163221576417993425387648",
        },
        min: undefined,
        symbol: undefined,
        amount: 84005160n,
        isSame: [Function: isSame],
        isEqual: [Function: isEqual],
        copyWith: [Function: copyWith],
        convertDecimals: [Function: convertDecimals],
        toBig: [Function: toBig],
        toBigDecimal: [Function: toBigDecimal],
        toDecimal: [Function: toDecimal],
        getSymbol: [Function: getSymbol],
        getAssetId: [Function: getAssetId],
        getBalanceAssetId: [Function: getBalanceAssetId],
        getMinAssetId: [Function: getMinAssetId],
        getAssetPalletInstance: [Function: getAssetPalletInstance],
        getAssetMin: [Function: getAssetMin],
        hasOnlyAddress: [Function: hasOnlyAddress],
      },
      source: {
        balance: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: undefined,
          decimals: 10,
          ids: undefined,
          min: undefined,
          symbol: undefined,
          amount: 29159392703n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        chain: _Parachain {
          assets: Map(1) {
            "dot": [Object ...],
          },
          ecosystem: "polkadot",
          explorer: undefined,
          isTestChain: false,
          key: "polkadot",
          name: "Polkadot",
          wh: undefined,
          checkSovereignAccountBalances: true,
          genesisHash: "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
          isRelay: true,
          parachainId: 0,
          ss58Format: 0,
          usesChainDecimals: false,
          weight: undefined,
          ws: [ "wss://polkadot-rpc.dwellir.com", "wss://polkadot.api.onfinality.io/public-ws",
            "wss://rpc.polkadot.io/"
          ],
          nativeAsset: [Getter],
          isEqual: [Function: isEqual],
          getChainAsset: [Function: getChainAsset],
          getWormholeName: [Function: getWormholeName],
        },
        destinationFee: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: undefined,
          decimals: 10,
          ids: undefined,
          min: undefined,
          symbol: undefined,
          amount: 84005160n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        destinationFeeBalance: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: undefined,
          decimals: 10,
          ids: undefined,
          min: undefined,
          symbol: undefined,
          amount: 29159392703n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        existentialDeposit: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: undefined,
          decimals: 10,
          ids: undefined,
          min: undefined,
          symbol: undefined,
          amount: 10000000000n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        fee: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: undefined,
          decimals: 10,
          ids: undefined,
          min: undefined,
          symbol: undefined,
          amount: 644912800n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        feeBalance: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: undefined,
          decimals: 10,
          ids: undefined,
          min: undefined,
          symbol: undefined,
          amount: 29159392703n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        max: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: undefined,
          decimals: 10,
          ids: undefined,
          min: undefined,
          symbol: undefined,
          amount: 18514479903n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
        min: _AssetAmount {
          key: "dot",
          originSymbol: "DOT",
          address: undefined,
          decimals: 10,
          ids: undefined,
          min: undefined,
          symbol: undefined,
          amount: 0n,
          isSame: [Function: isSame],
          isEqual: [Function: isEqual],
          copyWith: [Function: copyWith],
          convertDecimals: [Function: convertDecimals],
          toBig: [Function: toBig],
          toBigDecimal: [Function: toBigDecimal],
          toDecimal: [Function: toDecimal],
          getSymbol: [Function: getSymbol],
          getAssetId: [Function: getAssetId],
          getBalanceAssetId: [Function: getBalanceAssetId],
          getMinAssetId: [Function: getMinAssetId],
          getAssetPalletInstance: [Function: getAssetPalletInstance],
          getAssetMin: [Function: getAssetMin],
          hasOnlyAddress: [Function: hasOnlyAddress],
        },
      },
      transfer: [AsyncFunction: transfer],
    }
    ```

As you may have noticed in the example response, the transfer data contains information on the asset, source, and destination chain. In addition, a couple of functions have been exposed:

- [`transfer`](./reference/methods.md#the-transfer-method) - transfers a given amount of the asset from the source chain to the destination chain
- [`getEstimate`](./reference/methods.md#the-get-estimate-method) - returns an estimated amount of the asset that will be received on the destination chain, less any destination fees

## Transfer an Asset {: #transfer-an-asset }

Now that you've built the transfer data, you can transfer the asset from the source chain to the destination chain. To do so, you can use the [`transfer`](./reference/methods.md#the-transfer-method) function, but first, you'll need to specify an amount to send. You can specify the amount in integer or decimal format. For example, if you wanted to send 0.1 DOT, you could use `1000000000n` or `'0.1'`. You can use [asset conversion methods](./reference/methods.md#asset-utilities){target=\_blank}, like [`toDecimal`](./reference/methods.md#the-to-decimal-method) to convert the asset to decimal format.
You'll also need to specify the signer you're using for the transfer.

For this example, you can transfer twice the minimum amount required of DOT:

```js
...

const amount = +transferData.min.toDecimal() * 2;
console.log(
  `Sending from ${transferData.source.chain.name} amount: ${amount}`,
);
const hash = await transferData.transfer(amount, {
  polkadotSigner: pair,
});
console.log(`${transferData.source.chain.name} tx hash: ${hash}`);
```

As the above snippet shows, the `transfer` function returns a transaction hash on the source chain.

!!! note
For more information on the parameters and returned data for `transfer`, please refer to the [XCM SDK Reference](./reference/methods.md#the-transfer-method){target=\_blank}.

## Get an Estimate of the Asset to Be Received on the Destination Chain {: #get-estimate }

When you send an XCM message, you typically pay fees on the destination chain to execute the XCM instructions. Before you transfer the asset, you can use the [`getEstimate`](./reference/methods.md#the-get-estimate-method) function to calculate an estimated amount of the asset that will be received on the destination chain minus any fees.

The `getEstimate` function is tied to a specific transfer request as it is based on the asset being transferred and the destination chain fees, so you'll need to create the [transfer data](#build-xcm-transfer-data) first.

You must provide the amount to be transferred to the `getEstimate` function. In the following example, you'll get the estimated amount of DOT that will be received on Moonbeam when 0.1 DOT is transferred. You can specify the amount in integer (`1000000000n`) or decimal (`'0.1'`) format.

```js
...

const amount = '0.1';
const estimatedAmount = transferData.getEstimate(amount);

console.log(
  `The estimated amount of ${
    transferData.source.balance.getSymbol()
  } to be received on ${
    transferData.destination.chain.name
  } is: ${estimatedAmount.toDecimal()} ${transferData.destination.balance.getSymbol()}`,
);
```

The `getEstimate` function returns the estimated amount along with information on the asset being transferred.

??? code "Example response"

    ```js
    // estimatedAmount
    _AssetAmount {
      key: "dot",
      originSymbol: "DOT",
      address: undefined,
      decimals: 10,
      ids: undefined,
      min: undefined,
      symbol: undefined,
      amount: 915994840n,
      isSame: [Function: isSame],
      isEqual: [Function: isEqual],
      copyWith: [Function: copyWith],
      convertDecimals: [Function: convertDecimals],
      toBig: [Function: toBig],
      toBigDecimal: [Function: toBigDecimal],
      toDecimal: [Function: toDecimal],
      getSymbol: [Function: getSymbol],
      getAssetId: [Function: getAssetId],
      getBalanceAssetId: [Function: getBalanceAssetId],
      getMinAssetId: [Function: getMinAssetId],
      getAssetPalletInstance: [Function: getAssetPalletInstance],
      getAssetMin: [Function: getAssetMin],
      hasOnlyAddress: [Function: hasOnlyAddress],
    }
    ```

!!! note
For more information on the parameters and returned data for `getEstimate`, please refer to the [XCM SDK Reference](./reference/methods.md#the-get-estimate-method){target=\_blank}.

## Get Transfer Minimum and Maximum Amounts {: #transfer-min-max-amounts }

You can use [transfer data](#build-xcm-transfer-data) to retrieve the minimum and maximum amount of an asset that can be transferred. To do so, you'll access the `min` and `max` properties of the asset being transferred:

=== "Minimum"

    ```js
    ...

    const amount = transferData.min.toDecimal();
    const symbol = transferData.min.getSymbol();
    
    console.log(`You can send min: ${amount} ${symbol}`);
    ```

=== "Maximum"

    ```js
    ...

    const amount = transferData.max.toDecimal();
    const symbol = transferData.max.getSymbol();
    
    console.log(`You can send max: ${amount} ${symbol}`);
    ```

The `min` and `max` properties return the minimum and maximum amount of the asset that can be transferred, along with information on the asset. If the source account does not hold a balance of the chosen asset, the `data.max` amount will be `0n`.

??? code "Example response"

    ```js
        // min
    _AssetAmount {
      key: "dot",
      originSymbol: "DOT",
      address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
      decimals: 10,
      ids: {
        id: "42259045809535163221576417993425387648",
      },
      min: undefined,
      symbol: undefined,
      amount: 84005160n,
      isSame: [Function: isSame],
      isEqual: [Function: isEqual],
      copyWith: [Function: copyWith],
      convertDecimals: [Function: convertDecimals],
      toBig: [Function: toBig],
      toBigDecimal: [Function: toBigDecimal],
      toDecimal: [Function: toDecimal],
      getSymbol: [Function: getSymbol],
      getAssetId: [Function: getAssetId],
      getBalanceAssetId: [Function: getBalanceAssetId],
      getMinAssetId: [Function: getMinAssetId],
      getAssetPalletInstance: [Function: getAssetPalletInstance],
      getAssetMin: [Function: getAssetMin],
      hasOnlyAddress: [Function: hasOnlyAddress],
    },
    // max
    _AssetAmount {
      key: "dot",
      originSymbol: "DOT",
      address: undefined,
      decimals: 10,
      ids: undefined,
      min: undefined,
      symbol: undefined,
      amount: 18514479903n,
      isSame: [Function: isSame],
      isEqual: [Function: isEqual],
      copyWith: [Function: copyWith],
      convertDecimals: [Function: convertDecimals],
      toBig: [Function: toBig],
      toBigDecimal: [Function: toBigDecimal],
      toDecimal: [Function: toDecimal],
      getSymbol: [Function: getSymbol],
      getAssetId: [Function: getAssetId],
      getBalanceAssetId: [Function: getBalanceAssetId],
      getMinAssetId: [Function: getMinAssetId],
      getAssetPalletInstance: [Function: getAssetPalletInstance],
      getAssetMin: [Function: getAssetMin],
      hasOnlyAddress: [Function: hasOnlyAddress],
    }
    ```

!!! note
For more information on assets and asset amounts, please refer to the [XCM SDK Reference](./reference/interfaces.md#assets){target=\_blank}.

## Get Transfer Fees {: #get-transfer-fees }

The [transfer data](#build-xcm-transfer-data) provides information on transfer fees for the source and destination chains. You can retrieve the fees using the following snippet:

```js
...
const sourceChain = transferData.source.chain.name;
const sourceFee = transferData.source.fee;

const destinationChain = transferData.destination.chain.name;
const destinationFee = transferData.destination.fee;

console.log(
  `You will pay ${sourceFee.toDecimal()} ${sourceFee.getSymbol()} fee on ${
    sourceChain
  } and ${destinationFee.toDecimal()} ${destinationFee.getSymbol()} fee on ${destinationChain}.`,
);
```

The `fee` property returns the fees to be paid along with information on the asset.


--8<-- 'text/third-party-content.md'
