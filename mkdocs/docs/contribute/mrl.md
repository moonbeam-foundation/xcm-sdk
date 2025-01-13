---
title: Add Assets or Chains to the MRL SDK
description: Learn how to add an asset or chain to the Moonbeam MRL SDK.
template: tutorial.html
---

# Contribute to the MRL SDK

## Get Started

To contribute to the MRL SDK, you'll first need to clone the GitHub repository:

```bash
git clone git@github.com:moonbeam-foundation/mrl.git
```

Then, install dependencies:

```bash
npm install
```

## Add an Asset

Follow the steps outlined in the [Add an Asset](./xcm.md#add-an-asset){target=\_blank} section of the XCM SDK documentation. The process is the same for this step

## Add a Chain

The next step to support an asset integration is to add chain information for the chains in which your asset can be sent to and from to the [chains configuration file](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/config/src/chains.ts){target=\_blank}.

To add a chain, take the following steps:

1.  Open the `xcm-sdk/packages/config/src/chains.ts` file
2.  Add your asset to the list of imported assets from the assets configuration file (`./assets.ts`)
3.  Create a new variable for each chain if an entry doesn't already exist. You'll need to create a [Chain Object](../reference/xcm.md#the-chain-object), providing metadata related to the chain

    === "Parachain"

        ```ts
        new Parachain({
          assetsData: [], // Optional - In the next step, you'll add assets here
          ecosystem: Ecosystem.INSERT_ECOSYSTEM_TYPE, // Optional
          genesisHash: 'INSERT_GENESIS_HASH',
          isTestChain: INSERT_BOOLEAN, // Optional
          key: 'INSERT_KEY',
          name: 'INSERT_NAME',
          nativeAsset: INSERT_NATIVE_ASSET, // from the assets.ts file
          parachainId: INSERT_PARACHAIN_ID,
          ss58Format: INSERT_SS58_FORMAT,
          ws: ['INSERT_WSS_ENDPOINTS'],
        })

        ;
        ```

    === "EVM Parachain"

        ```ts
        new EvmParachain({
          assetsData: [], // Optional - In the next step, you'll add assets here
          ecosystem: Ecosystem.INSERT_ECOSYSTEM_TYPE, // Optional
          genesisHash: 'INSERT_GENESIS_HASH',
          id: INSERT_EVM_CHAIN_ID,
          isTestChain: INSERT_BOOLEAN, // Optional
          key: 'INSERT_KEY',
          name: 'INSERT_NAME',
          nativeAsset: INSERT_NATIVE_ASSET, // from the assets.ts file
          parachainId: INSERT_PARACHAIN_ID,
          ss58Format: INSERT_SS58_FORMAT,
          rpc: 'INSERT_RPC_ENDPOINT',
          ws: ['INSERT_WSS_ENDPOINTS'],
        })
        ```

    === "EVM Chain"

        ```ts
        new EvmChain({
          assetsData: [], // Optional - In the next step, you'll add assets here
          ecosystem: Ecosystem.INSERT_ECOSYSTEM_TYPE, // Optional
          id: INSERT_EVM_CHAIN_ID,
          isTestChain: INSERT_BOOLEAN, // Optional
          key: 'INSERT_KEY',
          name: 'INSERT_NAME',
          nativeAsset: INSERT_NATIVE_ASSET, // from the assets.ts file
          rpc: 'INSERT_RPC_ENDPOINT',
          wh: {
            name: 'INSERT_WORMHOLE_NAME',
          }, // Optional - if using Wormhole for MRL
        })
        ```

    For example, this is the configuration for adding the Ethereum chain:

    ```ts
    export const ethereum = new EvmChain({
      assets: [],
      ecosystem: Ecosystem.Polkadot,
      explorer: 'https://etherscan.io',
      id: 1,
      key: 'ethereum',
      name: 'Ethereum',
      nativeAsset: eth,
      rpc: 'https://ethereum-rpc.publicnode.com',
      wh: {
        name: 'Ethereum',
      },
    });
    ```

4.  Add the newly created chain to the `chainsList` array at the end of the file

!!! note
Chains are listed in alphabetical order. Please make sure you follow this order when adding new chains.


## Configure a Chain's Assets

Similar to the [XCM SDK](./xcm.md#configure-a-chain-s-assets){target=\_blank}, you'll need to configure the source and destination chains of an asset. 

Here are the steps to configure the source and destination chains of an asset, specifically for an MRL route.

1. In the `assetsData` array of the source chain, you'll need to create a [Chain Asset Object](../reference/xcm.md#the-chain-asset-object) for the asset, specifying how the asset is seen on that chain.

      For example, this is the configuration for USDT on Ethereum:

      ```ts
      export const ethereum = new EvmChain({
        ...
        assetsData: [
          ...
          ChainAsset.fromAsset(usdt, {
            address: '0xdac17f958d2ee523a2206206994597c13d831ec7', // address of the asset on Ethereum
            decimals: 6,
          }),
          ...
        ],
        ...
      });
      ```

2. In the destination chain's `assetsData` array, create a [Chain Asset Object](../reference/xcm.md#the-chain-asset-object) that defines the asset as seen on the destination chain. This will be different than the source chain's configurations, as every chain manages assets differently

      For example, to add support for USDT on Moonbeam, Moonbeam's chain configuration needs to include the configuration for USDT:

      ```ts
      export const moonbeam = new EvmParachain({
        assetsData: [
            ...
            ChainAsset.fromAsset(usdtwh, {
            address: '0xc30E9cA94CF52f3Bf5692aaCF81353a27052c46f', // address of the asset on Moonbeam
            decimals: 6,
            ids: {
              palletInstance: 110, // index of the Assets pallet, used for the MRL integration
            },
          }),
            ...
        ]
        ...
      });
      ```


!!! note
Note that the asset we're using is different in each chain, `usdt` in Ethereum and `usdtwh` in Moonbeam. This is because the symbol of the asset is different on each chain, in this case because USDT.wh is a representation of USDT on Wormhole. You'll need to determine which representation of the asset you're using on each chain.
