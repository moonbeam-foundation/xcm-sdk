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

## Configure a Chain Route

### Prerequisites
These steps are the same as the [XCM SDK](./xcm.md#configure-a-chain-route){target=\_blank}, but you'll need to create the builders for the MRL routes as well. So you'll need to know which pallet, method and provider you're using for the MRL routes.
Also, you'll need to know the [type of transfer](../reference/mrl.md#transfer-types){target=\_blank} you're using, as the builders will be different depending on the type of transfer.

### Creating the routes in the configuration files

Assuming that all of the required pallets and methods are already supported, you can create the configuration file for the source chain:  

1. In the `xcm-sdk/packages/config/src/mrl-configs` directory, add a TypeScript file for the new chain. If the chain already has a configuration file, you can update it instead adding the new routes, go to step 3.
2. Use the following snippet as a starting point for adding the chain routes:

    ```ts
    import { INSERT_REQUIRED_BUILDERS } from '@moonbeam-network/xcm-builder';
    import { INSERT_REQUIRED_ASSETS } from '../assets';
    import { INSERT_SOURCE_CHAIN, INSERT_DESTINATION_CHAIN, INSERT_MOON_CHAIN } from '../chains';
    import { MrlChainRoutes } from '../types/MrlChainRoutes';

    // The chain config name should be formatted as: 'chainName' + 'Routes'
    export const INSERT_CHAIN_CONFIG_NAME = new MrlChainRoutes({
      chain: INSERT_SOURCE_CHAIN, // The source chain
      routes: [], // In the next step, you'll add routes here
    });
    ```

3. As seen in the above example, a `routes` array contains the chain's routes. The route configuration defines the asset being transferred, the destination chain, the moonchain, information associated with fees, and the builder functions. The builder functions must be used to build the queries or calls as if they were being executed from this chain. 

    You'll need to create a [Route](../reference/mrl.md#the-mrl-asset-route-object) for each asset, for example:

    ```ts
     {
      source: {
        asset: INSERT_ASSET,
        balance: INSERT_BALANCE_BUILDER,
        destinationFee: {
          asset: INSERT_DESTINATION_FEE_ASSET,
          balance: INSERT_DESTINATION_FEE_BALANCE_BUILDER,
        },
      },
      destination: {
        asset: INSERT_ASSET,
        chain: INSERT_DESTINATION_CHAIN,
        balance: INSERT_BALANCE_BUILDER,
        fee: {
          asset: INSERT_DESTINATION_FEE_ASSET,
          amount: INSERT_FEE_AMOUNT,
        },
      },
      mrl: {
        isAutomaticPossible: INSERT_IS_AUTOMATIC_POSSIBLE,
        transfer: INSERT_MRL_BUILDER,
        moonChain: {
          asset: INSERT_ASSET_IN_MOON_CHAIN,
          balance: INSERT_BALANCE_BUILDER,
          fee: {
            asset: INSERT_FEE_ASSET_MOON_CHAIN,
            amount: INSERT_FEE_AMOUNT,
            balance: INSERT_FEE_BALANCE_BUILDER,
          },
        },
      },
    },
    ```	

4. Add the newly created chain configurations to the `mrlRoutesList` in the `xcm-sdk/blob/main/packages/config/src/mrl-configs/index.ts` file

!!! note
Chain configurations are listed in alphabetical order. Please follow this order when adding new chain configurations.

For example, to add support to transfer USDT from Ethereum to Hydration, and ETH from Ethereum to Moonbeam, the Ethereum configuration file is as follows:

```ts
import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { eth, glmr, usdt, usdtwh, weth } from '../assets';
import { ethereum, hydration, moonbeam } from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const ethereumRoutes = new MrlChainRoutes({
  chain: ethereum,
  routes: [
    /**
     * Destination Hydration
     */
    {
      source: {
        asset: usdt,
        balance: BalanceBuilder().evm().erc20(),
        destinationFee: {
          asset: usdt,
          balance: BalanceBuilder().evm().erc20(),
        },
      },
      destination: {
        asset: usdtwh,
        chain: hydration,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        fee: {
          asset: usdtwh,
          amount: 0.004,
        },
      },
      mrl: {
        isAutomaticPossible: false,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: usdtwh,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
    /**
     * Destination Moonbeam
     */
    {
      source: {
        asset: eth,
        balance: BalanceBuilder().evm().native(),
        destinationFee: {
          asset: eth,
          balance: BalanceBuilder().evm().native(),
        },
      },
      destination: {
        asset: weth,
        chain: moonbeam,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: weth,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
        moonChain: {
          asset: weth,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.15,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
  ],
});

```

With this configuration, you can send the asset one-way from the configured chain to the asset's specified destination chain. To send the asset back to the original source chain, you must update (or create) the specified destination chain's configurations. Considering the above example, the Hydration configuration file would need to be updated to transfer USDT from Hydration back to Ethereum.

You must take the same steps in the destination chain's configuration file. If a configuration file does not exist, you must create one. Otherwise, update the chain's configuration file to include the asset route, as step three outlines.

For example, enabling USDT transfers from Hydration back to Ethereum requires the following Hydration chain configuration:

```ts
import { BalanceBuilder, MrlBuilder } from '@moonbeam-network/xcm-builder';
import { glmr, hdx, usdt, usdtwh } from '../assets';
import { ethereum, hydration } from '../chains';
import { MrlChainRoutes } from '../types/MrlChainRoutes';

export const hydrationRoutes = new MrlChainRoutes({
  chain: hydration,
  routes: [
    {
      source: {
        asset: usdtwh,
        balance: BalanceBuilder().substrate().tokens().accounts(),
        destinationFee: {
          asset: usdtwh,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        moonChainFee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().tokens().accounts(),
        },
        fee: {
          asset: hdx,
          balance: BalanceBuilder().substrate().system().account(),
        },
      },
      destination: {
        asset: usdt,
        chain: ethereum,
        balance: BalanceBuilder().evm().erc20(),
        fee: {
          asset: usdt,
          amount: 0,
        },
      },
      mrl: {
        isAutomaticPossible: true,
        transfer: MrlBuilder().wormhole().extrinsic().polkadotXcm().send(),
        moonChain: {
          asset: usdtwh,
          balance: BalanceBuilder().evm().erc20(),
          fee: {
            asset: glmr,
            amount: 0.1,
            balance: BalanceBuilder().substrate().system().account(),
          },
        },
      },
    },
  ],
});
```

And that's it! You now know how to add new assets and chains and configure the chains that an asset can be sent to and from. To ensure that you've properly set everything up, read on to the next section.