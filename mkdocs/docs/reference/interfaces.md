---
title: XCM SDK Reference - Interfaces - v0
description: A reference for the types and interfaces in the Moonbeam XCM SDK that can be used to send XCM transfers between chains within the Polkadot/Kusama ecosystems.
---

# Moonbeam XCM SDK Reference: Types and Interfaces

The XCM SDK is based on defining an asset to transfer, then the source chain to send the asset from, and the destination chain to send the asset to, which, together, build the transfer data.

## Core Interfaces {: #core-sdk-interfaces }

The SDK provides the following core interfaces, which can be accessed after [initialization](../example-usage.md#initializing){target=\_blank}:

|                              Interface                               |                                                                         Description                                                                         |
| :------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: |
|      [`symbols`](../example-usage.md/#symbols){target=\_blank}       |                   A list containing the asset's origin chain symbol for each of the supported assets for the initialized Moonbeam network                   |
|        [`assets`](../example-usage.md#assets){target=\_blank}        |    A list of the supported assets for the initialized Moonbeam network along with their asset ID, precompiled address on Moonbeam, and the asset symbol     |
|   [`moonAsset`](../example-usage.md#native-assets){target=\_blank}   |                      Contains the asset ID, precompile contract address, and native asset symbol for the initialized Moonbeam network                       |
| [`moonChain`](../example-usage.md#native-chain-data){target=\_blank} | Contains the chain key, name, WSS endpoint, parachain ID, decimals of the native asset, chain ID, and units per second for the initialized Moonbeam network |
