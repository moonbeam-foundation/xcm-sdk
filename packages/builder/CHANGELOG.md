# @moonbeam-network/xcm-builder

## 4.0.1

### Patch Changes

- [#538](https://github.com/moonbeam-foundation/xcm-sdk/pull/538) [`bd42536`](https://github.com/moonbeam-foundation/xcm-sdk/commit/bd4253666b39350b5a9d06e44f5e6b8ab64efd6b) Thanks [@mmaurello](https://github.com/mmaurello)! - Implement PIZZA (ERC20) transfers between Moonbase Beta and Moonbase Stage

## 4.0.0

### Major Changes

- [#526](https://github.com/moonbeam-foundation/xcm-sdk/pull/526) [`6b69f5a`](https://github.com/moonbeam-foundation/xcm-sdk/commit/6b69f5a6ec6d41c68f373a7b11bc7609b7ce8244) Thanks [@mmaurello](https://github.com/mmaurello)! - # Major Release: Enhanced XCM Transfer Monitoring

  This major release introduces comprehensive monitoring capabilities for XCM transfers, enabling developers to track transfer states across both source and destination chains.

  ## 🚨 Breaking Changes

  ### Transfer Function API Changes

  The `transfer` function signature has been updated across all packages to improve consistency and enable monitoring features:

  **Before:**

  ```typescript
  // XCM
  const data = await Sdk()
    .setAsset(asset)
    .setSource(source)
    .setDestination(destination);
  await data.transfer(amount, { polkadotSigner: pair });

  // MRL
  const transferData = await Mrl()
    .setSource(source)
    .setDestination(destination)
    .setAsset(asset);
  await transferData.transfer(amount, isAutomatic, { evmSigner: walletClient });
  ```

  **After:**

  ```typescript
  // XCM
  const data = await Sdk().setAsset(asset).setSource(source).setDestination(destination);
  await data.transfer({
    amount,
    signers: { polkadotSigner: pair },
    onSourceFinalized?: () => void,
    onSourceError?: (error) => void,
    onDestinationFinalized?: () => void,
    onDestinationError?: (error) => void
  });

  // MRL
  const transferData = await Mrl().setSource(source).setDestination(destination).setAsset(asset);
  await transferData.transfer({
    amount,
    isAutomatic,
    signers: { evmSigner: walletClient },
    // Monitoring is not implemented to MRL yet
  });
  ```

  ### Migration Guide

  To migrate your existing code:

  1. **Convert separate parameters to object parameter:**

     ```typescript
     // Replace this:
     await data.transfer(amount, { polkadotSigner: pair });

     // With this:
     await data.transfer({
       amount,
       signers: { polkadotSigner: pair },
     });
     ```

  2. **Add monitoring callbacks (optional):**

     ```typescript
     await data.transfer({
       amount,
       signers: { polkadotSigner: pair },
       onSourceFinalized: () => console.log("Transaction sent successfully"),
       onSourceError: (error) =>
         console.error("Error sending transaction", error),
       onDestinationFinalized: () =>
         console.log("Assets successfully received"),
       onDestinationError: (error) =>
         console.error("Error receiving assets", error),
     });
     ```

  3. **For MRL transfers:**

     ```typescript
     // Replace this:
     await transferData.transfer(amount, isAutomatic, {
       evmSigner: walletClient,
     });

     // With this:
     await transferData.transfer({
       amount,
       isAutomatic,
       signers: { evmSigner: walletClient },
     });
     ```

  For detailed migration instructions, see: https://moonbeam-foundation.github.io/xcm-sdk/latest/reference/xcm/#the-transfer-method

  ## ✨ New Features

  ### Real-time Transfer Monitoring

  - **Source Chain Monitoring**: Track transaction submission, inclusion, and finalization on the source chain
  - **Destination Chain Monitoring**: Monitor XCM message execution and asset delivery on the destination chain
  - **Error Handling**: Error reporting for both chains with detailed error contexts
  - **Success Callbacks**: Receive notifications when transfers complete successfully at each stage

  ### Enhanced Developer Experience

  - **Type-safe Callbacks**: All monitoring callbacks are fully typed for better IDE support
  - **Flexible Integration**: Monitoring is optional - existing functionality works without callbacks
  - **Comprehensive State Tracking**: Monitor the complete lifecycle of cross-chain transfers

### Patch Changes

- Updated dependencies [[`6b69f5a`](https://github.com/moonbeam-foundation/xcm-sdk/commit/6b69f5a6ec6d41c68f373a7b11bc7609b7ce8244)]:
  - @moonbeam-network/xcm-types@4.0.0
  - @moonbeam-network/xcm-utils@4.0.0

## 3.3.9

### Patch Changes

- [#519](https://github.com/moonbeam-foundation/xcm-sdk/pull/519) [`7dd4ba3`](https://github.com/moonbeam-foundation/xcm-sdk/commit/7dd4ba33792e8042c6b69ef99d56d9d8a9f6a08a) Thanks [@mmaurello](https://github.com/mmaurello)! - Update Wormhole SDK to V3

- Updated dependencies [[`7dd4ba3`](https://github.com/moonbeam-foundation/xcm-sdk/commit/7dd4ba33792e8042c6b69ef99d56d9d8a9f6a08a)]:
  - @moonbeam-network/xcm-types@3.2.9

## 3.3.8

### Patch Changes

- [#529](https://github.com/moonbeam-foundation/xcm-sdk/pull/529) [`8694cd2`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8694cd2bfc462bf2b88be9fb11a96d25592bc635) Thanks [@Rihyx](https://github.com/Rihyx)! - fix axios vulnerability

- Updated dependencies [[`8694cd2`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8694cd2bfc462bf2b88be9fb11a96d25592bc635)]:
  - @moonbeam-network/xcm-types@3.2.8
  - @moonbeam-network/xcm-utils@3.1.8

## 3.3.7

### Patch Changes

- [#527](https://github.com/moonbeam-foundation/xcm-sdk/pull/527) [`ead3303`](https://github.com/moonbeam-foundation/xcm-sdk/commit/ead33037b56da906b2db3e4e337af56e64f0cddd) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies

- Updated dependencies [[`ead3303`](https://github.com/moonbeam-foundation/xcm-sdk/commit/ead33037b56da906b2db3e4e337af56e64f0cddd)]:
  - @moonbeam-network/xcm-types@3.2.7

## 3.3.6

### Patch Changes

- [#520](https://github.com/moonbeam-foundation/xcm-sdk/pull/520) [`8179c3f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8179c3f97be3e5d9c23db1cce1d868ea013f15e3) Thanks [@mmaurello](https://github.com/mmaurello)! - Change some routes from using xTokens pallet to polkadotXcm

- Updated dependencies [[`8179c3f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8179c3f97be3e5d9c23db1cce1d868ea013f15e3)]:
  - @moonbeam-network/xcm-types@3.2.6

## 3.3.5

### Patch Changes

- [#516](https://github.com/moonbeam-foundation/xcm-sdk/pull/516) [`c7e3640`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c7e3640a0a2ce47ebae90fba823b334e187ad20e) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies

- Updated dependencies [[`c7e3640`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c7e3640a0a2ce47ebae90fba823b334e187ad20e)]:
  - @moonbeam-network/xcm-types@3.2.5
  - @moonbeam-network/xcm-utils@3.1.7

## 3.3.4

### Patch Changes

- [#512](https://github.com/moonbeam-foundation/xcm-sdk/pull/512) [`b515e8c`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b515e8c979eb6ed18ff2fcbb164080a2b6ebd472) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies

- Updated dependencies [[`b515e8c`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b515e8c979eb6ed18ff2fcbb164080a2b6ebd472)]:
  - @moonbeam-network/xcm-types@3.2.4
  - @moonbeam-network/xcm-utils@3.1.6

## 3.3.3

### Patch Changes

- [#507](https://github.com/moonbeam-foundation/xcm-sdk/pull/507) [`8e5b2b5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8e5b2b54993a2f272ae1c2cd5fe95dcd35d77523) Thanks [@Rihyx](https://github.com/Rihyx)! - Update polkadot packages and other dependencies

- Updated dependencies [[`8e5b2b5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8e5b2b54993a2f272ae1c2cd5fe95dcd35d77523)]:
  - @moonbeam-network/xcm-types@3.2.3
  - @moonbeam-network/xcm-utils@3.1.5

## 3.3.2

### Patch Changes

- [#505](https://github.com/moonbeam-foundation/xcm-sdk/pull/505) [`de1fa0f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/de1fa0f1015854a04de892667b0026da9101ab7a) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies and fix brace-expansion vulnerability

- Updated dependencies [[`de1fa0f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/de1fa0f1015854a04de892667b0026da9101ab7a)]:
  - @moonbeam-network/xcm-types@3.2.2

## 3.3.1

### Patch Changes

- [#503](https://github.com/moonbeam-foundation/xcm-sdk/pull/503) [`c3b7c3f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c3b7c3f794549cd00311ab67e866b745815fc3e6) Thanks [@mmaurello](https://github.com/mmaurello)! - Use dynamic xcm versioning in MRL extrinsics. Update Wormhole SDK

- Updated dependencies [[`c3b7c3f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c3b7c3f794549cd00311ab67e866b745815fc3e6)]:
  - @moonbeam-network/xcm-types@3.2.1

## 3.3.0

### Minor Changes

- [#493](https://github.com/moonbeam-foundation/xcm-sdk/pull/493) [`bf2a793`](https://github.com/moonbeam-foundation/xcm-sdk/commit/bf2a7931a4a74bc9f1a4f3f1e0b5c0c04a577e08) Thanks [@mmaurello](https://github.com/mmaurello)! - Implement Cross Ecosystem routes (Moonbase Stage <> Moonbase Beta)

### Patch Changes

- Updated dependencies [[`bf2a793`](https://github.com/moonbeam-foundation/xcm-sdk/commit/bf2a7931a4a74bc9f1a4f3f1e0b5c0c04a577e08)]:
  - @moonbeam-network/xcm-types@3.2.0

## 3.2.6

### Patch Changes

- [#496](https://github.com/moonbeam-foundation/xcm-sdk/pull/496) [`e04f939`](https://github.com/moonbeam-foundation/xcm-sdk/commit/e04f9398d74a546f7c5ab9af0be1fb810f9f030c) Thanks [@Rihyx](https://github.com/Rihyx)! - Fix vite vulnerability

- Updated dependencies [[`e04f939`](https://github.com/moonbeam-foundation/xcm-sdk/commit/e04f9398d74a546f7c5ab9af0be1fb810f9f030c)]:
  - @moonbeam-network/xcm-types@3.1.5
  - @moonbeam-network/xcm-utils@3.1.4

## 3.2.5

### Patch Changes

- [#494](https://github.com/moonbeam-foundation/xcm-sdk/pull/494) [`3192daa`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3192daacb3c53fd93de3f178f4753272888468b4) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies

- Updated dependencies [[`3192daa`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3192daacb3c53fd93de3f178f4753272888468b4)]:
  - @moonbeam-network/xcm-types@3.1.4
  - @moonbeam-network/xcm-utils@3.1.3

## 3.2.4

### Patch Changes

- [#486](https://github.com/moonbeam-foundation/xcm-sdk/pull/486) [`d46716a`](https://github.com/moonbeam-foundation/xcm-sdk/commit/d46716affcb04e8b218cc67322b7adcd2c5b23cc) Thanks [@mmaurello](https://github.com/mmaurello)! - Fix rpc overwriting in Wormhole

- Updated dependencies [[`d46716a`](https://github.com/moonbeam-foundation/xcm-sdk/commit/d46716affcb04e8b218cc67322b7adcd2c5b23cc)]:
  - @moonbeam-network/xcm-types@3.1.3

## 3.2.3

### Patch Changes

- [#482](https://github.com/moonbeam-foundation/xcm-sdk/pull/482) [`bf98d17`](https://github.com/moonbeam-foundation/xcm-sdk/commit/bf98d1754f8428cad5d71371867dc0e841dcae44) Thanks [@mmaurello](https://github.com/mmaurello)! - Change all Xtokens prrecompile calls to Xcm Precompile for Moonchains

## 3.2.2

### Patch Changes

- [#472](https://github.com/moonbeam-foundation/xcm-sdk/pull/472) [`cab9d0d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/cab9d0d61174bfdfd57da3e85bcf465400c2f9cb) Thanks [@Rihyx](https://github.com/Rihyx)! - Dependency updates

- Updated dependencies [[`cab9d0d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/cab9d0d61174bfdfd57da3e85bcf465400c2f9cb)]:
  - @moonbeam-network/xcm-types@3.1.2
  - @moonbeam-network/xcm-utils@3.1.2

## 3.2.1

### Patch Changes

- [#470](https://github.com/moonbeam-foundation/xcm-sdk/pull/470) [`0835496`](https://github.com/moonbeam-foundation/xcm-sdk/commit/083549616852d5728f1533ae813623d04efc6929) Thanks [@Rihyx](https://github.com/Rihyx)! - Update vitest and fix vite vulnerability

- Updated dependencies [[`0835496`](https://github.com/moonbeam-foundation/xcm-sdk/commit/083549616852d5728f1533ae813623d04efc6929)]:
  - @moonbeam-network/xcm-types@3.1.1
  - @moonbeam-network/xcm-utils@3.1.1

## 3.2.0

### Minor Changes

- [#458](https://github.com/moonbeam-foundation/xcm-sdk/pull/458) [`0117cf4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0117cf402e9b17d5d6e1974a3691aaed980e2ada) Thanks [@mmaurello](https://github.com/mmaurello)! - XCM Payment API for generic chains. Prepare for Moonbeam ERC20 migrations

### Patch Changes

- Updated dependencies [[`0117cf4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0117cf402e9b17d5d6e1974a3691aaed980e2ada)]:
  - @moonbeam-network/xcm-types@3.1.0
  - @moonbeam-network/xcm-utils@3.1.0

## 3.1.2

### Patch Changes

- [#464](https://github.com/moonbeam-foundation/xcm-sdk/pull/464) [`f0185be`](https://github.com/moonbeam-foundation/xcm-sdk/commit/f0185beadc97f4303153798b58b296c15a3ebdce) Thanks [@mmaurello](https://github.com/mmaurello)! - Override Wormhole endpoints

- Updated dependencies [[`f0185be`](https://github.com/moonbeam-foundation/xcm-sdk/commit/f0185beadc97f4303153798b58b296c15a3ebdce)]:
  - @moonbeam-network/xcm-types@3.0.10

## 3.1.1

### Patch Changes

- [#462](https://github.com/moonbeam-foundation/xcm-sdk/pull/462) [`55e7990`](https://github.com/moonbeam-foundation/xcm-sdk/commit/55e7990c7636e6b7745c4fa372034cce33574687) Thanks [@mmaurello](https://github.com/mmaurello)! - EURC integration between Pendulum and Moonbeam

## 3.1.0

### Minor Changes

- [#459](https://github.com/moonbeam-foundation/xcm-sdk/pull/459) [`79b4cf1`](https://github.com/moonbeam-foundation/xcm-sdk/commit/79b4cf1b3e23ea22fc1e117c5ca34f69c5af8040) Thanks [@mmaurello](https://github.com/mmaurello)! - Create XCM Precompile call and integrate LAOS with Moonbeam

## 3.0.9

### Patch Changes

- [#450](https://github.com/moonbeam-foundation/xcm-sdk/pull/450) [`2c65658`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2c65658b6a260e17a9fb4d0be02ff5ce079a218c) Thanks [@Rihyx](https://github.com/Rihyx)! - comment out RPC for centrifuge, update e2e tests

- [#457](https://github.com/moonbeam-foundation/xcm-sdk/pull/457) [`a6e3a2e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/a6e3a2e7b6855496f24170a63346bdfd46fc9a1a) Thanks [@mmaurello](https://github.com/mmaurello)! - Update dependencies and address axios vulnerability

- Updated dependencies [[`2c65658`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2c65658b6a260e17a9fb4d0be02ff5ce079a218c), [`a6e3a2e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/a6e3a2e7b6855496f24170a63346bdfd46fc9a1a)]:
  - @moonbeam-network/xcm-types@3.0.9
  - @moonbeam-network/xcm-utils@3.0.7

## 3.0.8

### Patch Changes

- [#448](https://github.com/moonbeam-foundation/xcm-sdk/pull/448) [`9cfb71c`](https://github.com/moonbeam-foundation/xcm-sdk/commit/9cfb71c2f78698454fc753ec2643caa52b92bcb3) Thanks [@Rihyx](https://github.com/Rihyx)! - Update esbuild

- Updated dependencies [[`9cfb71c`](https://github.com/moonbeam-foundation/xcm-sdk/commit/9cfb71c2f78698454fc753ec2643caa52b92bcb3)]:
  - @moonbeam-network/xcm-types@3.0.8
  - @moonbeam-network/xcm-utils@3.0.6

## 3.0.7

### Patch Changes

- [#447](https://github.com/moonbeam-foundation/xcm-sdk/pull/447) [`0424bca`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0424bcaeb1912096a6e0effd1a8313002850db2a) Thanks [@Rihyx](https://github.com/Rihyx)! - Migrate GitHub workflows to OpsLayer pnpm installation

- [#445](https://github.com/moonbeam-foundation/xcm-sdk/pull/445) [`a6c32a8`](https://github.com/moonbeam-foundation/xcm-sdk/commit/a6c32a8d6ae26a7864b9ccf16c78978d0af7aa1c) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies

- [#446](https://github.com/moonbeam-foundation/xcm-sdk/pull/446) [`3ea4276`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3ea427622b36de0f9a1dce299a1455a272afbcd3) Thanks [@Rihyx](https://github.com/Rihyx)! - Update polkadot packages and pnpm

- Updated dependencies [[`0424bca`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0424bcaeb1912096a6e0effd1a8313002850db2a), [`2c4a22d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2c4a22d0538fba4202e88e9ef4534a55cb09441c), [`a6c32a8`](https://github.com/moonbeam-foundation/xcm-sdk/commit/a6c32a8d6ae26a7864b9ccf16c78978d0af7aa1c), [`3ea4276`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3ea427622b36de0f9a1dce299a1455a272afbcd3)]:
  - @moonbeam-network/xcm-types@3.0.7
  - @moonbeam-network/xcm-utils@3.0.5

## 3.0.6

### Patch Changes

- [#435](https://github.com/moonbeam-foundation/xcm-sdk/pull/435) [`555ea8b`](https://github.com/moonbeam-foundation/xcm-sdk/commit/555ea8b10fb376924fbb1e48d8154fb3cca7e8f7) Thanks [@mmaurello](https://github.com/mmaurello)! - Lint fixes

- [#437](https://github.com/moonbeam-foundation/xcm-sdk/pull/437) [`4c3399f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/4c3399fd71fc39aef06226f03b294076746cfec3) Thanks [@mmaurello](https://github.com/mmaurello)! - Laos alphanet integration and change in Evm Parachain properties

- Updated dependencies [[`555ea8b`](https://github.com/moonbeam-foundation/xcm-sdk/commit/555ea8b10fb376924fbb1e48d8154fb3cca7e8f7), [`4c3399f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/4c3399fd71fc39aef06226f03b294076746cfec3)]:
  - @moonbeam-network/xcm-types@3.0.6

## 3.0.5

### Patch Changes

- [#432](https://github.com/moonbeam-foundation/xcm-sdk/pull/432) [`ff0177f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/ff0177f7993ce365e28083d7d54abf4030160bd4) Thanks [@mmaurello](https://github.com/mmaurello)! - Update Wormhole dependencies

- Updated dependencies [[`ff0177f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/ff0177f7993ce365e28083d7d54abf4030160bd4)]:
  - @moonbeam-network/xcm-types@3.0.5

## 3.0.4

### Patch Changes

- [#429](https://github.com/moonbeam-foundation/xcm-sdk/pull/429) [`b3ade4a`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b3ade4a6110b017d4e2e2bbc4a4095ba5960bd94) Thanks [@Rihyx](https://github.com/Rihyx)! - update polkadot stuff to the latest version

- Updated dependencies [[`b3ade4a`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b3ade4a6110b017d4e2e2bbc4a4095ba5960bd94)]:
  - @moonbeam-network/xcm-types@3.0.4
  - @moonbeam-network/xcm-utils@3.0.4

## 3.0.3

### Patch Changes

- [#430](https://github.com/moonbeam-foundation/xcm-sdk/pull/430) [`81c13dc`](https://github.com/moonbeam-foundation/xcm-sdk/commit/81c13dc45e4f15ef9a311ef0c9f449224b88e535) Thanks [@mmaurello](https://github.com/mmaurello)! - Fix lint

- Updated dependencies [[`81c13dc`](https://github.com/moonbeam-foundation/xcm-sdk/commit/81c13dc45e4f15ef9a311ef0c9f449224b88e535)]:
  - @moonbeam-network/xcm-types@3.0.3
  - @moonbeam-network/xcm-utils@3.0.3

## 3.0.2

### Patch Changes

- [#427](https://github.com/moonbeam-foundation/xcm-sdk/pull/427) [`691c44e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/691c44eb3ee0929f0666c148bf3816c74e2688a7) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies and fix vulnerabilities

- Updated dependencies [[`691c44e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/691c44eb3ee0929f0666c148bf3816c74e2688a7)]:
  - @moonbeam-network/xcm-types@3.0.2
  - @moonbeam-network/xcm-utils@3.0.2

## 3.0.1

### Major Changes

- [#419](https://github.com/moonbeam-foundation/xcm-sdk/pull/419) [`629f42b`](https://github.com/moonbeam-foundation/xcm-sdk/commit/629f42bcd1a46ec96ab2767cecdff88a86a73a89) Thanks [@mmaurello](https://github.com/mmaurello)! - XCM SDK V3, MRL module introduction

### Patch Changes

- Updated dependencies [[`629f42b`](https://github.com/moonbeam-foundation/xcm-sdk/commit/629f42bcd1a46ec96ab2767cecdff88a86a73a89)]:
  - @moonbeam-network/xcm-types@3.0.1
  - @moonbeam-network/xcm-utils@3.0.1

## 2.6.2

### Patch Changes

- [#410](https://github.com/moonbeam-foundation/xcm-sdk/pull/410) [`8f9a961`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8f9a9613afa73ca5a56ed4af93f4c37fd9f500f9) Thanks [@Rihyx](https://github.com/Rihyx)! - resolve nanoid vulnerability

- Updated dependencies [[`8f9a961`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8f9a9613afa73ca5a56ed4af93f4c37fd9f500f9)]:
  - @moonbeam-network/xcm-types@2.5.5
  - @moonbeam-network/xcm-utils@2.2.5

## 2.6.1

### Patch Changes

- [#404](https://github.com/moonbeam-foundation/xcm-sdk/pull/404) [`d2899b5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/d2899b57260061389ef5dfc8d7105cdb22c7e1c0) Thanks [@Rihyx](https://github.com/Rihyx)! - remmove remove-eslint-import-resolver-typescript

- Updated dependencies [[`d2899b5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/d2899b57260061389ef5dfc8d7105cdb22c7e1c0)]:
  - @moonbeam-network/xcm-types@2.5.4
  - @moonbeam-network/xcm-utils@2.2.4

## 2.6.0

### Minor Changes

- [#383](https://github.com/moonbeam-foundation/xcm-sdk/pull/383) [`5d3e8b4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/5d3e8b470fb9c5640ba3d27c6140e2ff09fc897d) Thanks [@mmaurello](https://github.com/mmaurello)! - Add foreign assets configuration and Snowbridge assets tranfers between Asset Hub and Moonbeam

## 2.5.5

### Patch Changes

- [#390](https://github.com/moonbeam-foundation/xcm-sdk/pull/390) [`2790340`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2790340bb8ea0edda13765875d91a3a5d993a072) Thanks [@dependabot](https://github.com/apps/dependabot)! - Fix vulnerability

- [#393](https://github.com/moonbeam-foundation/xcm-sdk/pull/393) [`1546937`](https://github.com/moonbeam-foundation/xcm-sdk/commit/1546937e5636cb6e225a06a8e41c6e6593413c42) Thanks [@Rihyx](https://github.com/Rihyx)! - fix cross-spawn vulnerability

- Updated dependencies [[`2790340`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2790340bb8ea0edda13765875d91a3a5d993a072), [`1546937`](https://github.com/moonbeam-foundation/xcm-sdk/commit/1546937e5636cb6e225a06a8e41c6e6593413c42)]:
  - @moonbeam-network/xcm-types@2.5.3
  - @moonbeam-network/xcm-utils@2.2.3

## 2.5.4

### Patch Changes

- [#379](https://github.com/moonbeam-foundation/xcm-sdk/pull/379) [`a724e92`](https://github.com/moonbeam-foundation/xcm-sdk/commit/a724e92f4f7488ced6c4050cea2ad0e98731a5c2) Thanks [@Rihyx](https://github.com/Rihyx)! - fix vulnerability

- Updated dependencies [[`a724e92`](https://github.com/moonbeam-foundation/xcm-sdk/commit/a724e92f4f7488ced6c4050cea2ad0e98731a5c2)]:
  - @moonbeam-network/xcm-types@2.5.2
  - @moonbeam-network/xcm-utils@2.2.2

## 2.5.3

### Patch Changes

- [#373](https://github.com/moonbeam-foundation/xcm-sdk/pull/373) [`10755b4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/10755b4164ab7de94578732b4f92d70f8478c1ed) Thanks [@Rihyx](https://github.com/Rihyx)! - update minor and patch dependencies

- Updated dependencies [[`10755b4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/10755b4164ab7de94578732b4f92d70f8478c1ed)]:
  - @moonbeam-network/xcm-types@2.5.1
  - @moonbeam-network/xcm-utils@2.2.1

## 2.5.2

### Patch Changes

- [#339](https://github.com/moonbeam-foundation/xcm-sdk/pull/339) [`6e543ce`](https://github.com/moonbeam-foundation/xcm-sdk/commit/6e543ce1adb1e81d283e1b1811d0eab6bffaad47) Thanks [@mmaurello](https://github.com/mmaurello)! - Add sovereign account balance checking

- Updated dependencies [[`6e543ce`](https://github.com/moonbeam-foundation/xcm-sdk/commit/6e543ce1adb1e81d283e1b1811d0eab6bffaad47)]:
  - @moonbeam-network/xcm-types@2.5.0

## 2.5.1

### Patch Changes

- Updated dependencies [[`4be5659`](https://github.com/moonbeam-foundation/xcm-sdk/commit/4be5659c05fe2487dd6f440c833fdf7cdc369917)]:
  - @moonbeam-network/xcm-utils@2.2.0
  - @moonbeam-network/xcm-types@2.4.1

## 2.5.0

### Minor Changes

- [#351](https://github.com/moonbeam-foundation/xcm-sdk/pull/351) [`2a7ed04`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2a7ed04887ee41e5a6c010f213265028a953a769) Thanks [@mmaurello](https://github.com/mmaurello)! - Implement XcmPaymentApi to calculate fees for routes going to Moonbeam / Moonriver / Moonbase-Alpha

### Patch Changes

- Updated dependencies [[`2a7ed04`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2a7ed04887ee41e5a6c010f213265028a953a769)]:
  - @moonbeam-network/xcm-types@2.4.0

## 2.4.7

### Patch Changes

- [#345](https://github.com/moonbeam-foundation/xcm-sdk/pull/345) [`6fe69b2`](https://github.com/moonbeam-foundation/xcm-sdk/commit/6fe69b230b4d44c717d9ec7ff73bbc6282b1385e) Thanks [@mmaurello](https://github.com/mmaurello)! - Add transferAssetsUsingTypeAndThen function to xcmPallet and implement it to relay chains

## 2.4.6

### Patch Changes

- [#335](https://github.com/moonbeam-foundation/xcm-sdk/pull/335) [`6f6cfa5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/6f6cfa5e9d0020d443f975768b0b53bea30cd342) Thanks [@mmaurello](https://github.com/mmaurello)! - Apply correct transferrable balance formula

## 2.4.5

### Patch Changes

- [#333](https://github.com/moonbeam-foundation/xcm-sdk/pull/333) [`ede2f6e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/ede2f6e379cec3767be264deb1869cf4da4fdd54) Thanks [@mmaurello](https://github.com/mmaurello)! - Add reserved balance to transferrable balance

## 2.4.4

### Patch Changes

- [#330](https://github.com/moonbeam-foundation/xcm-sdk/pull/330) [`69e849b`](https://github.com/moonbeam-foundation/xcm-sdk/commit/69e849bb35ca23be6210dddc395a52fdf8158ca1) Thanks [@ekenigs](https://github.com/ekenigs)! - Updated dependencies

- Updated dependencies [[`69e849b`](https://github.com/moonbeam-foundation/xcm-sdk/commit/69e849bb35ca23be6210dddc395a52fdf8158ca1)]:
  - @moonbeam-network/xcm-types@2.3.4
  - @moonbeam-network/xcm-utils@2.1.7

## 2.4.3

### Patch Changes

- Updated dependencies [[`bfe9f64`](https://github.com/moonbeam-foundation/xcm-sdk/commit/bfe9f6481f078c2022d70d6c1bc096f87b724477)]:
  - @moonbeam-network/xcm-utils@2.1.6
  - @moonbeam-network/xcm-types@2.3.3

## 2.4.2

### Patch Changes

- [#322](https://github.com/moonbeam-foundation/xcm-sdk/pull/322) [`70085b8`](https://github.com/moonbeam-foundation/xcm-sdk/commit/70085b814801967cd7ccce3a26ed681e45da9677) Thanks [@Rihyx](https://github.com/Rihyx)! - Fix axios vulnerability

- Updated dependencies [[`70085b8`](https://github.com/moonbeam-foundation/xcm-sdk/commit/70085b814801967cd7ccce3a26ed681e45da9677)]:
  - @moonbeam-network/xcm-types@2.3.2
  - @moonbeam-network/xcm-utils@2.1.5

## 2.4.1

### Patch Changes

- [#317](https://github.com/moonbeam-foundation/xcm-sdk/pull/317) [`8190789`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8190789caf9bb9469f2be4189945c68450f54702) Thanks [@ekenigs](https://github.com/ekenigs)! - Updated dependencies

- Updated dependencies [[`af20119`](https://github.com/moonbeam-foundation/xcm-sdk/commit/af20119c15a2aec5f776e90b25f26282c32f743e), [`8190789`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8190789caf9bb9469f2be4189945c68450f54702)]:
  - @moonbeam-network/xcm-types@2.3.1
  - @moonbeam-network/xcm-utils@2.1.4

## 2.4.0

### Minor Changes

- [#304](https://github.com/moonbeam-foundation/xcm-sdk/pull/304) [`77dbaf1`](https://github.com/moonbeam-foundation/xcm-sdk/commit/77dbaf12622f3f58172d83e3f3c9e7b08cd44682) Thanks [@mmaurello](https://github.com/mmaurello)! - Add WS endpoints, change monitoring script and remove equilibrium

### Patch Changes

- Updated dependencies [[`77dbaf1`](https://github.com/moonbeam-foundation/xcm-sdk/commit/77dbaf12622f3f58172d83e3f3c9e7b08cd44682)]:
  - @moonbeam-network/xcm-types@2.3.0

## 2.3.4

### Patch Changes

- [#288](https://github.com/moonbeam-foundation/xcm-sdk/pull/288) [`c72497f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c72497fdca94984988af5bd6454dbb843c7a3b4e) Thanks [@ekenigs](https://github.com/ekenigs)! - Updated dependencies

- Updated dependencies [[`c72497f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c72497fdca94984988af5bd6454dbb843c7a3b4e)]:
  - @moonbeam-network/xcm-types@2.2.5
  - @moonbeam-network/xcm-utils@2.1.3

## 2.3.3

### Patch Changes

- [#297](https://github.com/moonbeam-foundation/xcm-sdk/pull/297) [`b6f7fef`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b6f7fef640aa442b1e99ce930a25fd0dd94cd8bf) Thanks [@Rihyx](https://github.com/Rihyx)! - Fix script to check WS endpoints

- [#298](https://github.com/moonbeam-foundation/xcm-sdk/pull/298) [`308260e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/308260e1f87b683effe9c04d1d61422d51b37eaf) Thanks [@Rihyx](https://github.com/Rihyx)! - Update minor and patch dependencies

- Updated dependencies [[`b6f7fef`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b6f7fef640aa442b1e99ce930a25fd0dd94cd8bf), [`308260e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/308260e1f87b683effe9c04d1d61422d51b37eaf)]:
  - @moonbeam-network/xcm-types@2.2.4
  - @moonbeam-network/xcm-utils@2.1.2

## 2.3.2

### Patch Changes

- [#266](https://github.com/moonbeam-foundation/xcm-sdk/pull/266) [`bf53165`](https://github.com/moonbeam-foundation/xcm-sdk/commit/bf53165ae59458b5f4524b5e8f3563dcd50fcfd4) Thanks [@mmaurello](https://github.com/mmaurello)! - STINK integration with Moonbeam

## 2.3.1

### Patch Changes

- [#278](https://github.com/moonbeam-foundation/xcm-sdk/pull/278) [`b032066`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b032066a07428607b75e6cb6f2a5e9f1e5d78b4f) Thanks [@Rihyx](https://github.com/Rihyx)! - Update Vime and fix vulnerability

- Updated dependencies [[`49b762d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/49b762dbe5882233d0e20ef51d82f92b94888bbe), [`d91de57`](https://github.com/moonbeam-foundation/xcm-sdk/commit/d91de57c34e66356e3b08c13c7f316464b5be670), [`b032066`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b032066a07428607b75e6cb6f2a5e9f1e5d78b4f)]:
  - @moonbeam-network/xcm-types@2.2.3
  - @moonbeam-network/xcm-utils@2.1.1

## 2.3.0

### Minor Changes

- [#267](https://github.com/moonbeam-foundation/xcm-sdk/pull/267) [`e214548`](https://github.com/moonbeam-foundation/xcm-sdk/commit/e214548fb5be6b6c153b165960805e0f5279aa26) Thanks [@ekenigs](https://github.com/ekenigs)! - Updated PolkadotJS dependencies to v11

### Patch Changes

- Updated dependencies [[`e214548`](https://github.com/moonbeam-foundation/xcm-sdk/commit/e214548fb5be6b6c153b165960805e0f5279aa26)]:
  - @moonbeam-network/xcm-utils@2.1.0
  - @moonbeam-network/xcm-types@2.2.2

## 2.2.1

### Patch Changes

- Updated dependencies [[`2ee7f8e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2ee7f8e0af4edad1170f046b0eaa70ce49eaf65b)]:
  - @moonbeam-network/xcm-types@2.2.1
  - @moonbeam-network/xcm-utils@2.0.8

## 2.2.0

### Minor Changes

- [#254](https://github.com/moonbeam-foundation/xcm-sdk/pull/254) [`6282815`](https://github.com/moonbeam-foundation/xcm-sdk/commit/62828150ee586049c81145e053e390fcb8027c2a) Thanks [@Rihyx](https://github.com/Rihyx)! - make Precompile XCM flow work for Peaq

### Patch Changes

- [#256](https://github.com/moonbeam-foundation/xcm-sdk/pull/256) [`653b0b5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/653b0b5d162d5b6d724dd91f37f026cfb3d3ed2f) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependecies

- Updated dependencies [[`6282815`](https://github.com/moonbeam-foundation/xcm-sdk/commit/62828150ee586049c81145e053e390fcb8027c2a), [`653b0b5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/653b0b5d162d5b6d724dd91f37f026cfb3d3ed2f)]:
  - @moonbeam-network/xcm-types@2.2.0
  - @moonbeam-network/xcm-utils@2.0.7

## 2.1.1

### Patch Changes

- Updated dependencies [[`0967f74`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0967f74c5a32af2df8c1c4213e0c8f3bef5427cb)]:
  - @moonbeam-network/xcm-utils@2.0.6
  - @moonbeam-network/xcm-types@2.1.1

## 2.1.0

### Minor Changes

- [#217](https://github.com/moonbeam-foundation/xcm-sdk/pull/217) [`db25ff4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/db25ff4745b1e6c1de8795981aa8fac9ae275dbc) Thanks [@Rihyx](https://github.com/Rihyx)! - Add function to get balances, get balances and decimals without signer, add HydraDX Alphanet

### Patch Changes

- [#235](https://github.com/moonbeam-foundation/xcm-sdk/pull/235) [`4e3a861`](https://github.com/moonbeam-foundation/xcm-sdk/commit/4e3a861699a415058f0601ae431fb2dbd6269b17) Thanks [@Rihyx](https://github.com/Rihyx)! - update dev deps

- Updated dependencies [[`4e3a861`](https://github.com/moonbeam-foundation/xcm-sdk/commit/4e3a861699a415058f0601ae431fb2dbd6269b17), [`db25ff4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/db25ff4745b1e6c1de8795981aa8fac9ae275dbc)]:
  - @moonbeam-network/xcm-types@2.1.0
  - @moonbeam-network/xcm-utils@2.0.5

## 2.0.4

### Patch Changes

- [#230](https://github.com/moonbeam-foundation/xcm-sdk/pull/230) [`ee5cd03dff5fef8f580800b91f9cd2aa66b793ed`](https://github.com/moonbeam-foundation/xcm-sdk/commit/ee5cd03dff5fef8f580800b91f9cd2aa66b793ed) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update follow-redirects

- Updated dependencies [[`ee5cd03dff5fef8f580800b91f9cd2aa66b793ed`](https://github.com/moonbeam-foundation/xcm-sdk/commit/ee5cd03dff5fef8f580800b91f9cd2aa66b793ed)]:
  - @moonbeam-network/xcm-types@2.0.4
  - @moonbeam-network/xcm-utils@2.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [[`da06ea59a1fdfe09448c5c8998fa3a13a85e98f5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/da06ea59a1fdfe09448c5c8998fa3a13a85e98f5)]:
  - @moonbeam-network/xcm-utils@2.0.3
  - @moonbeam-network/xcm-types@2.0.3

## 2.0.2

### Patch Changes

- Updated dependencies [[`3ade51ff0ef5acc4a6f84391159d3652cd6ee792`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3ade51ff0ef5acc4a6f84391159d3652cd6ee792)]:
  - @moonbeam-network/xcm-utils@2.0.2
  - @moonbeam-network/xcm-types@2.0.2

## 2.0.1

### Patch Changes

- [#214](https://github.com/moonbeam-foundation/xcm-sdk/pull/214) [`c5b5d890ddcbc199108328ff535e9a63e58becd4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c5b5d890ddcbc199108328ff535e9a63e58becd4) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dev dependencies

- Updated dependencies [[`c5b5d890ddcbc199108328ff535e9a63e58becd4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c5b5d890ddcbc199108328ff535e9a63e58becd4)]:
  - @moonbeam-network/xcm-types@2.0.1
  - @moonbeam-network/xcm-utils@2.0.1

## 2.0.0

### Major Changes

- [#178](https://github.com/moonbeam-foundation/xcm-sdk/pull/178) [`5e77c1ed8aba82a3b12bf52393cef5b658351614`](https://github.com/moonbeam-foundation/xcm-sdk/commit/5e77c1ed8aba82a3b12bf52393cef5b658351614) Thanks [@mmaurello](https://github.com/mmaurello)! - Upgrate Viem and ethers major versions

  Breaking changes: we now require either `viem` V2 or `ethers` V6

  To upgrade to this version just update the corresponding library. Here are the migration guides for both:

  viem:
  https://wagmi.sh/core/guides/migrate-from-v1-to-v2
  https://wagmi.sh/react/guides/migrate-from-v1-to-v2

  ethers:
  https://docs.ethers.org/v6/migrating/

### Patch Changes

- Updated dependencies [[`5e77c1ed8aba82a3b12bf52393cef5b658351614`](https://github.com/moonbeam-foundation/xcm-sdk/commit/5e77c1ed8aba82a3b12bf52393cef5b658351614)]:
  - @moonbeam-network/xcm-utils@2.0.0
  - @moonbeam-network/xcm-types@2.0.0

## 1.0.13

### Patch Changes

- Updated dependencies [[`eb20aee`](https://github.com/moonbeam-foundation/xcm-sdk/commit/eb20aee9d9c9052074501421d0d442bd13022424)]:
  - @moonbeam-network/xcm-types@1.0.4

## 1.0.12

### Patch Changes

- [#192](https://github.com/moonbeam-foundation/xcm-sdk/pull/192) [`0b3cb1d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0b3cb1db7897bec9bfd743fe3f8104e480500496) Thanks [@mmaurello](https://github.com/mmaurello)! - Manta - Moonbeam integration and change of repo url

- Updated dependencies [[`0b3cb1d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0b3cb1db7897bec9bfd743fe3f8104e480500496)]:
  - @moonbeam-network/xcm-types@1.0.3
  - @moonbeam-network/xcm-utils@1.0.4

## 1.0.11

### Patch Changes

- [#184](https://github.com/moonbeam-foundation/xcm-sdk/pull/184) [`88b6322`](https://github.com/moonbeam-foundation/xcm-sdk/commit/88b6322327b30baa0fb2bf55f99497e2944c95ef) Thanks [@mmaurello](https://github.com/mmaurello)! - Use unlimited weight in all transactions for the xTokens pallet

- Updated dependencies [[`88b6322`](https://github.com/moonbeam-foundation/xcm-sdk/commit/88b6322327b30baa0fb2bf55f99497e2944c95ef)]:
  - @moonbeam-network/xcm-types@1.0.2

## 1.0.10

### Patch Changes

- [#174](https://github.com/moonbeam-foundation/xcm-sdk/pull/174) [`dec7174`](https://github.com/moonbeam-foundation/xcm-sdk/commit/dec71741caeb770e555a11daafcfba2144c74533) Thanks [@mmaurello](https://github.com/mmaurello)! - Pendulum integration with Moonbase

## 1.0.9

### Patch Changes

- [#166](https://github.com/moonbeam-foundation/xcm-sdk/pull/166) [`e4989bb`](https://github.com/moonbeam-foundation/xcm-sdk/commit/e4989bb4eb525dc5d9515e2b08cb0820956d7826) Thanks [@mmaurello](https://github.com/mmaurello)! - Change Astar and Shiden pallet and fix Any keyword error

- [#161](https://github.com/moonbeam-foundation/xcm-sdk/pull/161) [`df29a0b`](https://github.com/moonbeam-foundation/xcm-sdk/commit/df29a0b5b92fdbaa18e435b7aecef9e6d9c6087e) Thanks [@duxiaofeng-github](https://github.com/duxiaofeng-github)! - Add AccountId32 support

## 1.0.8

### Patch Changes

- [#148](https://github.com/moonbeam-foundation/xcm-sdk/pull/148) [`3f071c4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3f071c42555e9694b090b2281eb9d67b695aa750) Thanks [@mmaurello](https://github.com/mmaurello)! - Picasso integration with Moonbase and dependency updates

- Updated dependencies [[`3f071c4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3f071c42555e9694b090b2281eb9d67b695aa750), [`cd5da97`](https://github.com/moonbeam-foundation/xcm-sdk/commit/cd5da97e606e94f0ec0d2faa17ac44297c5ee98e)]:
  - @moonbeam-network/xcm-utils@1.0.3

## 1.0.7

### Patch Changes

- [#144](https://github.com/moonbeam-foundation/xcm-sdk/pull/144) [`8c16492`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8c16492f2cceef0e1ebc8a9ba70452e644efd135) Thanks [@mmaurello](https://github.com/mmaurello)! - FIL integration and EQ fix

## 1.0.6

### Patch Changes

- [#132](https://github.com/moonbeam-foundation/xcm-sdk/pull/132) [`69833f3`](https://github.com/moonbeam-foundation/xcm-sdk/commit/69833f3ab36f6c58f16ec167b22fb6985fbe9582) Thanks [@mmaurello](https://github.com/mmaurello)! - OriginTrail integration with Moonabse

## 1.0.5

### Patch Changes

- [#112](https://github.com/moonbeam-foundation/xcm-sdk/pull/112) [`697bdbb`](https://github.com/moonbeam-foundation/xcm-sdk/commit/697bdbbf10e569499f9e10dff0bb3173de01d458) Thanks [@ekenigs](https://github.com/ekenigs)! - ERC20 Alan and DEV tokens from Moonbase Alpha to Beta

- Updated dependencies [[`697bdbb`](https://github.com/moonbeam-foundation/xcm-sdk/commit/697bdbbf10e569499f9e10dff0bb3173de01d458)]:
  - @moonbeam-network/xcm-utils@1.0.2

## 1.0.4

### Patch Changes

- [#108](https://github.com/moonbeam-foundation/xcm-sdk/pull/108) [`dcee04b`](https://github.com/moonbeam-foundation/xcm-sdk/commit/dcee04be5df5c90027534a37e40e459ae0a14fa2) Thanks [@mmaurello](https://github.com/mmaurello)! - Change Statemint/Statemine names to Asset Hub

## 1.0.3

### Patch Changes

- [#104](https://github.com/moonbeam-foundation/xcm-sdk/pull/104) [`f1fc312`](https://github.com/moonbeam-foundation/xcm-sdk/commit/f1fc312d77e8d579e40e48e24f3c139599bf74ca) Thanks [@mmaurello](https://github.com/mmaurello)! - Turing network integration with Moonbase Alpha

## 1.0.2

### Patch Changes

- [#98](https://github.com/moonbeam-foundation/xcm-sdk/pull/98) [`1031601`](https://github.com/moonbeam-foundation/xcm-sdk/commit/1031601e9706fefd8edf00d9b68d224fd55cf357) Thanks [@ekenigs](https://github.com/ekenigs)! - Changed SDK packages deps to 1.x

- Updated dependencies [[`1031601`](https://github.com/moonbeam-foundation/xcm-sdk/commit/1031601e9706fefd8edf00d9b68d224fd55cf357)]:
  - @moonbeam-network/xcm-types@1.0.1

## 1.0.1

### Patch Changes

- [#95](https://github.com/moonbeam-foundation/xcm-sdk/pull/95) [`533aa3a`](https://github.com/moonbeam-foundation/xcm-sdk/commit/533aa3a551ca70e06d811967450f09086b0375e6) Thanks [@mmaurello](https://github.com/mmaurello)! - Detect Multilocation version for xTokens.TransferMulticurrencies

## 1.0.0

### Major Changes

- [#87](https://github.com/moonbeam-foundation/xcm-sdk/pull/87) [`3c8835e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3c8835e4afbe6fe0fd33a035e9c82d58e1902a45) Thanks [@ekenigs](https://github.com/ekenigs)! - SDK v1 which is not Moonbeam specific and with a new more user-friendly interface and new features

### Patch Changes

- Updated dependencies [[`3c8835e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3c8835e4afbe6fe0fd33a035e9c82d58e1902a45)]:
  - @moonbeam-network/xcm-types@1.0.0
  - @moonbeam-network/xcm-utils@1.0.0
