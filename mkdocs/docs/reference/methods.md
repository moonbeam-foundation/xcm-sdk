---
title: XCM SDK Reference - Methods - v3
description: A reference for the available methods in the Moonbeam XCM SDK that can be used to send XCM transfers between chains within the Polkadot/Kusama ecosystems.
---

# Moonbeam XCM SDK Reference: Methods

The SDK provides an API that enables you to get asset information for each supported asset, the source chains where a given asset can be sent from, and, given a source chain, the supported destination chains where the given asset can be sent. The SDK also includes helper methods related to transferring cross-chain assets, such as getting an estimated amount of the asset the destination account will receive, less any execution fees, and asset conversion methods based on the asset and the number of decimals it has. All of these enable you to transfer assets across chains easily and seamlessly.

The following sections cover the available methods in the XCM SDK.

## Initialize the SDK

<div class="grid" markdown>
<div markdown>

`Sdk()` - Exposes the methods of the XCM SDK. **Must be called first to access other SDK methods**.

**Parameters**

- `options?` ++"SdkOptions"++ - Allows you to specify an `evmSigner` or `polkadotSigner`

**Returns**

- `assets` ++"function"++ [:material-link-variant:](#the-assets-method) - Provides an entry point to building the data necessary to transfer an asset between a source chain and a destination chain
- `getTransferData` ++"function"++ [:material-link-variant:](#the-get-transfer-data-method) - Builds the data necessary to transfer an asset between a source chain and a destination chain

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
console.log(sdkInstance);
```

```js title="Response"
{
  assets: [Function: assets],
  getTransferData: [AsyncFunction: getTransferData]
}
```

</div>
</div>

---

### The Get Transfer Data Method

<div class="grid" markdown>
<div markdown>

`getTransferData()` - Builds the data necessary to transfer an asset between a source chain and a destination chain.

**Parameters**

- `destinationAddress` ++"string"++ - The address of the receiving account on the destination chain
- `destinationKeyorChain` ++"string | AnyChain"++ [:material-link-variant:](./interfaces.md#the-chain-object) - The key or `Chain` data for the destination chain
- `evmSigner?` ++"EvmSigner"++ [:material-link-variant:](./interfaces.md#the-evm-signer-type) - The signer for Ethereum-compatible chains that use H160 Ethereum-style accounts. Can be an Ethers signer or a viem Wallet Client
- `keyOrAsset` ++"string | Asset"++ [:material-link-variant:](./interfaces.md#the-asset-object) - The key or `Asset` data for the asset being transferred
- `polkadotSigner?` ++"PolkadotSigner | IKeyringPair"++ [:material-link-variant:](./interfaces.md#the-polkadot-signer-type) - The Polkadot signer or Keyring pair
- `sourceAddress` ++"string"++ - The address of the sending account on the source chain
- `sourceKeyOrChain` ++"string | AnyChain"++ [:material-link-variant:](./interfaces.md#the-chain-object) - The key or `Chain` data for the source chain

**Returns**

- ++"Promise<TransferData>"++ - The assembled transfer data, which includes the following:

  - `destination` ++"DestinationChainTransferData"++ [:material-link-variant:](./interfaces.md#the-destination-chain-transfer-data-object) - The assembled destination chain and address information
  - `getEstimate` ++"function"++ [:material-link-variant:](#the-get-estimate-method) - Gets the estimated amount of the asset that the destination address will receive
  - `isSwapPossible` ++"boolean"++ - Returns whether or not the swap is possible
  - `max` ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - The maximum amount of the asset that can be transferred
  - `min` ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - The minimum amount of the asset that can be transferred
  - `source` ++"SourceChainTransferData"++ [:material-link-variant:](./interfaces.md#the-source-chain-transfer-data-object) - The assembled source chain and address information
  - `swap` ++"function"++ [:material-link-variant:](#the-swap-method) - Swaps the destination and the source chains and returns the swapped transfer data
  - `transfer` ++"function"++ [:material-link-variant:](#the-transfer-method) - Transfers a given amount of the asset from the source chain to the destination chain

</div>
<div markdown>

```js title="Example Usage"
const transferData = await Sdk().getTransferData({
  destinationAddress: 'INSERT_MOONBEAM_ADDRESS',
  destinationKeyOrChain: 'moonbeam',
  evmSigner: INSERT_EVM_SIGNER,
  keyOrAsset: 'dot',
  polkadotSigner: INSERT_POLKADOT_SIGNER,
  sourceAddress: 'INSERT_POLKADOT_ADDRESS',
  sourceKeyOrChain: {
    key: 'polkadot',
    name: 'polkadot',
    type: 'parachain',
  },
});
console.log(transferData);
```

```js title="Response"
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
      weight: undefined,
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
      amount: 20080321n,
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
    amount: 20080321n,
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
      weight: undefined,
      ws: 'wss://polkadot-rpc.dwellir.com'
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
      amount: 163633495n,
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
</div>

---

### The Assets Method

<div class="grid" markdown>
<div markdown>

`assets()` - Provides an entry point for building the data necessary to transfer an asset between a source chain and a destination chain.

**Parameters**

- `ecosystem?` ++"Ecosystem"++ - Specify the ecosystem for a set of assets: `polkadot`, `kusama`, or `alphanet-relay`

**Returns**

- `assets` ++"Asset[]"++ - A list of the supported assets
- `asset` ++"function"++ [:material-link-variant:](#the-asset-method) - Sets the asset to be transferred. Refer to the following section on how to continue to build the transfer data using the `asset` function

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const assets = sdkInstance.assets();
console.log(assets);
```

```js title="Response"
{
  assets: [
    { key: 'aca', originSymbol: 'ACA' },
    { key: 'alan', originSymbol: 'ALAN' },
    { key: 'ampe', originSymbol: 'AMPE' },
    { key: 'aseed', originSymbol: 'aSEED' },
    { key: 'astr', originSymbol: 'ASTR' },
    ...
  ],
  asset: [Function: asset]
}
```

</div>
</div>

---

## Build the Transfer Data Starting with Assets

When building transfer data with the `Sdk().assets()` function, you'll use multiple methods to build and send the underlying XCM message.

### The Asset Method

<div class="grid" markdown>
<div markdown>

`asset()` - Sets the asset to be transferred. **Must call `assets()` first**.

**Parameters**

- `keyOrAsset` ++"string | Asset"++ [:material-link-variant:](./interfaces.md#the-asset-object) - The key or `Asset` data for the asset being transferred

**Returns**

- `sourceChains` ++"AnyChain[]"++ [:material-link-variant:](./interfaces.md#the-chain-object) - A list of the supported source chains for the specified asset
- `source` ++"function"++ [:material-link-variant:](#the-source-method) - Sets the source chain to transfer the asset from

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const sourceData = sdkInstance.assets().asset('dot');
console.log(sourceData);
```

```js title="Response"
{
  sourceChains: [
    {
      ecosystem: 'polkadot',
      isTestChain: false,
      key: 'moonbeam',
      name: 'Moonbeam',
      type: 'evm-parachain',
      assetsData: {
        'aca' => {
          asset: { key: 'aca', originSymbol: 'ACA' },
          id: '224821240862170613278369189818311486111'
        },
        'astr' => {
          asset: { key: 'astr', originSymbol: 'ASTR' },
          id: '224077081838586484055667086558292981199'
        },
        ...
      },
      genesisHash: '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
      parachainId: 2004,
      ss58Format: 1284,
      usesChainDecimals: false,
      weight: undefined,
      ws: 'wss://wss.api.moonbeam.network',
      id: 1284,
      rpc: 'https://rpc.api.moonbeam.network',
      nativeCurrency: {
        decimals: 18,
        name: 'GLMR',
        symbol: 'GLMR'
      }
    },
    {
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
      weight: undefined,
      ws: 'wss://polkadot-rpc.dwellir.com'
    }
  ],
  source: [Function: source]
}
```

</div>
</div>

---

### The Source Method

<div class="grid" markdown>
<div markdown>

`source()` - Sets the source chain from which to transfer the asset. **Must call `asset()` first**.

**Parameters**

- `keyOrChain` ++"string | AnyChain"++ [:material-link-variant:](./interfaces.md#the-chain-object) - The key or `Chain` data for the source chain

**Returns**

- `destinationChains` ++"AnyChain[]"++ [:material-link-variant:](./interfaces.md#the-chain-object) - A list of the supported destination chains for the specified asset and source chain
- `destination` ++"function"++ [:material-link-variant:](#the-destination-method) - Sets the destination chain to transfer the asset from

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const destinationData = sdkInstance.assets().asset('dot').source('polkadot');
console.log(destinationData);
```

```js title="Response"
{
  destinationChains: [
    {
      ecosystem: 'polkadot',
      isTestChain: false,
      key: 'moonbeam',
      name: 'Moonbeam',
      type: 'evm-parachain',
      assetsData: {
        'aca' => {
          asset: { key: 'aca', originSymbol: 'ACA' },
          id: '224821240862170613278369189818311486111'
        },
        'astr' => {
          asset: { key: 'astr', originSymbol: 'ASTR' },
          id: '224077081838586484055667086558292981199'
        },
        ...
      },
      genesisHash: '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
      parachainId: 2004,
      ss58Format: 1284,
      usesChainDecimals: false,
      weight: undefined,
      ws: 'wss://wss.api.moonbeam.network',
      id: 1284,
      rpc: 'https://rpc.api.moonbeam.network',
      nativeCurrency: {
        decimals: 18,
        name: 'GLMR',
        symbol: 'GLMR'
      }
    }
  ],
  destination: [Function: destination]
}
```

</div>
</div>

---

### The Destination Method

<div class="grid" markdown>
<div markdown>

`destination()` - Sets the destination chain to which to transfer the asset. **Must call `source()` first**.

**Parameters**

- `keyOrChain` ++"string | AnyChain"++ [:material-link-variant:](./interfaces.md#the-chain-object) - The key or `Chain` data for the destination chain

**Returns**

- `accounts` ++"function"++ [:material-link-variant:](#the-accounts-method) - Sets the source address, the destination address, and the signer(s) required for the transfer

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferDataWithoutAccounts = sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam');
console.log(transferDataWithoutAccounts);
```

```js title="Response"
{ accounts: [AsyncFunction: accounts] }
```

</div>
</div>

---

### The Accounts Method

<div class="grid" markdown>
<div markdown>

`accounts()` - Sets the source address, the destination address, and the signer(s) required for the transfer. **Must call `destination()` first**.

**Parameters**

- `sourceAddress` ++"string"++ - The address of the sending account on the source chain
- `destinationAddress` ++"string"++ - The address of the receiving account on the destination chain
- `signers?` ++"Partial(signers)"++ [:material-link-variant:](./interfaces.md#signers) - The EVM or Polkadot signers required to sign transactions

**Returns**

- ++"Promise<TransferData>"++ - The assembled transfer data, which includes the following:

  - `destination` ++"DestinationChainTransferData"++ [:material-link-variant:](./interfaces.md#the-destination-chain-transfer-data-object) - The assembled destination chain and address information
  - `getEstimate` ++"function"++ [:material-link-variant:](#the-get-estimate-method) - Gets the estimated amount of the asset that the destination address will receive
  - `isSwapPossible` ++"boolean"++ - Returns whether or not the swap is possible
  - `max` ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - The maximum amount of the asset that can be transferred
  - `min` ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - The minimum amount of the asset that can be transferred
  - `source` ++"SourceChainTransferData"++ [:material-link-variant:](./interfaces.md#the-source-chain-transfer-data-object) - The assembled source chain and address information
  - `swap` ++"function"++ [:material-link-variant:](#the-swap-method) - Swaps the destination and the source chains and returns the swapped transfer data
  - `transfer` ++"function"++ [:material-link-variant:](#the-transfer-method) - Transfers a given amount of the asset from the source chain to the destination chain

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferData = await sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam')
  .accounts(
    INSERT_POLKADOT_ADDRESS, // Source chain address
    INSERT_MOONBEAM_ADDRESS, // Destination chain address
    {
      evmSigner: INSERT_EVM_SIGNER,
      polkadotSigner: INSERT_POLKADOT_SIGNER,
    },
  );
console.log(transferData);
```

```js title="Response"
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
      weight: undefined,
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
      amount: 20080321n,
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
    amount: 20080321n,
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
      weight: undefined,
      ws: 'wss://polkadot-rpc.dwellir.com'
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
      amount: 163633495n,
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
</div>

---

## Consume Transfer Data

### The Swap Method

<div class="grid" markdown>
<div markdown>

`swap()` - Returns the transfer data necessary to swap the asset from the destination chain back to the source chain.

**Parameters**

None.

**Returns**

- ++"Promise<TransferData | undefined>"++ - If the swap is not possible, `undefined` is returned. If the swap is possible, the assembled transfer data is returned, which includes the following:

  - `destination` ++"DestinationChainTransferData"++ [:material-link-variant:](./interfaces.md#the-destination-chain-transfer-data-object) - The assembled destination chain and address information
  - `getEstimate` ++"function"++ [:material-link-variant:](#the-get-estimate-method) - Gets the estimated amount of the asset that the destination address will receive
  - `isSwapPossible` ++"boolean"++ - Returns whether or not the swap is possible
  - `max` ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - The maximum amount of the asset that can be transferred
  - `min` ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - The minimum amount of the asset that can be transferred
  - `source` ++"SourceChainTransferData"++ [:material-link-variant:](./interfaces.md#the-source-chain-transfer-data-object) - The assembled source chain and address information
  - `swap` ++"function"++ [:material-link-variant:](#the-swap-method) - Swaps the destination and the source chains and returns the swapped transfer data
  - `transfer` ++"function"++ [:material-link-variant:](#the-transfer-method) - Transfers a given amount of the asset from the source chain to the destination chain

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferData = await sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam')
  .accounts(
    INSERT_POLKADOT_ADDRESS, // Source chain address
    INSERT_MOONBEAM_ADDRESS, // Destination chain address
    {
      evmSigner: INSERT_EVM_SIGNER,
      polkadotSigner: INSERT_POLKADOT_SIGNER,
    },
  );

const swapData = await transferData.swap();
console.log(swapData);
```

```js title="Response"
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
      key: 'polkadot',
      name: 'Polkadot',
      type: 'parachain',
      assetsData: Map(0) {},
      genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
      parachainId: 0,
      ss58Format: 0,
      usesChainDecimals: false,
      weight: undefined,
      ws: 'wss://polkadot-rpc.dwellir.com'
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
      amount: 520000000n,
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
    amount: 10520000000n,
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
      key: 'moonbeam',
      name: 'Moonbeam',
      type: 'evm-parachain',
      assetsData: {
        'aca' => {
          asset: { key: 'aca', originSymbol: 'ACA' },
          id: '224821240862170613278369189818311486111'
        },
        'astr' => {
          asset: { key: 'astr', originSymbol: 'ASTR' },
          id: '224077081838586484055667086558292981199'
        },
        ...
      },
      genesisHash: '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
      parachainId: 2004,
      ss58Format: 1284,
      usesChainDecimals: false,
      weight: undefined,
      ws: 'wss://wss.api.moonbeam.network',
      id: 1284,
      rpc: 'https://rpc.api.moonbeam.network',
      nativeCurrency: {
        decimals: 18,
        name: 'GLMR',
        symbol: 'GLMR'
      }
    },
    destinationFeeBalance: {
      key: 'dot',
      originSymbol: 'DOT',
      amount: 0n,
      decimals: 10,
      symbol: 'DOT'
    },
    existentialDeposit: {
      key: 'glmr',
      originSymbol: 'GLMR',
      amount: 0n,
      decimals: 18,
      symbol: 'GLMR'
    },
    fee: {
      key: 'glmr',
      originSymbol: 'GLMR',
      amount: 0n,
      decimals: 18,
      symbol: 'GLMR'
    },
    feeBalance: {
      key: 'glmr',
      originSymbol: 'GLMR',
      amount: 0n,
      decimals: 18,
      symbol: 'GLMR'
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
</div>

---

### The Transfer Method

<div class="grid" markdown>
<div markdown>

`transfer()` - Transfers a given amount of the asset from the source chain to the destination chain.

**Parameters**

- `amount` ++"bigint | number| string"++ - The amount of the asset to transfer between the source and destination chains

**Returns**

- ++"Promise(string)"++ - The transaction hash for the transfer on the source chain

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferData = await sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam')
  .accounts(
    INSERT_POLKADOT_ADDRESS, // Source chain address
    INSERT_MOONBEAM_ADDRESS, // Destination chain address
    {
      evmSigner: INSERT_EVM_SIGNER,
      polkadotSigner: INSERT_POLKADOT_SIGNER,
    },
  );

const transferTxHash = await transferData.transfer();
console.log(transferTxHash);
```

```js title="Response"
0x2a1ec19aa360111c0e499c90b5a2747f2e87f49966e280daf831b856996f3952;
```

</div>
</div>

---

### The Get Estimate Method

<div class="grid" markdown>
<div markdown>

`getEstimate()` - Returns an estimated amount of the asset that will be received on the destination chain, less any destination fees.

**Parameters**

- `amount` ++"number | string"++ - The amount of the asset to transfer between the source and destination chains

**Returns**

- ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - An estimated amount of the asset that the destination address will receive

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferData = await sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam')
  .accounts(
    INSERT_POLKADOT_ADDRESS, // Source chain address
    INSERT_MOONBEAM_ADDRESS, // Destination chain address
    {
      evmSigner: INSERT_EVM_SIGNER,
      polkadotSigner: INSERT_POLKADOT_SIGNER,
    },
  );

const estimate = transferData.getEstimate(1);
console.log(estimate);
```

```js title="Response"
{
  key: 'dot',
  originSymbol: 'DOT',
  amount: 9979919679n,
  decimals: 10,
  symbol: 'DOT'
}
```

</div>
</div>

---

## Asset Utilities

The `AssetAmount` class contains the following utility functions.

### The From Asset Method

<div class="grid" markdown>
<div markdown>

`fromAsset()` - Creates an [`AssetAmount`](./interfaces.md#the-asset-amount-object) instance from an [`Asset`](./interfaces.md#the-asset-object) and some additional parameters.

!!! note
To use the `fromAsset` method, you'll need to import it from the [xcm-types package](https://github.com/moonbeam-foundation/xcm-sdk/tree/main/packages/types){target=\_blank}. To install the xcm-types package, run the following:

    ```bash
    npm i @moonbeam-network/xcm-types
    ```

**Parameters**

- `asset` ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - An `AssetAmount` instance to compare
- `params` ++"AssetAmountParams"++ - Additional parameters needed to create the `AssetAmount` instance. The `AssetAmountParams` are as follows:
  - `amount` ++"bigint"++ - Identifies a particular amount of the asset (i.e., balance, minimum, maximum, etc.)
  - `decimals` ++"number"++ - The number of decimals the asset has
  - `symbol` ++"string"++ - The symbol of the asset

**Returns**

**Returns**

- ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - The new `AssetAmount` instance

</div>
<div markdown>

```js title="Example Usage"
import { Asset, AssetAmount } from '@moonbeam-network/xcm-types';

const dot = new Asset({
  key: 'dot',
  originSymbol: 'DOT',
});
const zeroAmount = AssetAmount.fromAsset(dot, {
  amount: 0n,
  decimals: 10,
});
```

```js title="Response"
{
  key: 'dot',
  originSymbol: 'DOT',
  amount: 0n,
  decimals: 10,
  symbol: 'DOT'
}
```

</div>
</div>

---

### The Is Same Method

<div class="grid" markdown>
<div markdown>

`isSame()` - Compares two instances of [`AssetAmount`](./interfaces.md#the-asset-amount-object) and checks whether they have the same `name`, `symbol`, and `decimals` properties. This method does not compare the `amount` properties.

**Parameters**

- `asset` ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - An `AssetAmount` instance to compare

**Returns**

- ++"boolean"++ - `true` if the `AssetAmount` instances are the same or `false` if they are different

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferData = await sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam')
  .accounts(
    INSERT_POLKADOT_ADDRESS, // Source chain address
    INSERT_MOONBEAM_ADDRESS, // Destination chain address
    {
      evmSigner: INSERT_EVM_SIGNER,
      polkadotSigner: INSERT_POLKADOT_SIGNER,
    },
  );

const isSame = transferData.max.isSame(transferData.min);
console.log(isSame);
```

```js title="Response"
true;
```

</div>
</div>

---

### The Is Equal Method

<div class="grid" markdown>
<div markdown>

`isEqual()` - Compares two instances of [`AssetAmount`](./interfaces.md#the-asset-amount-object) and checks whether they have all of the same properties. This compares the `name`, `symbol`, `decimals`, and `amount` properties.

**Parameters**

- `asset` ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - An `AssetAmount` instance to compare

**Returns**

- ++"boolean"++ - `true` if the `AssetAmount` instances are the same or `false` if they are different

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferData = await sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam')
  .accounts(
    INSERT_POLKADOT_ADDRESS, // Source chain address
    INSERT_MOONBEAM_ADDRESS, // Destination chain address
    {
      evmSigner: INSERT_EVM_SIGNER,
      polkadotSigner: INSERT_POLKADOT_SIGNER,
    },
  );

const isEqual = transferData.max.isEqual(transferData.min);
console.log(isEqual);
```

```js title="Response"
false;
```

</div>
</div>

---

### The Copy With Method

<div class="grid" markdown>
<div markdown>

`copyWith()` - Creates a new instance of [`AssetAmount`](./interfaces.md#the-asset-amount-object) with properties of the original instance and overrides properties that are passed as options.

**Parameters**

- `params` ++"Partial<AssetAmountConstructorParams>"++ - The properties to apply to the new `AssetAmount` instance. The `AssetAmountConstructorParams` are as follows:
  - `amount` ++"bigint"++ - Identifies a particular amount of the asset (i.e., balance, minimum, maximum, etc.)
  - `decimals` ++"number"++ - The number of decimals the asset has
  - `symbol` ++"string"++ - The symbol of the asset

**Returns**

- ++"AssetAmount"++ [:material-link-variant:](./interfaces.md#the-asset-amount-object) - The new `AssetAmount` instance

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferData = await sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam')
  .accounts(
    INSERT_POLKADOT_ADDRESS, // Source chain address
    INSERT_MOONBEAM_ADDRESS, // Destination chain address
    {
      evmSigner: INSERT_EVM_SIGNER,
      polkadotSigner: INSERT_POLKADOT_SIGNER,
    },
  );

const estimate = transferData.getEstimate(1);
const estimateCopy = estimate.copyWith({ amount: 2 });
console.log(estimateCopy);
```

```js title="Response"
{
  key: 'dot',
  originSymbol: 'DOT',
  amount: 2n,
  decimals: 10,
  symbol: 'DOT'
}
```

</div>
</div>

---

### The To Decimal Method

<div class="grid" markdown>
<div markdown>

`toDecimal()` - Converts an [`AssetAmount`](./interfaces.md#the-asset-amount-object) to a decimal. The number to convert to decimal format and the number of decimals the asset uses are pulled automatically from the `AssetAmount`.

**Parameters**

- `maxDecimal?` ++"number"++ - The maximum number of decimal places to use. the default is `6`
- `roundType?` ++"RoundingMode"++ - Accepts an index that dictates the [rounding method](https://mikemcl.github.io/big.js/#rm){target=\_blank} to use based on the `RoundingMode` enum:

  ```js
  enum RoundingMode {
    RoundDown = 0,
    RoundHalfUp = 1,
    RoundHalfEven = 2,
    RoundUp = 3
  }
  ```

**Returns**

- ++"string"++ - The given amount in decimal format

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferData = await sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam')
  .accounts(
    INSERT_POLKADOT_ADDRESS, // Source chain address
    INSERT_MOONBEAM_ADDRESS, // Destination chain address
    {
      evmSigner: INSERT_EVM_SIGNER,
      polkadotSigner: INSERT_POLKADOT_SIGNER,
    },
  );

const estimate = transferData.getEstimate(1);
const estimateAmount = estimate.toDecimal();
console.log(estimateAmount);
```

```js title="Response"
0.997992;
```

</div>
</div>

---

### The To Big Number Method

<div class="grid" markdown>
<div markdown>

`toBig()` - Converts an [`AssetAmount`](./interfaces.md#the-asset-amount-object) to a big number.

**Parameters**

None.

**Returns**

- ++"Big"++ - The given amount in big number format

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferData = await sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam')
  .accounts(
    INSERT_POLKADOT_ADDRESS, // Source chain address
    INSERT_MOONBEAM_ADDRESS, // Destination chain address
    {
      evmSigner: INSERT_EVM_SIGNER,
      polkadotSigner: INSERT_POLKADOT_SIGNER,
    },
  );

const fee = transferData.destination.fee.toBig();
console.log(fee);
```

```js title="Response"
20080321;
```

</div>
</div>

---

### The To Big Decimal Method

<div class="grid" markdown>
<div markdown>

`toBigDecimal()` - Converts an [`AssetAmount`](./interfaces.md#the-asset-amount-object) to a decimal and then to a big number. The number to convert to decimal format and the number of decimals the asset uses are pulled automatically from the `AssetAmount`.

**Parameters**

- `maxDecimal?` ++"number"++ - The maximum number of decimal places to use. the default is `6`
- `roundType?` ++"RoundingMode"++ - Accepts an index that dictates the [rounding method](https://mikemcl.github.io/big.js/#rm){target=\_blank} to use based on the `RoundingMode` enum:

  ```js
  enum RoundingMode {
    RoundDown = 0,
    RoundHalfUp = 1,
    RoundHalfEven = 2,
    RoundUp = 3
  }
  ```

**Returns**

- ++"Big"++ - The given amount in big number decimal format

</div>
<div markdown>

```js title="Example Usage"
import { Sdk } from '@moonbeam-network/xcm-sdk';

const sdkInstance = Sdk();
const transferData = await sdkInstance
  .assets()
  .asset('dot')
  .source('polkadot')
  .destination('moonbeam')
  .accounts(
    INSERT_POLKADOT_ADDRESS, // Source chain address
    INSERT_MOONBEAM_ADDRESS, // Destination chain address
    {
      evmSigner: INSERT_EVM_SIGNER,
      polkadotSigner: INSERT_POLKADOT_SIGNER,
    },
  );

const fee = transferData.destination.fee.toBigDecimal();
console.log(fee);
```

```js title="Response"
0.002008;
```

</div>
</div>
