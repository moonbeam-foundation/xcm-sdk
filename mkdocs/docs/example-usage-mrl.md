---
title: Using the MRL SDK 
description: Use the Moonbeam XCM SDK to easily transfer  liquidity into and across the Polkadot ecosystem from other ecosystems like Ethereum
template: tutorial.html
---
# Using the Moonbeam MRL SDK

## Introduction {: #introduction }
Moonbeam Routed Liquidity (MRL) allows liquidity from any blockchain connected to Moonbeam to be seamlessly routed to Polkadot parachains. This is achieved through technologies like General Message Passing (GMP), Polkadot's Cross-Consensus Message Passing (XCM), and XCM-enabled ERC-20 tokens (XC-20s). For more details, refer to the [MRL Documentation](https://docs.moonbeam.network/builders/interoperability/mrl/){target=\_blank}.

The MRL SDK simplifies the process of routing liquidity from various blockchains into the Polkadot ecosystem by providing a set of tools and functions that abstract away the complexities of cross-chain communication, by leveraging GMP, XCM, and XC-20s.

It allows three types of transfers:

1. **From EVM chains to parachains**: Assets from chains like Ethereum to Polkadot parachains, like Hydration. A message is sent 
2. **From parachains to EVM chains**:  
3. **Bewtween Moonbeam and EVM chains**

<!-- TODO mjm add info here -->
## Install the MRL SDK {: #install-the-xcm-sdk }

To get started with the Moonbeam MRL SDK, you'll need first to install the SDK:

```bash
npm install @moonbeam-network/mrl
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

Similar to the XCM SDK, you'll need to create signers to interact with the SDK. You can refer to the [Create Signers](./example-usage.md#create-signers) section in the XCM SDK guide for more information.

## Get Chain Data {: #get-chain-data }

You can use any of the following code examples to retrieve information on the supported assets and the chains that support these assets.

### Get List of Supported Source chains {: #get-list-of-supported-source-chains }

To get a list of all of the sources supported by the MRL SDK, you can instantiate the MRL SDK and get the sources property.

```js
import { Mrl } from '@moonbeam-network/mrl';

const mrlInstance = Mrl();
const sources = mrlInstance.sources;

console.log('The supported sources are as follows:');
sources.forEach((source) => {
  console.log(`- ${source.name}`);
});
```

### Get List of Supported Sources by Ecosystem {: #get-supported-sources-by-ecosystem }
<!-- TODO mjm exosystem reference -->
To get a list of the supported sources for a particular [ecosystem](./reference/interfaces.md#the-ecosystem-type), you can pass in the ecosystem  `polkadot`, `kusama`, or `alphanet-relay`. Under the hood, the ecosystems for MRL are `Mainnet` or `Testnet`, you can extract the ecosystem from the chain configuration you're going to use. For example, the following snippet will get all of the sources supported in the ecosystem associated with Moonbeam:

```js
import { Mrl } from '@moonbeam-network/mrl';
import { moonbeam } from '@moonbeam-network/xcm-config';

const mrlInstance = Mrl({ ecosystem: moonbeam.ecosystem });
const sources = mrlInstance.sources;

console.log('The supported sources are as follows:');
sources.forEach((source) => {
  console.log(`- ${source.name}`);
});
```

### Get List of Supported Routes by Ecosystem {: #get-list-of-supported-routes-by-ecosystem }

To get a list of the supported routes for a particular ecosystem, you can use the following code snippet:

```js
import { Mrl } from '@moonbeam-network/mrl';
import { Ecosystem } from '../../packages/types/build';

const mrlInstance = Mrl({ ecosystem: Ecosystem.Polkadot });
const sources = mrlInstance.sources;

sources.forEach((source) => {
  const { destinations, setDestination } = mrlInstance.setSource(source);
  if (destinations.length > 0) {
    destinations.forEach((destination) => {
      console.log(`You can transfer from ${source.name} to ${destination.name}:`);
      const { assets } = setDestination(destination);
      if (assets.length > 0) {
        assets.forEach((asset) => {
          console.log(`- ${asset.originSymbol}`);
        });
      }
    });
  }
});
```

## Build MRL Transfer Data {: #build-mrl-transfer-data }

Much like in XCM, to transfer an asset from one chain to another, you'll need to first build the transfer data, which defines the asset to be transferred, the source chain and address, the destination chain and address, and the associated signer for the transaction. Building the transfer data is the first step; in the next section, you'll learn how to use it to actually transfer the asset.

<!-- TODO mjm reference redeem -->
In MRL transfers, the assets must be redeemed in the destination chain before they can be used by the destination address. This can be done automatically by a relayer or manually by the user. For manual redemtions, the SDK also provides a `redeem` function that can be used after the transaction is completed. It will be explained in a following section.

In this guide, we'll show you first how to build the transfer data if you already know the route you want to use and don't need chain or asset information. Then, we'll show you how to build the transfer data if you need to retrieve the list of supported assets and chains for a given asset, which is useful if you're building a UI to allow users to select the asset, source, and destination chains.


### Simple Example {: #build-mrl-transfer-data-simple }
<!-- TODO mjm mrl, assets, getTransferData reference -->
In this example, we want to transfer USDC from Ethereum to Hydration. So to get the transfer data, we'll need to set the source, and destination chains, and the asset. First we'll need to instantiate the SDK, by calling the [`Mrl`](./reference/methods.md#initialize-the-sdk) function and then calling the `setAsset`, `setSource`, and `setDestination` functions.
You can optionally pass in the ecosystem to the `Mrl` function, but in this example, we know the route we want to use, so there is no need to pass in the ecosystem.

```js
import { Mrl } from '@moonbeam-network/mrl';
import { ethereum, hydration, usdc } from '@moonbeam-network/xcm-config';

const fromEvm = async () => {
  const transferData = await Mrl()
    .setSource(ethereum)
    .setDestination(hydration)
    .setAsset(usdc)
    .setIsAutomatic(false)
    .setAddresses({
      sourceAddress: account.address,
      destinationAddress: account.address,
    });
};

fromEvm();
```	

### Example with assets and chains information {: #build-mrl-transfer-data-information }

<!-- TODO MRL function reference -->
To get started, you'll use the [`Mrl`](./reference/methods.md#initialize-the-sdk) function, which eventually will return the transfer data after calling a series of chained methods. In this case you'll want to include the ecosystem, as you'll need to retrieve the list of supported assets and chains for the asset you want to transfer.

```js
import { Mrl } from '@moonbeam-network/mrl';
import { Ecosystem } from '../../packages/types/build';

const mrlInstance = Mrl({ ecosystem: Ecosystem.Polkadot });
```

The chained methods will provide data on the assets and chains along the way, but the final method will return the transfer data. The process of calling the methods is as follows:

<!-- TODO mjm The numbers are not being displayed correctly in the page -->
1. Get the list of supported assets for the specified ecosystem

   ```js
   const { sources, setSource } = mrlInstance;
   ``` 

2. Call the `setSource` function and pass in the source chain to define the source chain for the transfer

   ```js
   import { ethereum } from '@moonbeam-network/xcm-config';

   const { destinations, setDestination } = mrlInstance.setSource(ethereum);
   ```

3. Call the `setDestination` function and pass in the destination chain to define the destination chain for the transfer

   ```js
   import { ethereum } from '@moonbeam-network/xcm-config';

   const { assets, setAsset } = mrlInstance.setDestination(hydration);
   ```

4. Call the `setAsset` function and pass in the asset to define the asset to be transferred

   ```js
   import { usdc } from '@moonbeam-network/xcm-config';

   const { setIsAutomatic } = setAsset(usdc);
   ```

5. Call the `setIsAutomatic` function and pass in the boolean value to define if the transfer should be automatic or not.

   ```js
   const { setIsAutomatic } = setIsAutomatic(false);
   ```
   <!-- TODO mjm reference chains configuration file or isAutomaticPossible -->
   There are routes in which the automatic transfer is not supported. You can check it in the [chains configuration file](https://github.com/moonbeam-foundation/mrl-config/blob/main/src/chains/chains.ts). If you set automatic as `true` for a route that is not supported, the SDK will throw an error at the moment of fetching the transfer data.

6. Call the `setAddresses` function and pass in the source and destination addresses to define the addresses for the transfer

   ```js
   const { setAddresses } = setAddresses({
     sourceAddress: account.address,
     destinationAddress: account.address,
   });
   ```
