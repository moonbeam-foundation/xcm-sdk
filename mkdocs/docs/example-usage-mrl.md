---
title: Using the MRL SDK 
description: Use the Moonbeam XCM SDK to easily transfer  liquidity into and across the Polkadot ecosystem from other ecosystems like Ethereum
template: tutorial.html
---
# Using the Moonbeam MRL SDK

## Introduction {: #introduction }

<!-- TODO mjm remove the description from this page? -->
Moonbeam Routed Liquidity (MRL) allows liquidity from any blockchain connected to Moonbeam to be seamlessly routed to Polkadot parachains. The MRL SDK simplifies the process of routing liquidity from various blockchains into the Polkadot ecosystem by providing a set of tools and functions that abstract away the complexities of cross-chain communication, by leveraging GMP, XCM, and XC-20s.

The SDK allows the three types of transfers. Here is a brief description of what happens in each:

<!-- TODO mjm reference transfer types -->
1. **From EVM chains to parachains**: Assets are sent from the EVM chain to Moonbeam via a GMP provider bridge (like Wormhole). A contract call is executed in Moonbeam which initiates the XCM transfer to the destination parachain.
2. **From parachains to EVM chains**: Assets are sent alongside a remote execution message from the parachain to Moonbeam via XCM. The message then is executed in Moonbeam, which bridges the assets to the destination EVM chain via a GMP provider bridge.
3. **Bewtween Moonbeam and EVM chains**: Assets move between Moonbeam and EVM chains via the GMP provider bridge.

In MRL transfers, the transaction must be completed in the destination chain of the bridge. This can be done automatically by a relayer or manually by the user, and the SDK supports both options.

Regardless of the type of transfer you're making, the usage of the MRL SDK is the same, with only a few considerations to be made when redeeming/completing the transfer.
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
In MRL transfers, the assets must be redeemed in the destination chain of the bridge. This can be done automatically by a relayer or manually by the user. For manual redemtions, the SDK also provides a `redeem` function that can be used after the transaction is completed. It will be explained in a following section.


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
   const { setAddresses } = setIsAutomatic(false);
   ```
   <!-- TODO mjm reference chains configuration file or isAutomaticPossible -->
   There are routes in which the automatic transfer is not supported. You can check it in the [chains configuration file](https://github.com/moonbeam-foundation/mrl-config/blob/main/src/chains/chains.ts). If you set automatic as `true` for a route that is not supported, the SDK will throw an error at the moment of fetching the transfer data.

6.  Finally call the `setAddresses` function and pass in the source and destination addresses to define the addresses for the       ransfer. This will return the transfer data including the balances of the source and destination addresses. Take into account that depending on the source or the destination chain, the address format will be different. For example, from Ethereum to Hydration, you can pass as the source the address from the EVM signer, but as the destination the address from the Polkadot signer.

An example of the steps described above to build the transfer data to transfer USDC from Ethereym to Hydration is as follows:   

```js
import { Mrl } from '@moonbeam-network/mrl';
import { hydration, usdc } from '@moonbeam-network/xcm-config';
import { ethereum } from '@moonbeam-network/xcm-config';
import { Ecosystem } from '@moonbeam-network/xcm-types';

const fromEvm = async () => {
  const mrlInstance = Mrl({ ecosystem: Ecosystem.Polkadot });
  const { sources, setSource } = mrlInstance;

  console.log(
    `The supported sources are: ${sources.map((asset) => asset.name)}`,
  );

  const { destinations, setDestination } = setSource(ethereum);
  console.log(
    `The supported destinations are: ${destinations.map((asset) => asset.name)}`,
  );

  const { assets, setAsset } = setDestination(hydration);
  console.log(
    `The supported assets are: ${assets.map((asset) => asset.originSymbol)}`,
  );

  const { setIsAutomatic } = setAsset(usdc);

  const { setAddresses } = setIsAutomatic(false);

  const transferData = await setAddresses({
    sourceAddress: account.address,
    destinationAddress: pair.address,
  });

  console.log(transferData);

};

fromEvm();

```	

The same output will be generated regardless of which example you used to build the transfer data.

??? code "Example response"

    ```js
    // Send USDC from Ethereum to Hydration
    // transfer data
    {
        destination: {
            chain: _Parachain {
            assets: Map(7) {
                "hdx": [Object ...],
                "glmr": [Object ...],
                "dai": [Object ...],
                "usdcwh": [Object ...],
                "usdtwh": [Object ...],
                "wbtc": [Object ...],
                "weth": [Object ...],
            },
            ecosystem: "polkadot",
            explorer: "https://hydradx.subscan.io",
            isTestChain: false,
            key: "hydration",
            name: "Hydration",
            wh: undefined,
            checkSovereignAccountBalances: false,
            genesisHash: "0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d",
            isRelay: false,
            parachainId: 2034,
            ss58Format: 63,
            usesChainDecimals: false,
            weight: undefined,
            ws: [ "wss://rpc.hydradx.cloud", "wss://rpc.helikon.io/hydradx", "wss://hydradx.paras.dotters.network",
                "wss://hydradx-rpc.dwellir.com"
            ],
            nativeAsset: [Getter],
            isEqual: [Function: isEqual],
            getChainAsset: [Function: getChainAsset],
            getWormholeName: [Function: getWormholeName],
            },
            balance: _AssetAmount {
            key: "usdcwh",
            originSymbol: "USDC.Wh",
            address: undefined,
            decimals: 6,
            ids: [Object ...],
            min: undefined,
            symbol: undefined,
            amount: 8271697n,
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
            key: "hdx",
            originSymbol: "HDX",
            address: undefined,
            decimals: 12,
            ids: [Object ...],
            min: undefined,
            symbol: undefined,
            amount: 1000000000000n,
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
            key: "usdcwh",
            originSymbol: "USDC.Wh",
            address: undefined,
            decimals: 6,
            ids: [Object ...],
            min: undefined,
            symbol: undefined,
            amount: 4000n,
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
            key: "usdcwh",
            originSymbol: "USDC.Wh",
            address: undefined,
            decimals: 6,
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
        isAutomaticPossible: false,
        max: _AssetAmount {
            key: "usdc",
            originSymbol: "USDC",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
            ids: undefined,
            min: undefined,
            symbol: undefined,
            amount: 3328424n,
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
            key: "usdc",
            originSymbol: "USDC",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
            ids: undefined,
            min: undefined,
            symbol: undefined,
            amount: 4000n,
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
        moonChain: {
            address: "0x98891e5FD24Ef33A488A47101F65D212Ff6E650E",
            balance: _AssetAmount {
            key: "usdcwh",
            originSymbol: "USDC.Wh",
            address: "0x931715FEE2d06333043d11F658C8CE934aC61D0c",
            decimals: 6,
            ids: [Object ...],
            min: undefined,
            symbol: undefined,
            amount: 2081768n,
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
            key: "glmr",
            originSymbol: "GLMR",
            address: "0x0000000000000000000000000000000000000802",
            decimals: 18,
            ids: [Object ...],
            min: 100000000000000000n,
            symbol: undefined,
            amount: 206735189943789999813n,
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
            fee: _AssetAmount {
            key: "glmr",
            originSymbol: "GLMR",
            address: "0x0000000000000000000000000000000000000802",
            decimals: 18,
            ids: [Object ...],
            min: 100000000000000000n,
            symbol: undefined,
            amount: 150000000000000000n,
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
        source: {
            balance: _AssetAmount {
            key: "usdc",
            originSymbol: "USDC",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
            ids: undefined,
            min: undefined,
            symbol: undefined,
            amount: 3328424n,
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
            chain: _EvmChain {
            assets: Map(7) {
                "eth": [Object ...],
                "usdc": [Object ...],
                "usdt": [Object ...],
                "dai": [Object ...],
                "wbtc": [Object ...],
                "glmr": [Object ...],
                "peaq": [Object ...],
            },
            ecosystem: "polkadot",
            explorer: "https://etherscan.io",
            isTestChain: false,
            key: "ethereum",
            name: "Ethereum",
            wh: [Object ...],
            id: 1,
            rpc: "https://ethereum-rpc.publicnode.com",
            getViemChain: [Function: getViemChain],
            nativeAsset: [Getter],
            isEqual: [Function: isEqual],
            getChainAsset: [Function: getChainAsset],
            getWormholeName: [Function: getWormholeName],
            },
            destinationFee: _AssetAmount {
            key: "usdc",
            originSymbol: "USDC",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
            ids: undefined,
            min: undefined,
            symbol: undefined,
            amount: 4000n,
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
            key: "usdc",
            originSymbol: "USDC",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
            ids: undefined,
            min: undefined,
            symbol: undefined,
            amount: 3328424n,
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
            moonChainFeeBalance: undefined,
            existentialDeposit: undefined,
            fee: _AssetAmount {
            key: "usdc",
            originSymbol: "USDC",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
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
            feeBalance: _AssetAmount {
            key: "usdc",
            originSymbol: "USDC",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
            ids: undefined,
            min: undefined,
            symbol: undefined,
            amount: 3328424n,
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
            key: "usdc",
            originSymbol: "USDC",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
            ids: undefined,
            min: undefined,
            symbol: undefined,
            amount: 3328424n,
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
            key: "usdc",
            originSymbol: "USDC",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
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
            relayerFee: _AssetAmount {
            key: "usdc",
            originSymbol: "USDC",
            address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            decimals: 6,
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
<!-- TODO mjm reference moonChain -->
As you may have noticed in the example response, the transfer data contains information on the asset, source, and destination chain, and also the moonChian. In addition, a couple of functions have been exposed:

<!-- TODO mjm reference  -->
- [`transfer`](./reference/methods.md#the-transfer-method) - transfers a given amount of the asset from the source chain to the destination chain
<!-- TODO mjm reference  -->
- [`getEstimate`](./reference/methods.md#the-get-estimate-method) - returns an estimated amount of the asset that will be received on the destination chain, less any destination fees

## Transfer an Asset {: #transfer-an-asset }

<!-- TODO mjm transfer reference -->
Now that you've built the transfer data, you can transfer the asset from the source chain to the destination chain. To do so, you can use the [`transfer`](./reference/methods.md#the-transfer-method) function, but first, you'll need to specify an amount to send. You can specify the amount in integer or decimal format. For example, if you wanted to send 0.1 USDC, you could use `100000n` or `'0.1'`. You can use [asset conversion methods](./reference/methods.md#asset-utilities){target=\_blank}, like [`toDecimal`](./reference/methods.md#the-to-decimal-method) to convert the asset to decimal format.
You'll also need to specify if the transfer is automatic or not and the signer you're using for the transfer.


For this example, you can transfer twice the minimum amount required of USDC:

```js
...

const amount = +transferData.min.toDecimal() * 1.5 + 0.000001;
console.log(
    `\nSending ${amount} ${transferData.source.balance.getSymbol()} from ${transferData.source.chain.name} to ${transferData.destination.chain.name}`,
);
const result = await transferData.transfer(amount, false, {
    evmSigner: walletClient,
});
```

The `transfer` function returns an array of strings that represent the transaction hashes. It is an array because for some assets coming from EVM chains, two transactions are sent in the process: one Approve and the actual Transfer. Where applicable, the first transaction is the Approve and the second is the Transfer. Where an Approve is not needed, only one transaction is returned.

!!! note
<!-- TODO mjm reference transfer -->
The transfer function also admits other optional parameters, which are not needed for this example. For more information on the parameters and returned data for `transfer`, please refer to the [MRL SDK Reference](./reference/methods.md#the-transfer-method){target=\_blank}.

## Redeem the Asset - Complete the Transfer {: #redeem-an-asset }

<!-- TODO mjm reference redeem -->
<!-- TODO mjm reference some information about moonChain and the flow -->
As mentioned before, if the isAutomatic flag is set to false, a manual redeem is required to complete the transfer in the destination chain of the bridge (redeem chain). Take into account that, if the transfer is from EVM chains to a Parachain, the redeem chain is the MoonChain, which is where the GMP contract call is made to initiate the XCM transfer to the destination parachain. For other types of transfers, the redeem chain is the destination chain.

This SDK also provides a function for redeeming, but the same way as with the transfer, you first have to build the redeem data.

### Build the Redeem Data {: #build-the-redeem-data }

Following the example above, you can build the redeem data by calling the [`getRedeemData`](./reference/methods.md#the-get-redeem-data-method) function, with the transfer hash that was returned from the transfer function.

Remember that for this example (Ethereum to Hydration), the redeem chain is going to be Moonbeam, which can be extracted from the transfer data as moonChain.

```js
...

const hash = result.pop();

if (!isAutomatic && hash) {
    const redeemData = await Mrl().getRedeemData({
        txId: hash,
        chain: transferData.moonChain.chain,
    });
}
```

### Redeem the Asset {: #redeem-the-asset }

<!-- TODO mjm reference redeem function -->
Once you have the redeem data, you can redeem the asset by calling the [`redeem`](./reference/methods.md#the-redeem-method) function.
You'll need to specify the signer you're using for the redeem chain. Note that the signer is different from the signer used for the transfer, as the chains are different.

```js
...

const redeemChainWalletClient = createWalletClient({
    account,
    chain: transferData.moonChain.chain.getViemChain(),
    transport: http(),
});


const redeemResult = await redeemData.redeem(redeemChainWalletClient);
```

## Get an Estimate of the Asset to Be Received on the Destination Chain {: #get-estimate }

<!-- TODO mjm getEstimate reference -->
When you send an MRL message, you typically pay fees on the destination chain to execute the XCM instructions, if any, or to pay the relayer if the transfer is set as automatic. Before you transfer the asset, you can use the [`getEstimate`](./reference/methods.md#the-get-estimate-method) function to calculate an estimated amount of the asset that will be received on the destination chain minus any fees.

<!-- TODO mjm transferData reference -->
The `getEstimate` function is tied to a specific transfer request as it is based on the asset being transferred and the destination chain fees, so you'll need to create the [transfer data](#build-xcm-transfer-data) first.

You must provide the amount to be transferred to the `getEstimate` function. In the following example, you'll get the estimated amount of DOT that will be received on Moonbeam when 0.1 DOT is transferred. You can specify the amount in integer (`1000000000n`) or decimal (`'0.1'`) format.

```js
...

const amount = '0.1';
const estimatedAmount = transferData.getEstimate(amount);

console.log(
  `The estimated amount of ${
    transferData.source.balance.originSymbol
  } to be received on ${
    transferData.destination.chain.name
  } is: ${estimatedAmount.toDecimal()} ${transferData.destination.balance.getSymbol()}`,
);
```

## Get information about the MoonChain  {: #get-moonchain-info }

<!-- TODO mjm reference moonChain -->
The MoonChain (Moonbeam for Mainnet and Moonbase Alpha for Testnet) is the chain which serves as intermediary between the Polkadot Ecosystem and external chains.

Depending on the type of transfer you're making, you may need to have balance in the MoonChain to pay for the fees. You can see the information about the balance by looking at the `moonChain` property in the transfer data.

```js
...

console.log(
    `This transfer will need to pay ${transferData.moonChain.fee.amount} ${transferData.moonChain.fee.getSymbol()} in ${transferData.moonChain.chain.name}`,
);
console.log(
    `The current balance in ${transferData.moonChain.chain.name} for the address ${transferData.moonChain.address} is ${transferData.moonChain.feeBalance.toDecimal()} ${transferData.moonChain.feeBalance.getSymbol()}`,
);
```
