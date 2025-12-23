---
title: MRL SDK Reference
description: A reference for the types and interfaces in the Moonbeam MRL SDK that can be used to send transfers between chains from the Polkadot ecosystem and external chains from outside the Polkadot ecosystem.
---

# Moonbeam MRL SDK Reference

A new module, `@moonbeam-foundation/mrl`, has been added to the Moonbeam SDK to support transfers between chains from the Polkadot ecosystem and external chains from outside the Polkadot ecosystem.

For more details about Moonbeam Routed Liquidity (MRL) itself, refer to the [MRL Documentation](https://docs.moonbeam.network/builders/interoperability/mrl/){target=\_blank}.

The MRL SDK simplifies the process of routing liquidity from various blockchains into the Polkadot ecosystem by providing a set of tools and functions that abstract away the complexities of cross-chain communication, by leveraging GMP, XCM, and XC-20s. 

To use it, chains are configured following an interface which contains all the necessary information to perform the transfers.

This sdk uses the [XCM-SDK types and concepts as base](../reference/xcm.md). In this section we'll provide a detailed reference for the most important concepts, types, interfaces and methods related to the MRL SDK.

---

## Transfer types
To understand how to use the MRL SDK, we can identify three different types of transfers, which ultimately don't affect the way the SDK is used, but depending on the type of transfer, the logic behind each one is going to be different.

Always refer to the [MRL Documentation](https://docs.moonbeam.network/builders/interoperability/mrl/){target=\_blank} for a full explanation of the process, but here is a brief overview of what happens in each type of transfers, which will help you understand how the SDK works.

---

### From EVM chains to parachains. {: #from-evm-chains-to-parachains }
Here the source chain is an [EVM chain](../reference/xcm.md#the-evm-chain-object) and the destination chain either a [Parachain](../reference/xcm.md#the-parachain-object) or an [EVM Parachain](../reference/xcm.md#the-evm-parachain-object).

1. A contract call is made in the source chain, which triggers the assets to be sent to the [Bridge Chain](#the-bridge-chain). This process is done in this sdk by leveraging a [GMP provider](https://docs.moonbeam.network/builders/interoperability/protocols/){target=\_blank}. In Moonbeam, currently the only one supported is [Wormhole](https://docs.moonbeam.network/builders/interoperability/protocols/wormhole/){target=\_blank}. There are other providers like Snowbridge in the SDK that can be used for other chains.
2. Next, to complete the transfer in th Bridge Chain, it must be executed, either manually or automatically. In Moonbeam, for example, it is executed by a relayer from [Wormhole](https://docs.moonbeam.network/builders/interoperability/protocols/wormhole/){target=\_blank}, and this execution consists of calling the [GMP precompile](https://docs.moonbeam.network/builders/ethereum/precompiles/interoperability/gmp/){target=\_blank}, which triggers the next step.
3. An XCM message is sent from Moonbeam to the destination chain, containing the assets that were sent from the source chain.

---

### From parachains to EVM chains. {: #from-parachains-to-evm-chains }

Here the source chain is a [Parachain](../reference/xcm.md#the-parachain-object) or an [EVM Parachain](../reference/xcm.md#the-evm-parachain-object) and the destination chain an [EVM chain](../reference/xcm.md#the-evm-chain-object). For transfers where the provider is Wormhole, the process is as follows:

1. An XCM message is sent from the source chain to Moonbeam, this message is a batch call containing the following information:
    - A 'transfer assets' message, containing the asset that the user wants to transfer, plus the fees necessary to complete the transfer in Moonbeam, if any.
    - A 'remote execution' message, which will be executed in Moonbeam.
    - The assets are sent to the [computed origin account](https://docs.moonbeam.network/builders/interoperability/mrl/#calculate-computed-origin-account){target=\_blank}, which is an account that can only be manipulated remotely by the source address.
    - *Note*: It is possible to only send the remote execution message, in cases where the computed origin account already has the assets necessary to complete the transfer. Refer to the [transfer method](#the-transfer-method) for information on how to do this.

2. Now that the computed origin account has the assets, the remote execution message is executed in Moonbeam, which will send the assets to the destination chain through a GMP provider. It is the same first step described in the [From EVM chains to parachains](#from-evm-chains-to-parachains) section, but in reverse.

3. The transaction must be executed in the destination chain, either manually or automatically by a relayer.

---

### Between Bridge Chain and EVM chains. {: #from-bridgechain-to-evm-chains }
This is the simplest type of transfer, as it only involves moving assets between just two chains.

1. The assets are sent from the source chain to the destination chain through a GMP provider, like in the first step of the [From EVM chains to parachains](#from-evm-chains-to-parachains) section.
2. The transaction must be executed in the destination chain, either manually or automatically by a relayer.

For this type of transfer there is no need for a polkadot signer.

---
## MRL Asset Routes

These objects define the routes for transferring assets between chains. For a more detailed explanation on how to implement them, refer to the [Contribute Section](../contribute/mrl.md#configure-a-chain-route){target=\_blank}.

<div class="grid" markdown>
<div markdown>

### The [Mrl Asset Route](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/config/src/types/MrlAssetRoute.ts){target=\_blank} Object
Each asset route is an object that contains the source and destination chains, the assets to be transferred, the fees, and the extrinsic or contract calls to be executed.

**Attributes**

- `source` ++"MrlSourceConfig"++ - Contains the information about the transfer regarding the source chain
- `destination` ++"DestinationConfig"++ - Contains the information about the transfer regarding the destination chain
- `mrl` ++"MrlConfig"++ [:material-link-variant:](#mrl-config) - Contains the information about the transfer exclusive to MRL, like information about the transfer calls and the [bridge chain](#the-bridge-chain)

#### MRL Config 

**Attributes**

- `isAutomaticPossible` ++"boolean"++ - Whether or not the automatic transfer is possible
- `transfer` ++"MrlConfigBuilder"++ - Contains the builder for the transfer call, either an extrinsic or a contract call
- `bridgeChain` ++"BridgeChainConfig"++ - Contains the information about the transfer regarding the [bridge chain](#the-bridge-chain)

</div>

```js title="Example"
// MRL Asset Route for ETH from Ethereum to Moonbeam
{
  source: {
    asset: weth,
    balance: BalanceBuilder().evm().erc20(),
    destinationFee: {
      asset: weth,
      balance: BalanceBuilder().evm().erc20(),
    },
  },
  destination: {
    asset: eth,
    chain: ethereum,
    balance: BalanceBuilder().evm().native(),
    fee: {
      asset: eth,
      amount: 0,
    },
  },
  mrl: {
    isAutomaticPossible: true,
    transfer: MrlBuilder().wormhole().wormhole().tokenTransfer(),
    bridgeChain: {
      asset: weth,
      balance: BalanceBuilder().evm().erc20(),
      chain: moonbeam,
      fee: {
        asset: glmr,
        amount: 0,
        balance: BalanceBuilder().substrate().system().account(),
      },
    },
  },
},
```
</div>

### The [Mrl Chain Routes](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/config/src/types/MrlChainRoutes.ts){target=\_blank} Object

This object contains the routes for a specific chain.

**Attributes**

- `chain` ++"Chain"++ [:material-link-variant:](./reference/xcm.md#the-chain-object) - The chain the routes are for
- `routes` ++"MrlAssetRoute[]"++ [:material-link-variant:](#the-mrl-asset-route-object) - The list of asset routes for the chain

Chain routes are defined in the [MRL Config](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/config/src/mrl-configs/){target=\_blank} files.

---

## Transfer Data

In the process of transferring the assets, you must get the transfer data first and then use it to transfer the assets.

### The Transfer Data Object

<div class="grid" markdown>
<div markdown>

Defines the complete transfer data for transferring an asset, including asset balances, source and destination chain information, and a new concept exclusive to MRL which is the [bridge chain](#the-bridge-chain)

**Attributes**

- `source` ++"SourceTransferData"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/mrl/src/mrl.interfaces.ts) - The assembled source chain and address information
- `destination` ++"DestinationTransferData"++ [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/mrl/src/mrl.interfaces.ts) - The assembled destination chain and address information
- `bridgeChain` ++"BridgeChainTransferData"++ [:material-link-variant:](#the-bridge-chain) - The assembled bridge chain and address information
- `getEstimate` ++"function"++ - Gets the estimated amount of the asset that the destination address will receive
- `isAutomaticPossible` ++"boolean"++ - Returns whether or not the automatic transfer is possible
- `max` ++"AssetAmount"++ [:material-link-variant:](xcm.md#the-asset-amount-object) - The maximum amount of the asset that _can_ be transferred
- `min` ++"AssetAmount"++ [:material-link-variant:](xcm.md#the-asset-amount-object) - The minimum amount of the asset that _can_ be transferred
- `transfer` ++"function"++ [:material-link-variant:](./#the-transfer-method) - Transfers a given amount of the asset from the source chain to the destination chain

</div>
<div markdown>


```js title="Example"
// USDC from Ethereum to Hydration
{
    destination: {
        chain: _Parachain {
            assets: Map(7) {
                "hdx": [Object...],
                "glmr": [Object...],
                "dai": [Object...],
                "usdcwh": [Object...],
                "usdtwh": [Object...],
                "wbtc": [Object...],
                "weth": [Object...],
            },
            ecosystem: "polkadot",
            explorer: {
                base: "https://hydration.subscan.io",
            },
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
            ws: ["wss://rpc.hydradx.cloud", "wss://rpc.helikon.io/hydradx", "wss://hydradx.paras.dotters.network",
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
            ids: [Object...],
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
            ids: [Object...],
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
            ids: [Object...],
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
            ids: [Object...],
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
    bridgeChain: {
        address: "0x98891e5FD24Ef33A488A47101F65D212Ff6E650E",
        balance: _AssetAmount {
            key: "usdcwh",
            originSymbol: "USDC.Wh",
            address: "0x931715FEE2d06333043d11F658C8CE934aC61D0c",
            decimals: 6,
            ids: [Object...],
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
            ids: [Object...],
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
                "aca": [Object...],
                "astr": [Object...],
                "aseed": [Object...],
                "axlusdc": [Object...],
                "bnc": [Object...],
                "bncs": [Object...],
                "cfg": [Object...],
                "dai": [Object...],
                "ded": [Object...],
                "dot": [Object...],
                "eq": [Object...],
                "eqd": [Object...],
                "fil": [Object...],
                "glmr": [Object...],
                "hdx": [Object...],
                "ibtc": [Object...],
                "intr": [Object...],
                "ldot": [Object...],
                "manta": [Object...],
                "nodl": [Object...],
                "neuro": [Object...],
                "peaq": [Object...],
                "pha": [Object...],
                "pen": [Object...],
                "ring": [Object...],
                "sub": [Object...],
                "usdc": [Object...],
                "usdcwh": [Object...],
                "usdtwh": [Object...],
                "usdt": [Object...],
                "vastr": [Object...],
                "vdot": [Object...],
                "vfil": [Object...],
                "vglmr": [Object...],
                "vmanta": [Object...],
                "wbtc": [Object...],
                "weth": [Object...],
                "ztg": [Object...],
                "pink": [Object...],
                "stink": [Object...],
                "apillon": [Object...],
                "wifd": [Object...],
                "wbtce": [Object...],
                "wethe": [Object...],
                "wstethe": [Object...],
            },
            ecosystem: "polkadot",
            explorer: {
                base: "https://moonbeam.moonscan.io",
                txPath: "/tx",
            },
            isTestChain: false,
            key: "moonbeam",
            name: "Moonbeam",
            wh: [Object...],
            checkSovereignAccountBalances: false,
            genesisHash: "0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d",
            isRelay: false,
            parachainId: 2004,
            ss58Format: 1284,
            usesChainDecimals: false,
            weight: undefined,
            ws: ["wss://wss.api.moonbeam.network"],
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
            ids: [Object...],
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
                "eth": [Object...],
                "usdc": [Object...],
                "usdt": [Object...],
                "dai": [Object...],
                "wbtc": [Object...],
                "glmr": [Object...],
                "peaq": [Object...],
            },
            ecosystem: "polkadot",
            explorer: {
                base: "https://etherscan.io",
                txPath: "/tx",
            },
            isTestChain: false,
            key: "ethereum",
            name: "Ethereum",
            wh: [Object...],
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
        bridgeChainFeeBalance: undefined,
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
        otherFees: {
            protocol: undefined,
            relayer: _AssetAmount {
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
    },
    transfer: [AsyncFunction: transfer],
}
```
</div>
</div>

---

### The Bridge Chain

The Bridge Chain is the intermediary chain used to transfer assets between a Substrate based ecosystem and external chains. In the Moonbeam ecosystem, this chain is going to be Moonbeam for production environments and Moonbase Alpha for test environments. Specifically for Moonbeam and the Wormhole provider, the Bridge Chain acts differently for each type of transfer.

- In [EVM to parachain cases](#from-evm-chains-to-parachains) the bridge chain triggers the XCM transfer to the destination chain, and in the [transfer data](#transfer-data-object) it contains the information of the sender's address in the bridge chain.
- In [parachain to EVM cases](#from-parachains-to-evm-chains) the bridge chain receives the XCM message and executes the remote execution message, and in the [transfer data](#transfer-data-object) it contains the information of the computed origin account.
- In [Bridge Chain to EVM cases](#from-bridgechain-to-evm-chains) it is either the source or the destination of the transfer, and in the [transfer data](#transfer-data-object) it contains the information of the sender's address.

For other providers, the process is simpler, the Bridge Chain is only the one connected to the provider, which makes the transfer between ecosystems possible.

---

### The Transfer Method

<div class="grid" markdown>
<div markdown>

**Parameters**

- `amount` ++"bigint | number | string"++ - The amount of the asset to transfer
- `isAutomatic` ++"boolean"++ - Whether or not the transfer should be automatic
- `signers` ++"Signers"++ - The signers of the transaction
- `statusCallback` ++"function"++ (optional) - Comes from the polkadot api. A callback function that can be passed to the signAndSend method, and will be called with the status of the transaction. Only applicable for polkadot signers, when the source chain is a parachain.
- `sendOnlyRemoteExecution` ++"boolean"++ (optional) - When this flag is set to true, instead of sending a transfer assets message plus a remote execution message from the parachain to the bridge chain, only the remote execution message is sent. Applicable only when the source chain is a parachain. This is useful when some assets are stuck in the bridge chain in the [computed origin account](https://docs.moonbeam.network/builders/interoperability/mrl/#calculate-computed-origin-account){target=\_blank} of the sender, in which case sending the assets would not be necessary from the source chain.

</div>
<div markdown>

```js title="Example Usage"
import { Mrl } from '@moonbeam-network/mrl';
import { ethereum, hydration, usdcwh } from '@moonbeam-network/xcm-config';
import type { ISubmittableResult } from '@polkadot/types/types';

const isAutomatic = false;

const transferData = await Mrl()
  .setSource(hydration)
  .setDestination(ethereum)
  .setAsset(usdcwh)
  .setIsAutomatic(isAutomatic)
  .setAddresses({
    sourceAddress: 'INSERT_POLKADOT_ADDRESS', // pair.address,
    destinationAddress: 'INSERT_ETHEREUM_ADDRESS', // account.address,
  });

const statusCallback = ({ status }: ISubmittableResult) => {
  if (status.isInBlock) {
    console.log(
      `Transaction sent, do something with the hash ${status.hash.toHex()}`,
    );
  }
};

await transferData.transfer({
  amount: 0.1,
  isAutomatic,
  signers: {
    polkadotSigner: INSERT_POLKADOT_SIGNER, // pair
  },
  statusCallback,
});

```


</div>
</div>

### Understanding Fees in MRL

MRL introduces additional fees beyond the standard XCM execution fees. These are organized under the `otherFees` object in the source transfer data for clarity.

<!-- TODO change this again  -->
#### Other Fees Structure

The `source.otherFees` object contains MRL-specific fees:

- **`protocol`** ++"AssetAmount"++ (optional) - Protocol-level bridge fee charged by the bridge provider (e.g., Snowbridge). This fee is deducted from the balance at the source chain
- **`relayer`** ++"AssetAmount"++ (optional) - Relayer service fee for automatic execution. Only applies when `isAutomatic=true`. Currently supported by the Wormhole provider. This fee is deducted from the transfer amount after it is sent.

#### Standard Fees

In addition to `otherFees`, the source transfer data includes standard fees from XCM SDK:

- **`fee`** ++"AssetAmount"++ - Standard execution/gas fee for the source chain transaction
- **`destinationFee`** ++"AssetAmount"++ - Amount reserved to pay for execution on the destination chain

#### Total Cost Calculation

When making a transfer, the total amount deducted from your source balance includes:

```
Total Deducted = fee + destinationFee + otherFees.protocol + otherFees.relayer
```

The `getEstimate()` method automatically accounts for all these fees when calculating the recipient's expected amount.

## Execute Transfer Data 

Apart from transferring the assets, the MRL SDK also provides a way to execute the transfer in the destination chain. This is useful when the transfer needs to be completed manually.

Similar to the [transfer data](#transfer-data), first you need to get the execute transfer data, and then you can execute the transfer.

### The Execute Transfer Data Object

Defines the data needed to execute the transfer in the destination chain. Usually it is related to the bridge you're using to transfer the assets. Currently, the only bridge supported is Wormhole.

**Attributes**

- `vaa` ++"VAA"++ - The [VAA](https://wormhole.com/docs/learn/infrastructure/vaas/) of the transfer. Related to Wormhole
- `tokenTransfer` ++"TokenTransfer"++ - The token transfer of the transfer. Related to Wormhole
- `executeTransfer` ++"function"++ [:material-link-variant:](#the-execute-transfer-method) - The function to execute the transfer


### The Execute Transfer Method

<div class="grid" markdown>
<div markdown>

**Parameters**

- `signer` ++"EvmSigner"++ - The signer to use to execute the transfer  

</div>

```js title="Example Usage"
  const data = await Mrl().getExecuteTransferData({
    txId: INSERT_TX_HASH_TO_BE_EXECUTED,
    chain: INSERT_DESTINATION_CHAIN,
  });

  await data.executeTransfer(INSERT_SIGNER_OR_WALLET_CLIENT);
```

</div>

## The MRL Method

<div class="grid" markdown>
<div markdown>

This is the main method that you'll use to build the transfer data, and the execute transfer data. It contains a series of chained methods that you'll use to set the information about the transfer.

**Methods**

- `Mrl()` [:material-link-variant:](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/mrl/src/mrl.ts#L10){:target="_blank"} - Initializes the MRL, returns all the sources supported by a given ecosystem
- `setSource()` - Sets the source chain of the transfer, returns all the available destinations for this source chain
- `setDestination()` - Sets the destination chain of the transfer, returns all the available assets for this source and destination chain
- `setAsset()` - Sets the asset to be transferred
- `setIsAutomatic()` - Sets whether the transfer is going to be completed automatically
- `setAddresses()` - Sets the addresses for the transfer, returns the [transfer data](#the-transfer-data-object)
- `transfer()` [:material-link-variant:](#the-transfer-method) - Transfers the assets
- `executeTransfer()` [:material-link-variant:](#the-execute-transfer-method) - Executes the transfer
- `getExecuteTransferData()` [:material-link-variant:](#the-get-execute-transfer-data-method) - Returns the [execute transfer data](#the-execute-transfer-data-object)


</div>

```js title="Example Usage"
const transferData = await Mrl()
  .setSource(INSERT_SOURCE_CHAIN)
  .setDestination(INSERT_DESTINATION_CHAIN)
  .setAsset(INSERT_ASSET)
  .setIsAutomatic(INSERT_IS_AUTOMATIC)
  .setAddresses({
    sourceAddress: INSERT_SOURCE_ADDRESS,
    destinationAddress: INSERT_DESTINATION_ADDRESS,
  });
```
</div>

### The Get Execute Transfer Data Method

<div class="grid" markdown>
<div markdown>

**Parameters**

- `txId` ++"string"++ - The transaction hash to be executed. This is the transaction hash of the bridge between the EVM chain and the Bridge Chain
- `chain` ++"EvmChain | EvmParachain"++ - The chain to execute the transfer on

</div>

```js title="Example Usage"
const data = await Mrl().getExecuteTransferData({
  txId: INSERT_TX_HASH_TO_BE_EXECUTED,
  chain: INSERT_DESTINATION_CHAIN,
});
```
</div>
