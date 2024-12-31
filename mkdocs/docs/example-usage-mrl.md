---
title: Using the MRL SDK 
description: Use the Moonbeam XCM SDK to easily transfer  liquidity into and across the Polkadot ecosystem from other ecosystems like Ethereum
template: tutorial.html
---
# Using the Moonbeam MRL SDK

## Introduction {: #introduction }
Moonbeam Routed Liquidity (MRL) allows liquidity from any blockchain connected to Moonbeam to be seamlessly routed to Polkadot parachains. This is achieved through technologies like General Message Passing (GMP), Polkadot's Cross-Consensus Message Passing (XCM), and XCM-enabled ERC-20 tokens (XC-20s). For more details, refer to the [MRL Documentation](https://docs.moonbeam.network/builders/interoperability/mrl/){target=\_blank}.

The MRL SDK simplifies the process of routing liquidity from various blockchains into the Polkadot ecosystem by providing a set of tools and functions that abstract away the complexities of cross-chain communication, by leveraging GMP, XCM, and XC-20s.

It allows three types of transfers:

1. **From EVM chains to parachains**: Assets from chains like Ethereum to Polkadot parachains, like Hydration. A message is sent 
2. **From parachains to EVM chains**:  
3. **Bewtween Moonbeam and EVM chains**

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

const sdkInstance = Mrl();
const sources = sdkInstance.sources;

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

const sdkInstance = Mrl({ ecosystem: moonbeam.ecosystem });
const sources = sdkInstance.sources;

console.log('The supported sources are as follows:');
sources.forEach((source) => {
  console.log(`- ${source.name}`);
});
```