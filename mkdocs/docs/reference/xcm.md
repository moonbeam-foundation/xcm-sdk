---
title: XCM SDK Reference - v3
description: A reference for the types and classes in the Moonbeam XCM SDK that can be used to send XCM transfers between chains within the Polkadot/Kusama ecosystems.
---

# Moonbeam XCM SDK Reference

The XCM SDK is based on defining an asset to transfer, then the source chain to send the asset from, and the destination chain to send the asset to, which, together, build the transfer data.

The following sections cover the most important types, interfaces and classes you'll encounter when working with assets, chains, and transfer data.

---

## Assets

### The [Asset](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/types/src/asset/Asset.ts){target=\_blank} Object
Defines an asset's key and symbol used on the asset's origin chain.

**Attributes**

- `key` ++"string"++ - Identifies an asset
- `originSymbol` ++"string"++ - The symbol of the asset on the asset's origin chain

---

### The [Chain Asset](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/types/src/asset/ChainAsset.ts){target=\_blank} Object 
It extends the `Asset` object and adds properties related to the asset information in a specific chain.

**Attributes**

- `address` ++"string"++ - The address of the asset on the chain
- `decimals` ++"number"++ - The number of decimals the asset has
- `ids` ++"ChainAssetIds"++ - Different identifiers of the asset on the chain for getting balances and other information
- `min` ++"bigint"++ - The minimum amount of the asset that can be transferred
- `symbol` ++"string"++ - The symbol of the asset in the chain, if different from the origin symbol

It contains methods to get the differnet asset's ids in the chain, and some utility methods, among which:

- `fromAsset` - Creates a new `ChainAsset` object using an `Asset` object as a base
- `copyWith` - Creates a new `ChainAsset` object copy, with the specified properties

### The [Asset Amount](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/types/src/asset/AssetAmount.ts){target=\_blank} Object

It's the Chain Asset object with an amount.

<div class="grid" markdown>
<div markdown>
**Attributes**

- `amount` ++"bigint"++ - The amount of the asset

It also contains utility methods for converting the amount to different formats, comparing amounts, and more. Some of the most important methods are:

- `isSame` - Checks if the asset in question is the same as another asset, without considering the amount
- `isEqual` - Checks if the asset in question is the same as another asset, and also the amount is the same
- `copyWith` - Creates a new `AssetAmount` object copy, with the specified properties
</div>

```js title="Example"
// The Asset Amount object
// USDC.Wh
{
  key: "usdcwh",
  originSymbol: "USDC.Wh",
  address: undefined,
  decimals: 6,
  ids: {
    id: 21,
  },
  min: undefined,
  symbol: undefined,
  amount: 8261697n,
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

</div>

---

## Chains

### The [Chain](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/types/src/chain/chain.ts){target=\_blank} Object
It is the base object for all chains. Contains the information that is relevant to all types of chains.

**Attributes**

- `assets` ++"Map<string, ChainAsset>"++ [:material-link-variant:](#the-chain-asset-object) - A map of all assets in the chain
- `ecosystem` ++"Ecosystem"++ - The ecosystem the chain belongs to
- `explorer` ++"string"++ - The explorer URL for the chain
- `isTestChain` ++"boolean"++ - Whether the chain is a test chain
- `key` ++"string"++ - The key of the chain
- `name` ++"string"++ - The name of the chain
- `nativeAsset` ++"Asset"++ - The native asset of the chain
- `wh` ++"WormholeConfig"++ - The Wormhole configuration for the chain (for [MRL](./mrl.md){target=\_blank} only)

It has some methods that are useful for getting information about the chain or comparing chains. One method worth mentioning is:

- `getChainAsset` - Returns the [Chain Asset](./#the-chain-asset-object) for the chain for a given asset key, [Asset](./#the-asset-object) or [Asset Amount](./#the-asset-amount-object)

---

### The [Parachain](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/types/src/chain/parachain/Parachain.ts){target=\_blank} Object
It contains information exclusive to chains in the Polkadot Ecosystem

**Example**: Hydration

**Attributes**

- `parachainId` ++"number"++ - The parachain Id in the Polkadot ecosystem
- `ss58Format` ++"number"++ - The SS58 format of the chain
- `genesisHash` ++"string"++ - The genesis hash of the chain
- `isRelay` ++"boolean"++ - Whether the chain is a relay chain
- `weight` ++"number"++ - The weight of the chain
- `ws` ++"string"++ - The WebSocket URL
- `checkSovereignAccountBalances` ++"boolean"++ - Indicates whether a check of the sovereign account balances for the asset is required when transferring to this chain. If true, a validation is made at the moment of the transfer. Defaults to `false`. 
- `usesChainDecimals` ++"boolean"++ - Used for chains that use the chain's own decimal number for some balances calculations. This case is uncommon.

The [EVM Parachain](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/types/src/chain/parachain/EvmParachain.ts){target=\_blank} object is similar to the [Parachain](./#the-parachain-object) object, but it contains additional properties for EVM chains.

---

### The [EVM Parachain](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/types/src/chain/parachain/EvmParachain.ts){target=\_blank} Object
These are parachains that use EVM signers or Ethereum type addresses.

**Example**: Moonbeam

**Attributes**

- `id` ++"number"++ - The chain Id in the Ethereum ecosystem
- `rpc` ++"string"++ - The RPC URL
- `isEvmSigner` ++"boolean"++ - Whether the chain uses an EVM signer
- `contracts` ++"Contracts"++ - Some contract addresses for the chain, used for building the transactions

---

### The [EVM Chain](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/types/src/chain/EvmChain.ts){target=\_blank} Object
It contains information exclusive to chains in the Ethereum Ecosystem. This type of chain is used for the [MRL](./mrl.md){target=\_blank} module

**Example**: Ethereum
<!-- TODO mjm add examples for the chains ? -->

**Attributes**

- `id` ++"number"++ - The chain Id in the Ethereum ecosystem
- `rpc` ++"string"++ - The RPC URL

---

## Transfer Data

<div class="grid" markdown>
<div markdown>
Defines the complete transfer data for transferring an asset, including asset, source chain, and destination chain information, as well as a few helper functions for the transfer process.

**Attributes**

- `source` ++"SourceChainTransferData"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/sdk/src/sdk.interfaces.ts){target=\_blank} - Contains all the information about the source chain and the balances of the asset to transfer and the asset used for fees.
- `destination` ++"DestinationChainTransferData"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/sdk/src/sdk.interfaces.ts){target=\_blank} - Contains all the information about the destination chain and the balances of the asset to transfer and the asset used for fees.
- `getEstimate` ++"function"++ - Returns the estimated amount of the asset to transfer to the destination chain
- `max` ++"AssetAmount"++ - The maximum amount of the asset that can be transferred
- `min` ++"AssetAmount"++ - The minimum amount of the asset that can be transferred
- `transfer` ++"function"++ [:material-link-variant:](#the-transfer-method) - The function to transfer the asset to the destination chain

</div>

```js title="Example"
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

</div>

---

### The Transfer Method

<div class="grid" markdown>
<div markdown>

`transfer()` - This is the method that actually sends the asset to the destination chain. To use it, you must first [build the transfer data](../example-usage/xcm.md#build-xcm-transfer-data) with the [Sdk method](#the-sdk-method).

**Parameters**

- `amount` ++"number | string | bigint"++ - The amount of the asset to transfer
<!-- TODO mjm fix reference -->
- `signers` ++"Signers"++ [:material-link-variant:](./interfaces.md#the-signers-object) - The signers to use for the transfer

**Returns**

- `Promise<string>` - The transaction hash of the transfer on the source chain

</div>

```js title="Example Usage"
const data = await Sdk()
  .setAsset(dot)
  .setSource(polkadot)
  .setDestination(moonbeam)
  .setAddresses({
    sourceAddress: pair.address,
    destinationAddress: account.address,
  });

const txHash = await data.transfer(1000000000000000000n, {
  polkadotSigner: pair,
  evmSigner: walletClient,
});
```
</div>

## The SDK Method

<div class="grid" markdown>
<div markdown>

This is the main method that you'll use to build the transfer data. It contains a series of chained methods that you'll use to set the information about the transfer.

**Methods**

- `Sdk()` [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/sdk/src/sdk.ts#L10){:target="_blank"} - Initializes the SDK, returns all the assets supported by a given ecosystem
- `setAsset()` - Sets the asset to be transferred, returns all the available sources for the asset
- `setSource()` - Sets the source chain to transfer the asset from, returns all the available destinations for the asset from the source chain
- `setDestination()` - Sets the destination chain to transfer the asset to
- `setAddresses()` - Sets the addresses for the transfer, returns the transfer data

</div>

```js title="Example Usage"
const data = await Sdk()
  .setAsset(dot)
  .setSource(polkadot)
  .setDestination(moonbeam)
  .setAddresses({
    sourceAddress: pair.address,
    destinationAddress: account.address,
  });

```
</div>


<!-- TODO mjm arrange / sort this page -->