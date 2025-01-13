---
title: Add Assets or Chains to the XCM SDK
description: Learn how to add an asset or chain within the Polkadot or Kusama ecosystems to the Moonbeam XCM SDK.
template: tutorial.html
---

# Contribute to the XCM SDK

## Get Started

To contribute to the XCM SDK, you'll first need to clone the GitHub repository:

```bash
git clone git@github.com:moonbeam-foundation/xcm-sdk.git
```

Then, install dependencies:

```bash
npm install
```

## Add an Asset

The first step in adding support for a new asset is to define the asset in the [assets configuration file](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/config/src/assets.ts){target=\_blank}. At this stage, assets are not bound to any chain, you are only creating a representation of the asset.

Follow these steps:

1. Open the `xcm-sdk/packages/config/src/assets.ts` file
2. Create a new variable for your asset. You'll need to create an [Asset Object](../reference/xcm.md#the-asset-object), providing the `key` and `originSymbol` of the asset

   ```ts
   export const INSERT_ASSET_NAME = new Asset({
     key: 'INSERT_KEY',
     originSymbol: 'INSERT_ORIGIN_SYMBOL',
   });
   ```

   For example, this is the configuration used for USDT:

   ```ts
   export const usdt = new Asset({
     key: 'usdt',
     originSymbol: 'USDT',
   });
   ```

3. Add your asset to the `assetsList` array at the end of the file

!!! note
Assets are listed in alphabetical order. Please make sure you follow this order when adding new assets.

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

    For example, this is the configuration for the Polkadot Asset Hub:

    ```ts
    export const polkadotAssetHub = new Parachain({
      assets: [],
      ecosystem: Ecosystem.Polkadot,
      genesisHash:
        '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f',
      key: 'Polkadot-asset-hub',
      name: 'Polkadot Asset Hub',
      nativeAsset: dot,
      parachainId: 1000,
      ss58Format: 42,
      ws: [
        'wss://asset-hub-polkadot-rpc.dwellir.com',
        'wss://polkadot-asset-hub-rpc.polkadot.io',
        'wss://statemint.api.onfinality.io/public-ws',
      ],
      checkSovereignAccountBalances: true, // one of the optional params - in this case we want to perform a check on the sovereign account balances when transferring to Polkadot Asset Hub
    })
    ```

4.  Add the newly created chain to the `chainsList` array at the end of the file

!!! note
Chains are listed in alphabetical order. Please make sure you follow this order when adding new chains.

Now that you've added the chain, you can continue to the next section to add the assets that this chain supports.

## Configure a Chain's Assets {#configure-a-chain-s-assets}

To designate a chain as a destination or source chain for an asset, you must specify the asset within the `assetsData` array of the chain's configuration. This array outlines the supported assets on the chain, and the asset information within it determines how the asset is identified or targeted on that specific chain. For example, when adding a chain's native asset, you'll need to define how the chain sees its own asset, and when adding the asset to a destination chain, you'll need to define how the destination chain sees the asset.

To enable an asset to move between chains, follow these steps to configure the source and destination chains of an asset:

1. In the `assetsData` array of the source chain, you'll need to create a [Chain Asset Object](../reference/xcm.md#the-chain-asset-object) for the asset, specifying how the asset is seen on that chain. Since the asset is already defined in the assets configuration file, you can use the `fromAsset` method to create the Chain Asset Object.

      ```ts
      new ChainAsset.fromAsset(INSERT_ASSET_FROM_ASSETS_CONFIG, {
        address: 'INSERT_ADDRESS', // Optional
        decimals: INSERT_DECIMALS,
        ids: {
          id: INSERT_CHAIN_ASSET_ID, // Optional 
          balanceId: INSERT_BALANCE_ID, // Optional, asset id for balance queries
          minId: INSERT_MIN_ID, // Optional, asset id for minimum amount queries
          palletInstance: INSERT_PALLET_INSTANCE, // Optional, index of the Assets pallet
        },
      })
      ```

      For example, this is the configuration for USDT on the Polkadot Asset Hub:

      ```ts
      export const polkadotAssetHub = new Parachain({
        ...
        assetsData: [
          ChainAsset.fromAsset(usdt, {
            decimals: 6,
            ids: {
              id: 1984, // id of the asset on Polkadot Asset Hub
              palletInstance: 50, // index of the Assets pallet, used in building the XCM extrinsic
            },
          }),
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
            ChainAsset.fromAsset(usdt, {
              address: '0xFFFFFFfFea09FB06d082fd1275CD48b191cbCD1d', // address of the asset on Moonbeam  
              decimals: 6,
              ids: {
                id: '311091173110107856861649819128533077277', // id of the asset on Moonbeam
              },
            }),
            ...
        ]
        ...
      });
      ```


The integration isn't complete yet; you'll need to define the methods used for cross-chain transfers for any new chains added. This will be covered in the following section.

## Configure a Chain Route

### Prerequisites
In this step, you have to create or update the configuration files of the chains between which you can transfer the asset. These files define the asset being transferred, the destination chain, information associated to fees, and builder functions. These builders define the pallets and methods necessary to achieve the specific goals of each type. They are as follows:

- **Balance Builder** - builds a query to retrieve the balance of an asset for a given account
- **Contract Builder** - builds the contract call for the cross-chain transfer. This is specific to EVM chains that use contracts to interact with Substrate pallets for cross-chain transfers, such as [Moonbeam's X-Tokens precompiled contract](https://docs.moonbeam.network/builders/interoperability/xcm/xc20/send-xc20s/xtokens-precompile/){target=\_blank}
- **Extrinsic Builder** - builds the extrinsic for the cross-chain transfer
- **Fee Builder** - builds the query to retrieve the fee for the execution of the cross-chain transfer
- **Minimum Asset Builder** - builds a query to retrieve the minimum amount of an asset required to be left in an account

You will need to know which pallet and method each chain is using for its XCM transactions and for fetching asset balances, and make sure that said pallets and methods are already available in the [xcm-builder package](https://github.com/moonbeam-foundation/xcm-sdk/tree/main/packages/builder){target=\_blank}.

If they aren't available, feel free to open a PR or [submit an issue on GitHub](https://github.com/moonbeam-foundation/xcm-sdk/issues/new){target=\_blank}.

### Creating the routes in the configuration files

Assuming that all of the required pallets and methods are already supported, you can create the configuration file for the source chain:

1. In the `xcm-sdk/packages/config/src/xcm-configs` directory, add a TypeScript file for the new chain. If the chain already has a configuration file, you can update it instead adding the new routes, go to step 3.
2. Use the following snippet as a starting point for adding the chain routes:

    ```ts
    import { INSERT_REQUIRED_BUILDERS } from '@moonbeam-network/xcm-builder';
    import { INSERT_REQUIRED_ASSETS } from '../assets';
    import { INSERT_SOURCE_CHAIN, INSERT_DESTINATION_CHAIN } from '../chains';
    import { ChainRoutes } from '../types/ChainRoutes';

    // The chain config name should be formatted as: 'chainName' + 'Routes'
    export const INSERT_CHAIN_CONFIG_NAME = new ChainRoutes({
      chain: INSERT_SOURCE_CHAIN, // The source chain
      routes: [], // In the next step, you'll add routes here
    });
    ```

3. As seen in the above example, a `routes` array contains the chain's routes. The route configuration defines the asset being transferred, the destination chain, information associated with fees, and the builder functions. The builder functions must be used to build the queries or calls as if they were being executed from this chain.

    You'll need to create an Route for each asset, for example:

    ```ts
    {
      source: {
        asset: INSERT_ASSET,
        balance: INSERT_BALANCE_BUILDER,
        fee: {
          asset: INSERT_FEE_ASSET,
          balance: INSERT_FEE_BALANCE_BUILDER,
          extra: INSERT_FEE_AMOUNT, // Optional
        },
        destinationFee: {
          asset: INSERT_DESTINATION_FEE_ASSET, // Optional, if the fee asset in destination have different representation in the source chain
          balance: INSERT_DESTINATION_FEE_BALANCE_BUILDER, // The builder function for the balancein the source chain for the asset used for fees in the destination chain
        },
        min: INSERT_MIN_ASSET_BUILDER, // Optional
      },
      destination: {
        asset: INSERT_ASSET, // The asset being transferred, but the representation in the destination chain
        chain: INSERT_DESTINATION_CHAIN,
        balance: INSERT_BALANCE_BUILDER,
        fee: { 
          amount: INSERT_FEE_BUILDER, // Ideally a builder function, but can be a number with the specific amount of the fee
          asset: INSERT_DESTINATION_FEE_ASSET, 
          balance: INSERT_DESTINATION_FEE_BALANCE_BUILDER, // Optional
          extra: INSERT_EXTRA_FEE_AMOUNT, // Optional
        },
        min: INSERT_MIN_ASSET_BUILDER, // Optional
      },
      extrinsic: INSERT_EXTRINSIC_BUILDER,
    }
    ```

4. Add the newly created chain configurations to the `xcmRoutesList` in the `xcm-sdk/blob/main/packages/config/src/xcm-configs/index.ts` file

!!! note
Chain configurations are listed in alphabetical order. Please follow this order when adding new chain configurations.

For example, to add support to transfer USDT from the Polkadot Asset Hub to Moonbeam, the Polkadot Asset Hub configuration file is as follows:

```ts
import {
  AssetMinBuilder,
  BalanceBuilder,
  ExtrinsicBuilder,
  FeeBuilder,
} from '@moonbeam-network/xcm-builder';
import { dot, usdt } from '../assets';
import { moonbeam, polkadotAssetHub } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

const extra = 0.036;

export const polkadotAssetHubRoutes = new ChainRoutes({
  chain: polkadotAssetHub,
  routes: [
    {
      source: {
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: dot, // fees in Polkadot Asset Hub are paid in DOT
          balance: BalanceBuilder().substrate().system().account(),
          extra,
        },
        min: AssetMinBuilder().assets().asset(),
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: usdt,
        chain: moonbeam,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: FeeBuilder()
            .xcmPaymentApi()
            .xcmPaymentFee({ isAssetReserveChain: false }),
          asset: usdt, // fees in Moonbeam are paid in USDT, in this case is the same asset as the one being transferred, but it is not always the case
        },
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
    },
  ],
});
```

You're almost there. With this configuration, you can send the asset one-way from the configured chain to the asset's specified destination chain. To send the asset back to the original source chain, you must update (or create) the specified destination chain's configurations. Considering the above example, the Moonbeam configuration file would need to be updated to transfer USDT from Moonbeam back to the Polkadot Asset Hub.

You must take the same steps in the destination chain's configuration file. If a configuration file does not exist, you must create one. Otherwise, update the chain's configuration file to include the asset route, as step three outlines.

For example, enabling USDT transfers from Moonbeam back to the Polkadot Asset Hub requires the following Moonbeam chain configuration:

```ts
import {
  AssetMinBuilder,
  BalanceBuilder,
  ContractBuilder,
} from '@moonbeam-network/xcm-builder';
import { glmr, usdt } from '../assets';
import { moonbeam, polkadotAssetHub } from '../chains';
import { ChainRoutes } from '../types/ChainRoutes';

export const moonbeamRoutes = new ChainRoutes({
  chain: moonbeam,
  routes: [
    {
      source: {
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          asset: glmr,
          balance: BalanceBuilder().substrate().system().account(),
        },
        destinationFee: {
          balance: BalanceBuilder().substrate().assets().account(),
        },
      },
      destination: {
        asset: usdt,
        chain: polkadotAssetHub,
        balance: BalanceBuilder().substrate().assets().account(),
        fee: {
          amount: 0.02,
          asset: usdt,
        },
        min: AssetMinBuilder().assets().asset(),
      },
      contract: ContractBuilder().Xtokens().transfer(),
    },
  ],
});
```

And that's it! You now know how to add new assets and chains and configure the chains that an asset can be sent to and from. To ensure that you've properly set everything up, read on to the next section.

## Test New Configurations

The SDK is configured to work for most parachains in the Polkadot ecosystem. However, any given chain might have a different or particular way of requesting a specific piece of information, for example, if it uses unconventional pallets or different methods for existing pallets.

You can use the following queries to ensure that the new configurations have been properly set up.

- `assetRegistry.assetMetadatas` - From here, we extract the `minBalance` for
  `aSEED`:

      ```js
      {
        name: aUSD SEED
        symbol: aSEED
        decimals: 12
        minimalBalance: 100,0
      }
      ```

- `assets.assetMetadatas` - Here, we get the `minBalance` for `USDT`

      ```js
      {
        owner: 15uPcYeUE2XaMiMJuR6W7QGW2LsLdKXX7F3PxKG8gcizPh3X
        issuer: 15uPcYeUE2XaMiMJuR6W7QGW2LsLdKXX7F3PxKG8gcizPh3X
        admin: 15uPcYeUE2XaMiMJuR6W7QGW2LsLdKXX7F3PxKG8gcizPh3X
        freezer: 15uPcYeUE2XaMiMJuR6W7QGW2LsLdKXX7F3PxKG8gcizPh3X
        supply: 77,998,715,321,907
        deposit: 1,000,000,000,000
        minBalance: 10,000
        isSufficient: true
        accounts: 9,151
        sufficients: 9,042
        approvals: 14
        status: Live
      }
      ```

- `balances.existentialDeposit` - This is the standard way of querying the existential deposit for most chains

      ```js
      100000000000;
      ```

Most cases are considered already, but for newly integrated chains, this data might be queried by a different pallet or function. You can check if the pallet is supported in the [Polkadot Service file](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/sdk/src/polkadot/PolkadotService.ts).
