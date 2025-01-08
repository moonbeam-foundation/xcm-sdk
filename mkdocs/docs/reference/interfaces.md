---
title: XCM SDK Reference - Interfaces - v2
description: A reference for the types and interfaces in the Moonbeam XCM SDK that can be used to send XCM transfers between chains within the Polkadot/Kusama ecosystems.
---

# Moonbeam XCM SDK Reference: Types and Interfaces

The XCM SDK is based on defining an asset to transfer, then the source chain to send the asset from, and the destination chain to send the asset to, which, together, build the transfer data.

The following sections cover the most important types, interfaces and classes you'll encounter when working with assets, chains, and transfer data.

## Assets
<!-- 
### The Asset Object

<div class="grid" markdown>
<div markdown>
Defines an asset's key and symbol used on the asset's origin chain.

**Attributes**

- `key` ++"string"++ - Identifies an asset
- `originSymbol` ++"string"++ - The symbol of the asset on the asset's origin chain

</div>

```js title="Example"
// The Asset object
// For GLMR on Moonbeam
{
  key: 'glmr',
  originSymbol: 'GLMR'
}
```

</div> 

--- -->

### The Asset Amount Object

<div class="grid" markdown>
<div markdown>
Defines properties related to an asset, including `Asset` properties, the decimals and symbol of the asset, and the amount an associated source or destination address has of the asset.

!!! note
A few utility methods are available for working with the `AssetAmount` class that converts the amount to various formats. Please refer to the [Methods for Asset Conversions](./methods.md#asset-utilities) section.

**Attributes**

- `key` ++"string"++ - Identifies an asset
- `originSymbol` ++"string"++ - The symbol of the asset on the asset's origin chain
- `amount` ++"bigint"++ - Identifies a particular amount of the asset (i.e., balance, minimum, maximum, etc.)
- `decimals` ++"number"++ - The number of decimals the asset has
- `symbol` ++"string"++ - The symbol of the asset

</div>

```js title="Example"
// The Asset Amount object
// For GLMR on Moonbeam
{
  key: 'glmr',
  originSymbol: 'GLMR',
  amount: 0n,
  decimals: 18,
  symbol: 'GLMR'
}
```

</div>

---

## Chains

### The Ecosystem Type

<div class="grid" markdown>
<div markdown>
Specifies the relay chain ecosystem a chain belongs to. Can be any of the following ecosystems as defined by the `Ecosystem` enum:

```ts
enum Ecosystem {
  Polkadot = 'polkadot',
  Kusama = 'kusama',
  AlphanetRelay = 'alphanet-relay',
}
```

</div>

```js title="Example"
// The Ecosystem Type
{
  ecosystem: 'polkadot',
}
```

</div>

---

### The Chain Type

<div class="grid" markdown>
<div markdown>
Specifies what kind of parachain a chain is.

```ts
enum ChainType {
  'Parachain' = 'parachain',
  'EvmParachain' = 'evm-parachain',
}
```

</div>

```js title="Example"
// The Chain Type
{
  type: 'evm-parachain',
}
```

</div>

---

### The Chain Asset ID Type

<div class="grid" markdown>
<div markdown>
A generic type used to specify the location of the asset on the chain, which is different on every chain.

```ts
type ChainAssetId = string | number | bigint | { [key: string]: ChainAssetId };
```

</div>

```js title="Example"
// The Chain Asset ID Type
// To target DOT on Moonbeam
{
  id: '42259045809535163221576417993425387648',
}
```

</div>

---

### The Chain Object

<div class="grid" markdown>
<div markdown>
Defines properties related to a chain and is used to define the source and destination chains. If a chain is an EVM parachain, there are a couple of additional properties.

**Attributes**

- `ecosystem` ++"Ecosystem"++ [:material-link-variant:](#the-ecosystem-type) - Identifies the ecosystem the chain belongs to: `polkadot`, `kusama`, or `alphanet-relay`
- `isTestChain` ++"boolean"++ - Whether the chain is a testnet
- `key` ++"string"++ - Identifies a chain
- `name` ++"string"++ - The name of the chain
- `type` ++"ChainType"++ [:material-link-variant:](#the-chain-type) - The type of the chain: `parachain` or `evm-parachain`
- `assetsData` ++"Map<string, ChainAssetsData>"++ [:material-link-variant:](#the-chain-assets-data-object) - A list of the assets that the chain supports
- `genesisHash` ++"string"++ - The hash of the genesis block
- `parachainId` ++"number"++ - The ID of the parachain (not the EVM chain ID)
- `ss58Format` ++"number"++ - The [ss58 format](https://polkadot.js.org/docs/keyring/start/ss58/){target=\_blank} for the chain
- `usesChainDecimals` ++"boolean"++ - A flag indicating if the chain uses its own decimals in balance queries for all the assets. Defaults to `false`
- `checkSovereignAccountBalances` ++"boolean"++ - Indicates whether a check of the sovereign account balances for the asset is required when transferring to this chain. Defaults to `false`
- `ws` ++"string"++ - The WebSocket endpoint for the chain
- `id` ++"number"++ - **For EVM parachains only** - The chain ID
- `rpc` ++"string"++ - **For EVM parachains only** - The HTTP RPC endpoint for the chain

</div>

```js title="Example"
// The Chain object
// Moonbeam's Chain Object
{
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
}
```

</div>

---

### The Chain Assets Data Object

<div class="grid" markdown>
<div markdown>
Defines the information needed to target the asset on the chain. This is mostly for internal usage to accommodate how chains store their assets. The SDK defaults to the asset ID if certain properties do not apply to the given chain.

**Attributes**

- `asset` ++"Asset"++ - The asset's key and origin symbol
- `balanceId` ++"ChainAssetId"++ [:material-link-variant:](#the-chain-asset-id-type) - The balance ID of the asset. Defaults to the asset ID
- `decimals` ++"number"++ - The number of decimals the asset has
- `id` ++"ChainAssetId"++ [:material-link-variant:](#the-chain-asset-id-type) - The asset ID
- `metadataId` ++"ChainAssetId"++ [:material-link-variant:](#the-chain-asset-id-type) - The metadata ID of the asset
- `minId` ++"ChainAssetId"++ [:material-link-variant:](#the-chain-asset-id-type) - The minimum ID of the asset
- `palletInstance` ++"number"++ - The number of the pallet instance the asset belongs to
- `min` ++"number"++ - The minimum amount of the asset that is required to be left in the account for it to be active. Similar to the existential deposit, except it is for non-native assets

</div>

```js title="Example"
// The Chain Assets Data object
// To target DOT on Moonbeam
{
  asset: dot,
  id: '42259045809535163221576417993425387648',
}
```

</div>

---

## Transfer Data

### The Transfer Data Object

<div class="grid" markdown>
<div markdown>
Defines the complete transfer data for transferring an asset, including asset, source chain, and destination chain information, as well as a few helper functions for the transfer process.

**Attributes**

- `destination` ++"DestinationChainTransferData"++ [:material-link-variant:](#the-destination-chain-transfer-data-object) - The assembled destination chain and address information
- `getEstimate` ++"function"++ [:material-link-variant:](./methods.md#the-get-estimate-method) - Gets the estimated amount of the asset that the destination address will receive
- `isSwapPossible` ++"boolean"++ - Returns whether or not the swap is possible
- `max` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The maximum amount of the asset that _can_ be transferred
- `min` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The minimum amount of the asset that _can_ be transferred
- `source` ++"SourceChainTransferData"++ [:material-link-variant:](#the-source-chain-transfer-data-object) - The assembled source chain and address information
- `swap` ++"function"++ [:material-link-variant:](./methods.md#the-swap-method) - Swaps the destination and the source chains and returns the swapped transfer data
- `transfer` ++"function"++ [:material-link-variant:](./methods.md#the-transfer-method) - Transfers a given amount of the asset from the source chain to the destination chain

</div>

```js title="Example"
// The Transfer Data object
// For sending DOT from Polkadot to Moonbeam
{
  destination: {
    balance: {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 0n,
      decimals: 10,
      symbol: 'DOT'
    },
    chain: {
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
    existentialDeposit: {
      key: 'glmr',
      originSymbol: 'GLMR',
      amount: 0n,
      decimals: 18,
      symbol: 'GLMR'
    },
    fee: {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 33068783n,
      decimals: 10,
      symbol: 'DOT'
    },
    min: {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 0n,
      decimals: 10,
      symbol: 'DOT'
    }
  },
  getEstimate: [Function: getEstimate],
  isSwapPossible: true,
  max: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 0n,
    decimals: 10,
    symbol: 'DOT'
  },
  min: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 33068783n,
    decimals: 10,
    symbol: 'DOT'
  },
  source: {
    balance: {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 0n,
      decimals: 10,
      symbol: 'DOT'
    },
    chain: {
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
    destinationFeeBalance: {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 0n,
      decimals: 10,
      symbol: 'DOT'
    },
    existentialDeposit: {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 10000000000n,
      decimals: 10,
      symbol: 'DOT'
    },
    fee: {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 169328990n,
      decimals: 10,
      symbol: 'DOT'
    },
    feeBalance: {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 0n,
      decimals: 10,
      symbol: 'DOT'
    },
    max: {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 0n,
      decimals: 10,
      symbol: 'DOT'
    },
    min: {
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

</div>

---

### The Destination Chain Transfer Data Object

<div class="grid" markdown>
<div markdown>
Defines the destination chain data for the transfer.

**Attributes**

- `balance` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The balance of the asset being transferred on the destination address
- `chain` ++"AnyChain"++ [:material-link-variant:](#the-chain-object) - The destination chain information
- `existentialDeposit` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The existential deposit for the asset being transferred on the destination chain
- `fee` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The amount of fees for the asset being transferred on the destination chain
- `min` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The minimum amount of the asset to transfer. This is different than `TransferData.min`, as this dictates the minimum amount that should be received on the destination chain

</div>

```js title="Example"
// The Destination Chain Transfer Data object
// For sending DOT from Polkadot to Moonbeam
{
  balance: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 0n,
    decimals: 10,
    symbol: 'DOT'
  },
  chain: {
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
  existentialDeposit: {
    key: 'glmr',
    originSymbol: 'GLMR',
    amount: 0n,
    decimals: 18,
    symbol: 'GLMR'
  },
  fee: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 33068783n,
    decimals: 10,
    symbol: 'DOT'
  },
  min: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 0n,
    decimals: 10,
    symbol: 'DOT'
  }
}
```

</div>

---

### The Source Chain Transfer Data Object

<div class="grid" markdown>
<div markdown>
Defines the source chain data for the transfer.

**Attributes**

- `balance` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The balance of the asset being transferred for the source address
- `chain` ++"AnyChain"++ [:material-link-variant:](#the-chain-object) - The source chain information
- `destinationFeeBalance` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The balance of the asset used to pay for fees in the destination chain
- `existentialDeposit` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The existential deposit for the asset being transferred on the source chain
- `fee` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The amount of fees for the asset being transferred on the source chain
- `feeBalance` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The balance of the asset being transferred on the source chain
- `min` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The minimum amount of the asset that should be kept on the source chain, taking into consideration the `existentialDeposit` and `fee` for the transfer
- `max` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The maximum amount of the asset that _can_ be transferred

</div>

```js title="Example"
// The Source Chain Transfer Data object
// For sending DOT from Polkadot to Moonbeam
{
  balance: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 0n,
    decimals: 10,
    symbol: 'DOT'
  },
  chain: {
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
  destinationFeeBalance: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 0n,
    decimals: 10,
    symbol: 'DOT'
  },
  existentialDeposit: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 10000000000n,
    decimals: 10,
    symbol: 'DOT'
  },
  fee: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 169328990n,
    decimals: 10,
    symbol: 'DOT'
  },
  feeBalance: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 0n,
    decimals: 10,
    symbol: 'DOT'
  },
  max: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 0n,
    decimals: 10,
    symbol: 'DOT'
  },
  min: {
    key: 'dot',
    originSymbol: 'DOT',
    amount: 0n,
    decimals: 10,
    symbol: 'DOT'
  }
}
```

</div>

---

## SDK Options

### The SDK Options Object

<div class="grid" markdown>
<div markdown>
Defines options to initialize the SDK, including EVM and Polkadot signers and a custom configuration service.

**Attributes**

- `evmSigner` ++"EvmSigner"++ [:material-link-variant:](#the-evm-signer-type) - The signer for transfers involving EVM chains
- `polkadotSigner` ++"Signer | IKeyringPair"++ [:material-link-variant:](#the-polkadot-signer-type) - The signer for transfers involving non-EVM chains

</div>

```js title="Example"
// The Sdk Options object
{
  evmSigner: INSERT_EVM_SIGNER,
  polkadotSigner: INSERT_POLKADOT_SIGNER,
  configService: {
    assets: INSERT_ASSETS_MAPPING,
    chains: INSERT_CHAINS_MAPPING,
    chainsConfig: INSERT_CHAIN_CONFIG_MAPPING,
  }
}
```

</div>

---

## Signers

### The EVM Signer Type

<div class="grid" markdown>
<div markdown>
Defines the EVM signer for transfers involving EVM chains. Can be an [Ethers signer](https://docs.ethers.org/v6/api/wallet/#Wallet) or [viem Wallet Client](https://viem.sh/docs/clients/wallet).

</div>

```js title="Example"
import { ethers } from 'ethers';

const provider = new ethers.WebSocketProvider(
  'wss://wss.api.moonbeam.network',
  {
    chainId: 1284,
    name: 'moonbeam',
  },
);
const evmSigner = new ethers.Wallet('INSERT_PRIVATE_KEY', provider);
```

</div>

---

### The Polkadot Signer Type

<div class="grid" markdown>
<div markdown>
Defines the signer for transfers involving non-EVM chains. Can be a [signer](https://github.com/polkadot-js/api/blob/v11.0.2/packages/types/src/types/extrinsic.ts#L135) or a [Keyring pair](https://polkadot.js.org/docs/keyring/start/create).

</div>

```js title="Example"
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';

await cryptoWaitReady();
const keyring = new Keyring({ type: 'sr25519' });
const pair = keyring.addFromUri('INSERT_MNEMONIC');
```

</div>

---

## Configurations

The interfaces in this section are primarily used for defining your own custom configuration source and adding or updating new asset and chain configurations to the XCM SDK. To learn how to add new configurations, please refer to the [Contribute to the XCM SDK](./../contribute.md) guide.

### The Config Service Object

<div class="grid" markdown>
<div markdown>
Defines a custom configuration service. This overrides the asset and chain configurations in the [xcm-config package](https://github.com/moonbeam-foundation/xcm-sdk/tree/main/packages/config){target=\_blank}, which is exposed by default by the SDK.

**Attributes**

- `assets` ++"Map<string, Asset>"++ [:material-link-variant:](#the-asset-object) - A list of the supported assets mapping each asset key to its corresponding `Asset` object
- `chains` ++"Map<string, AnyChain>"++ [:material-link-variant:](#the-chain-object) - A list of the supported assets mapping each chain key to its corresponding `Chain` object
- `chainsConfig` ++"Map<string, ChainConfig>"++ [:material-link-variant:](#the-chain-config-object) - A list of the supported chain configurations mapping each chain key to its corresponding `ChainConfig` object

</div>

```js title="Example"
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';

await cryptoWaitReady();
const keyring = new Keyring({ type: 'sr25519' });
const pair = keyring.addFromUri('INSERT_MNEMONIC');
```

</div>

---

### The Chain Config Object

<div class="grid" markdown>
<div markdown>
Defines a chain's configurations, including information for each chain's supported assets.

**Attributes**

- `assets` ++"AssetConfig[]"++ [:material-link-variant:](#the-asset-object) - The supported asset configurations
- `chain` ++"AnyChain"++ [:material-link-variant:](#the-chain-object) - The chain's properties

</div>

```js title="Example"
// The Chain Config object
// For configuring the Polkadot Asset Hub
{
  assets: [
    ...new AssetConfig({
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
      destination: moonbeam,
      destinationFee: {
        amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
        asset: usdt,
        balance: BalanceBuilder().substrate().assets().account(),
      },
      extrinsic: ExtrinsicBuilder()
        .polkadotXcm()
        .limitedReserveTransferAssets()
        .X2(),
      fee: {
        asset: dot,
        balance: BalanceBuilder().substrate().system().account(),
        xcmDeliveryFeeAmount,
      },
      min: AssetMinBuilder().assets().asset(),
    }),
    ...
  ],
  chain: new Parachain({
    assetsData: [
      {
        asset: usdt,
        id: 1984,
        palletInstance: 50,
      },
      ...
    ],
    ecosystem: Ecosystem.Polkadot,
    genesisHash:
      '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f',
    key: 'Polkadot-asset-hub',
    name: 'Polkadot Asset Hub',
    parachainId: 1000,
    ss58Format: 42,
    ws: 'wss://polkadot-asset-hub-rpc.polkadot.io',
  })
}
```

</div>

---

### The Asset Config Object

<div class="grid" markdown>
<div markdown>
Defines an asset's configurations for a source chain and includes information about the destination chain, associated fees for transferring the asset from the source chain to the destination chain, and builder functions that define how to transfer the asset.

**Attributes**

- `asset` ++"Asset"++ [:material-link-variant:](#the-asset-object) - The asset's key and origin symbol
- `balance` ++"BalanceConfigBuilder"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/@moonbeam-network/xcm-sdk@2.2.3/packages/builder/src/balance/BalanceBuilder.interfaces.ts){target=\_blank} - The query builder for retrieving the balance of an asset for a given account
- `contract` ++"ContractConfigBuilder"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/@moonbeam-network/xcm-sdk@2.2.3/packages/builder/src/contract/ContractBuilder.interfaces.ts){target=\_blank} - The contract call builder for a cross-chain transfer. This is specific to EVM chains that use contracts to interact with Substrate pallets for cross-chain transfers, such as [Moonbeam's X-Tokens precompiled contract](https://docs.moonbeam.network/builders/interoperability/xcm/xc20/send-xc20s/xtokens-precompile/)
- `destination` ++"AnyChain"++ [:material-link-variant:](#the-chain-object) - The destination chain information
- `destinationFee` ++"DestinationFeeConfig"++ - The destination chain fees
- `extrinsic` ++"ExtrinsicConfigBuilder"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/@moonbeam-network/xcm-sdk@2.2.3/packages/builder/src/extrinsic/ExtrinsicBuilder.interfaces.ts){target=\_blank} - The extrinsic builder for a cross-chain transfer
- `fee` ++"FeeAssetConfig"++ [:material-link-variant:](#the-fee-asset-config) - The source chain fees
- `min` ++"AssetMinConfigBuilder"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/@moonbeam-network/xcm-sdk@2.2.3/packages/builder/src/asset-min/AssetMinBuilder.interfaces.ts){target=\_blank} - The query builder for retrieving the minimum amount of an asset required to be left in an account

</div>

```js title="Example"
// The Asset Config object
// For configuring USDT to be sent from
// the Polkadot Asset Hub to Moonbeam
{
  asset: usdt,
  balance: BalanceBuilder().substrate().assets().account(),
  destination: moonbeam,
  destinationFee: {
    amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
    asset: usdt,
    balance: BalanceBuilder().substrate().assets().account(),
  },
  extrinsic: ExtrinsicBuilder()
    .polkadotXcm()
    .limitedReserveTransferAssets()
    .X2(),
  fee: {
    asset: dot,
    balance: BalanceBuilder().substrate().system().account(),
    xcmDeliveryFeeAmount,
  },
  min: AssetMinBuilder().assets().asset(),
}
```

</div>

---

### The Fee Asset Config

<div class="grid" markdown>
<div markdown>
Defines the fees for a particular asset on the source chain.

**Attributes**

- `asset` ++"Asset"++ [:material-link-variant:](#the-asset-object) - The asset's key and origin symbol
- `balance` ++"BalanceConfigBuilder"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/@moonbeam-network/xcm-sdk@2.2.3/packages/builder/src/balance/BalanceBuilder.interfaces.ts){target=\_blank} - The query builder for retrieving the balance of an asset for a given account
- `xcmDeliveryFeeAmount` ++"number"++ - The delivery fee amount for the cross-chain transfer

</div>

```js title="Example"
// The Fee Asset Config object
// For configuring USDT to be sent from
// the Polkadot Asset Hub to Moonbeam
{
  asset: dot,
  balance: BalanceBuilder().substrate().system().account(),
  xcmDeliveryFeeAmount: 0.036,
}
```

</div>

### The Destination Fee Asset Config

<div class="grid" markdown>
<div markdown>
Defines the fees for a particular asset on the destination chain.

**Attributes**

- `asset` ++"Asset"++ [:material-link-variant:](#the-asset-object) - The asset's key and origin symbol
- `balance` ++"BalanceConfigBuilder"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/@moonbeam-network/xcm-sdk@2.2.3/packages/builder/src/balance/BalanceBuilder.interfaces.ts){target=\_blank} - The query builder for retrieving the balance of an asset for a given account
- `xcmDeliveryFeeAmount` ++"number"++ - The delivery fee amount for the cross-chain transfer
- `amount` ++"number | FeeConfigBuilder"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/@moonbeam-network/xcm-sdk@2.2.3/packages/builder/src/fee/FeeBuilder.interfaces.ts){target=\_blank} - The fee amount or the query builder for retrieving the fee amount for the execution of the cross-chain transfer

</div>

```js title="Example"
// The Destination Fee Asset Config object
// For configuring USDT to be sent from
// the Polkadot Asset Hub to Moonbeam
{
  asset: dot,
  balance: BalanceBuilder().substrate().system().account(),
  amount: amount: FeeBuilder()
          .xcmPaymentApi()
          .xcmPaymentFee({ isAssetReserveChain: false }),
}
```

</div>
