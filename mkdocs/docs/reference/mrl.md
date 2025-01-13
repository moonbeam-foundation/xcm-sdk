---
title: MRL SDK Reference
description: A reference for the types and interfaces in the Moonbeam MRL SDK that can be used to send transfers between chains from the Polkadot ecosystem and external chains from outside the Polkadot ecosystem.
---

# Moonbeam MRL SDK Reference

A new module, `@moonbeam-foundation/mrl-sdk`, has been added to the Moonbeam SDK to support transfers between chains from the Polkadot ecosystem and external chains from outside the Polkadot ecosystem. MRL stands for Moonbeam Routed Liquidity. It allows liquidity from any blockchain connected to Moonbeam to be seamlessly routed to Polkadot parachains. This is achieved through technologies like General Message Passing (GMP), Polkadot's Cross-Consensus Message Passing (XCM), and XCM-enabled ERC-20 tokens (XC-20s). For more details, refer to the [MRL Documentation](https://docs.moonbeam.network/builders/interoperability/mrl/){target=\_blank}.

This SDK aims to simplify this process, abstracting away the complexities of integrating the GPM providers, building the XCM messages, and executing the remote execution messages.

To use it, chains are configured following an iterface which contains all the necessary information to perform the transfers.

This sdk uses the [XCM-SDK types and concepts as base](../reference/xcm.md). In this section we'll provide a detailed reference for the most important concepts, types, interfaces and methods related to the MRL SDK.

---

## Transfer types
<!-- TODO fix redaccion -->
To understand how to use the MRL SDK, we can identify three different types of transfers, which ultimately don't affect the way the SDK is used, but depending on the type of transfer, the logic behind each one is going to be different.

Always refer to the [MRL Documentation](https://docs.moonbeam.network/builders/interoperability/mrl/){target=\_blank} for a full explanation of the process, but here is a brief overview of what happens in each type of transfers, which will help you understand how the SDK works.

---

### From EVM chains to parachains. {: #from-evm-chains-to-parachains }
<!-- TODO mjm references -->
Here the source chain is an [EVM chain]() and the destination chain either a [Parachain]() or an [EVMParachain]().

1. A contract call is made in the source chain, which triggers the assets to be sent to Moonbeam ([moon chain](#moonchain)). This process is done in this sdk by leveraging a [GMP provider](https://docs.moonbeam.network/builders/interoperability/protocols/){target=\_blank}. Currently the only one supported is [Wormhole](https://docs.moonbeam.network/builders/interoperability/protocols/wormhole/){target=\_blank}.
2. Next, to complete the transfer in Moonbeam, it must be executed, either manually or automatically by a relayer from the GMP provider. This execution consists of calling the [GMP precompile](https://docs.moonbeam.network/builders/ethereum/precompiles/interoperability/gmp/){target=\_blank}, which triggers the next step.
3. An XCM message is sent from Moonbeam to the destination chain, containing the assets that were sent from the source chain.

---

### From parachains to EVM chains. {: #from-parachains-to-evm-chains }

Here the source chain is a [Parachain]() or an [EVMParachain]() and the destination chain an [EVM chain]().

1. An XCM message is sent from the source chain to Moonbeam, this message is a batch call containing the following information:
    - A 'transfer assets' message, containing the asset that the user wants to transfer, plus the fees necessary to complete the transfer in Moonbeam, if any.
    <!-- TODO mjm reference sendOnlyRemoteExecution -->
    <!-- It is possible to only send the remote execution message, in cases where the computed origin account already has the assets necessary to complete the transfer. -->
    - A 'remote execution' message, which will be executed in Moonbeam.
    - The assets are sent to the [computed origin account](https://docs.moonbeam.network/builders/interoperability/mrl/#calculate-computed-origin-account){target=\_blank}, which is an account that can only be manipulated remotely by the source address.
2. Now that the computed origin account has the assets, the remote execution message is executed in Moonbeam, which will send the assets to the destination chain through a GMP provider. It is the same first step described in the [From EVM chains to parachains](#from-evm-chains-to-parachains) section, but in reverse.
3. The transaction must be executed in the destination chain, either manually or automatically by a relayer.

---

### Between Moon Chain and EVM chains. {: #from-moonchain-to-evm-chains }
This is the simplest type of transfer, as it only involves moving assets between Moonbeam and an EVM chain.

1. The assets are sent from the source chain to the destination chain through a GMP provider, like in the first step of the [From EVM chains to parachains](#from-evm-chains-to-parachains) section.
2. The transaction must be executed in the destination chain, either manually or automatically by a relayer.

For this type of transfer there is no need for a polkadot signer.

---
## MRL Asset Routes
<!-- TODO mjm reference Chain objects and Asset Amounts -->
Routes are defined in the [MRL Configs](https://github.com/moonbeam-foundation/xcm-sdk/blob/main/packages/config/src/mrl-configs/ethereum.ts){target=\_blank} file. Each route is an object that contains the source and destination chains, the assets to be transferred, and the fees.

---

## Transfer Data

<div class="grid" markdown>
<div markdown>

### Transfer Data Object
Defines the complete transfer data for transferring an asset, including asset balances, source and destination chain information, and a new concept exlusive to MRL which is the [moon chain](#moonchain)

**Attributes**

<!-- TODO mjm references -->
- `destination` ++"DestinationTransferData"++ [:material-link-variant:](#the-destination-transfer-data-object) - The assembled destination chain and address information
- `getEstimate` ++"function"++ [:material-link-variant:](./methods.md#the-get-estimate-method) - Gets the estimated amount of the asset that the destination address will receive
- `isAutomaticPossible` ++"boolean"++ - Returns whether or not the automatic transfer is possible
- `max` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The maximum amount of the asset that _can_ be transferred
- `min` ++"AssetAmount"++ [:material-link-variant:](#the-asset-amount-object) - The minimum amount of the asset that _can_ be transferred
- `moonChain` ++"MoonChainTransferData"++ [:material-link-variant:](#moonchain) - The assembled moon chain and address information
- `source` ++"SourceTransferData"++ [:material-link-variant:](#the-source-transfer-data-object) - The assembled source chain and address information
<!-- TODO mjm transfer reference -->
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
    moonChain: {
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
            explorer: "https://moonbeam.moonscan.io",
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
            explorer: "https://etherscan.io",
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
</div>
</div>

---

### MoonChain

We call Moon Chain to the intermediary chain that is used to transfer the assets between the Polkadot ecosystem and the external chains. For `Mainnet` Moonbeam is the moon chain, and for `Testnet` it is `Moonbase Alpha`.

- In [EVM to parachain cases](#from-evm-chains-to-parachains) the moon chain triggers the XCM transfer to the destination chain, and in the [transfer data](#transfer-data-object) it contains the information of the sender's address in the moon chain.
- In [parachain to EVM cases](#from-parachains-to-evm-chains) the moon chain receives the XCM message and executes the remote execution message, and in the [transfer data](#transfer-data-object) it contains the information of the computed origin account.
- In [Moon Chain to EVM cases](#from-moonchain-to-evm-chains) is either the source or the destination of the transfer, and in the [transfer data](#transfer-data-object) it contains the information of the sender's address.

---

<div class="grid" markdown>
<div markdown>

### The transfer method

**Parameters**

- `amount` ++"bigint | number | string"++ - The amount of the asset to transfer
- `isAutomatic` ++"boolean"++ - Whether or not the transfer should be automatic
- `signers` ++"Signers"++ [:material-link-variant:](#the-signers-object) - The signers of the transaction
- `statusCallback` ++"function"++ (optional) - Comes from the polkadot api. A callback function that can be passed to the signAndSend method, and will be called with the status of the transaction. Only applicable for polkadot signers, when the source chain is a parachain.
- `sendOnlyRemoteExecution` ++"boolean"++ (optional) - When this flag is set to true, instead of sending a transfer assets message plus a remote execution message from the parachain to the moon chain, only the remote execution message is sent. Applicable only when the source chain is a parachain. This is useful when some assets are stuck in the moon chain in the [computed origin account](https://docs.moonbeam.network/builders/interoperability/mrl/#calculate-computed-origin-account){target=\_blank} of the sender, in which case sending the assets would not be necessary from the source chain.

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

await transferData.transfer(
  0.1,
  isAutomatic,
  {
    polkadotSigner: INSERT_POLKADOT_SIGNER, // pair
  },
  statusCallback,
);

```


</div>
</div>

### TODO relayer fee


### TODO MRL method