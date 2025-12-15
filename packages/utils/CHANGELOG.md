# @moonbeam-network/xcm-utils

## 4.2.2

### Patch Changes

- [#597](https://github.com/moonbeam-foundation/xcm-sdk/pull/597) [`7eb7f3d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/7eb7f3de0c6ff5ec191fb49d2fc2487634de8bc7) Thanks [@mmaurello](https://github.com/mmaurello)! - Update Polkadot Major version

## 4.2.1

### Patch Changes

- [#595](https://github.com/moonbeam-foundation/xcm-sdk/pull/595) [`7dcdde3`](https://github.com/moonbeam-foundation/xcm-sdk/commit/7dcdde319d6a17efb23fb8367678004e8bca9104) Thanks [@mmaurello](https://github.com/mmaurello)! - Update dependencies

## 4.2.0

### Minor Changes

- [#586](https://github.com/moonbeam-foundation/xcm-sdk/pull/586) [`cf209b7`](https://github.com/moonbeam-foundation/xcm-sdk/commit/cf209b7b506bdc0ae113bec55cd79e65602de43c) Thanks [@mmaurello](https://github.com/mmaurello)! - Change of MoonChain concept to BridgeChain

  BREAKING CHANGES

  -> MRL Package

  - `moonChain` has been renamed to `bridgeChain`.
    Update all references accordingly.

  - Transfer data source structure updated.

    - A new property otherFees has been added.
    - The existing relayerFee field has been moved to `source.otherFees.relayer`
      Update any code that previously accessed `relayerFee` at the root of source.

## 4.1.4

### Patch Changes

- [#591](https://github.com/moonbeam-foundation/xcm-sdk/pull/591) [`602ba36`](https://github.com/moonbeam-foundation/xcm-sdk/commit/602ba36935905184b33d38d850b333d27a017857) Thanks [@mmaurello](https://github.com/mmaurello)! - Update dependencies and remove Phala

## 4.1.3

### Patch Changes

- [#572](https://github.com/moonbeam-foundation/xcm-sdk/pull/572) [`b6ad5e8`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b6ad5e8059fccac6513dd1de0484e7f6a205cb62) Thanks [@mmaurello](https://github.com/mmaurello)! - Update dependencies

## 4.1.2

### Patch Changes

- [#559](https://github.com/moonbeam-foundation/xcm-sdk/pull/559) [`c6490ee`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c6490ee2e6577d02b0f3f24bb597dc9d61625400) Thanks [@Rihyx](https://github.com/Rihyx)! - Fix Axios vulnerability

## 4.1.1

### Patch Changes

- [#558](https://github.com/moonbeam-foundation/xcm-sdk/pull/558) [`b15677d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b15677df00651b21010f3271effb21dd5dbba2fa) Thanks [@Rihyx](https://github.com/Rihyx)! - 📦 Update dependencies

## 4.1.0

### Minor Changes

- [#548](https://github.com/moonbeam-foundation/xcm-sdk/pull/548) [`50d36ef`](https://github.com/moonbeam-foundation/xcm-sdk/commit/50d36ef88dc4ba493b07f93065ad8da2b6c149c0) Thanks [@Rihyx](https://github.com/Rihyx)! - Add Moonsama <> Moonlama bridge routes

## 4.0.2

### Patch Changes

- [#546](https://github.com/moonbeam-foundation/xcm-sdk/pull/546) [`7ddd5f5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/7ddd5f5a9650cf74a7f033ef77ee83b6455a34b1) Thanks [@Rihyx](https://github.com/Rihyx)! - 📦 Update dependencies

## 4.0.1

### Patch Changes

- [#541](https://github.com/moonbeam-foundation/xcm-sdk/pull/541) [`38fdf0f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/38fdf0f178ff67fcde83af0018112b3c122a7f6a) Thanks [@mmaurello](https://github.com/mmaurello)! - Update dependencies

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

## 3.1.8

### Patch Changes

- [#529](https://github.com/moonbeam-foundation/xcm-sdk/pull/529) [`8694cd2`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8694cd2bfc462bf2b88be9fb11a96d25592bc635) Thanks [@Rihyx](https://github.com/Rihyx)! - fix axios vulnerability

## 3.1.7

### Patch Changes

- [#516](https://github.com/moonbeam-foundation/xcm-sdk/pull/516) [`c7e3640`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c7e3640a0a2ce47ebae90fba823b334e187ad20e) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies

## 3.1.6

### Patch Changes

- [#512](https://github.com/moonbeam-foundation/xcm-sdk/pull/512) [`b515e8c`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b515e8c979eb6ed18ff2fcbb164080a2b6ebd472) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies

## 3.1.5

### Patch Changes

- [#507](https://github.com/moonbeam-foundation/xcm-sdk/pull/507) [`8e5b2b5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8e5b2b54993a2f272ae1c2cd5fe95dcd35d77523) Thanks [@Rihyx](https://github.com/Rihyx)! - Update polkadot packages and other dependencies

## 3.1.4

### Patch Changes

- [#496](https://github.com/moonbeam-foundation/xcm-sdk/pull/496) [`e04f939`](https://github.com/moonbeam-foundation/xcm-sdk/commit/e04f9398d74a546f7c5ab9af0be1fb810f9f030c) Thanks [@Rihyx](https://github.com/Rihyx)! - Fix vite vulnerability

## 3.1.3

### Patch Changes

- [#494](https://github.com/moonbeam-foundation/xcm-sdk/pull/494) [`3192daa`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3192daacb3c53fd93de3f178f4753272888468b4) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies

## 3.1.2

### Patch Changes

- [#472](https://github.com/moonbeam-foundation/xcm-sdk/pull/472) [`cab9d0d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/cab9d0d61174bfdfd57da3e85bcf465400c2f9cb) Thanks [@Rihyx](https://github.com/Rihyx)! - Dependency updates

## 3.1.1

### Patch Changes

- [#470](https://github.com/moonbeam-foundation/xcm-sdk/pull/470) [`0835496`](https://github.com/moonbeam-foundation/xcm-sdk/commit/083549616852d5728f1533ae813623d04efc6929) Thanks [@Rihyx](https://github.com/Rihyx)! - Update vitest and fix vite vulnerability

## 3.1.0

### Minor Changes

- [#458](https://github.com/moonbeam-foundation/xcm-sdk/pull/458) [`0117cf4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0117cf402e9b17d5d6e1974a3691aaed980e2ada) Thanks [@mmaurello](https://github.com/mmaurello)! - XCM Payment API for generic chains. Prepare for Moonbeam ERC20 migrations

## 3.0.7

### Patch Changes

- [#450](https://github.com/moonbeam-foundation/xcm-sdk/pull/450) [`2c65658`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2c65658b6a260e17a9fb4d0be02ff5ce079a218c) Thanks [@Rihyx](https://github.com/Rihyx)! - comment out RPC for centrifuge, update e2e tests

- [#457](https://github.com/moonbeam-foundation/xcm-sdk/pull/457) [`a6e3a2e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/a6e3a2e7b6855496f24170a63346bdfd46fc9a1a) Thanks [@mmaurello](https://github.com/mmaurello)! - Update dependencies and address axios vulnerability

## 3.0.6

### Patch Changes

- [#448](https://github.com/moonbeam-foundation/xcm-sdk/pull/448) [`9cfb71c`](https://github.com/moonbeam-foundation/xcm-sdk/commit/9cfb71c2f78698454fc753ec2643caa52b92bcb3) Thanks [@Rihyx](https://github.com/Rihyx)! - Update esbuild

## 3.0.5

### Patch Changes

- [#447](https://github.com/moonbeam-foundation/xcm-sdk/pull/447) [`0424bca`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0424bcaeb1912096a6e0effd1a8313002850db2a) Thanks [@Rihyx](https://github.com/Rihyx)! - Migrate GitHub workflows to OpsLayer pnpm installation

- [#442](https://github.com/moonbeam-foundation/xcm-sdk/pull/442) [`2c4a22d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2c4a22d0538fba4202e88e9ef4534a55cb09441c) Thanks [@mmaurello](https://github.com/mmaurello)! - PAtch bump to test changeset fix in release flow

- [#445](https://github.com/moonbeam-foundation/xcm-sdk/pull/445) [`a6c32a8`](https://github.com/moonbeam-foundation/xcm-sdk/commit/a6c32a8d6ae26a7864b9ccf16c78978d0af7aa1c) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies

- [#446](https://github.com/moonbeam-foundation/xcm-sdk/pull/446) [`3ea4276`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3ea427622b36de0f9a1dce299a1455a272afbcd3) Thanks [@Rihyx](https://github.com/Rihyx)! - Update polkadot packages and pnpm

## 3.0.4

### Patch Changes

- [#429](https://github.com/moonbeam-foundation/xcm-sdk/pull/429) [`b3ade4a`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b3ade4a6110b017d4e2e2bbc4a4095ba5960bd94) Thanks [@Rihyx](https://github.com/Rihyx)! - update polkadot stuff to the latest version

## 3.0.3

### Patch Changes

- [#430](https://github.com/moonbeam-foundation/xcm-sdk/pull/430) [`81c13dc`](https://github.com/moonbeam-foundation/xcm-sdk/commit/81c13dc45e4f15ef9a311ef0c9f449224b88e535) Thanks [@mmaurello](https://github.com/mmaurello)! - Fix lint

## 3.0.2

### Patch Changes

- [#427](https://github.com/moonbeam-foundation/xcm-sdk/pull/427) [`691c44e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/691c44eb3ee0929f0666c148bf3816c74e2688a7) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependencies and fix vulnerabilities

## 3.0.1

### Major Changes

- [#419](https://github.com/moonbeam-foundation/xcm-sdk/pull/419) [`629f42b`](https://github.com/moonbeam-foundation/xcm-sdk/commit/629f42bcd1a46ec96ab2767cecdff88a86a73a89) Thanks [@mmaurello](https://github.com/mmaurello)! - XCM SDK V3, MRL module introduction

## 2.2.5

### Patch Changes

- [#410](https://github.com/moonbeam-foundation/xcm-sdk/pull/410) [`8f9a961`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8f9a9613afa73ca5a56ed4af93f4c37fd9f500f9) Thanks [@Rihyx](https://github.com/Rihyx)! - resolve nanoid vulnerability

## 2.2.4

### Patch Changes

- [#404](https://github.com/moonbeam-foundation/xcm-sdk/pull/404) [`d2899b5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/d2899b57260061389ef5dfc8d7105cdb22c7e1c0) Thanks [@Rihyx](https://github.com/Rihyx)! - remmove remove-eslint-import-resolver-typescript

## 2.2.3

### Patch Changes

- [#390](https://github.com/moonbeam-foundation/xcm-sdk/pull/390) [`2790340`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2790340bb8ea0edda13765875d91a3a5d993a072) Thanks [@dependabot](https://github.com/apps/dependabot)! - Fix vulnerability

- [#393](https://github.com/moonbeam-foundation/xcm-sdk/pull/393) [`1546937`](https://github.com/moonbeam-foundation/xcm-sdk/commit/1546937e5636cb6e225a06a8e41c6e6593413c42) Thanks [@Rihyx](https://github.com/Rihyx)! - fix cross-spawn vulnerability

## 2.2.2

### Patch Changes

- [#379](https://github.com/moonbeam-foundation/xcm-sdk/pull/379) [`a724e92`](https://github.com/moonbeam-foundation/xcm-sdk/commit/a724e92f4f7488ced6c4050cea2ad0e98731a5c2) Thanks [@Rihyx](https://github.com/Rihyx)! - fix vulnerability

## 2.2.1

### Patch Changes

- [#373](https://github.com/moonbeam-foundation/xcm-sdk/pull/373) [`10755b4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/10755b4164ab7de94578732b4f92d70f8478c1ed) Thanks [@Rihyx](https://github.com/Rihyx)! - update minor and patch dependencies

## 2.2.0

### Minor Changes

- [#353](https://github.com/moonbeam-foundation/xcm-sdk/pull/353) [`4be5659`](https://github.com/moonbeam-foundation/xcm-sdk/commit/4be5659c05fe2487dd6f440c833fdf7cdc369917) Thanks [@mmaurello](https://github.com/mmaurello)! - Release minor version for xcm-utils with isHexString

## 2.1.7

### Patch Changes

- [#330](https://github.com/moonbeam-foundation/xcm-sdk/pull/330) [`69e849b`](https://github.com/moonbeam-foundation/xcm-sdk/commit/69e849bb35ca23be6210dddc395a52fdf8158ca1) Thanks [@ekenigs](https://github.com/ekenigs)! - Updated dependencies

## 2.1.6

### Patch Changes

- [#329](https://github.com/moonbeam-foundation/xcm-sdk/pull/329) [`bfe9f64`](https://github.com/moonbeam-foundation/xcm-sdk/commit/bfe9f6481f078c2022d70d6c1bc096f87b724477) Thanks [@mmaurello](https://github.com/mmaurello)! - Allow signed transaction in signAndSend to make ledger signing work

## 2.1.5

### Patch Changes

- [#322](https://github.com/moonbeam-foundation/xcm-sdk/pull/322) [`70085b8`](https://github.com/moonbeam-foundation/xcm-sdk/commit/70085b814801967cd7ccce3a26ed681e45da9677) Thanks [@Rihyx](https://github.com/Rihyx)! - Fix axios vulnerability

## 2.1.4

### Patch Changes

- [#312](https://github.com/moonbeam-foundation/xcm-sdk/pull/312) [`af20119`](https://github.com/moonbeam-foundation/xcm-sdk/commit/af20119c15a2aec5f776e90b25f26282c32f743e) Thanks [@ekenigs](https://github.com/ekenigs)! - Updated dependencies

- [#317](https://github.com/moonbeam-foundation/xcm-sdk/pull/317) [`8190789`](https://github.com/moonbeam-foundation/xcm-sdk/commit/8190789caf9bb9469f2be4189945c68450f54702) Thanks [@ekenigs](https://github.com/ekenigs)! - Updated dependencies

## 2.1.3

### Patch Changes

- [#288](https://github.com/moonbeam-foundation/xcm-sdk/pull/288) [`c72497f`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c72497fdca94984988af5bd6454dbb843c7a3b4e) Thanks [@ekenigs](https://github.com/ekenigs)! - Updated dependencies

## 2.1.2

### Patch Changes

- [#297](https://github.com/moonbeam-foundation/xcm-sdk/pull/297) [`b6f7fef`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b6f7fef640aa442b1e99ce930a25fd0dd94cd8bf) Thanks [@Rihyx](https://github.com/Rihyx)! - Fix script to check WS endpoints

- [#298](https://github.com/moonbeam-foundation/xcm-sdk/pull/298) [`308260e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/308260e1f87b683effe9c04d1d61422d51b37eaf) Thanks [@Rihyx](https://github.com/Rihyx)! - Update minor and patch dependencies

## 2.1.1

### Patch Changes

- [#273](https://github.com/moonbeam-foundation/xcm-sdk/pull/273) [`d91de57`](https://github.com/moonbeam-foundation/xcm-sdk/commit/d91de57c34e66356e3b08c13c7f316464b5be670) Thanks [@ekenigs](https://github.com/ekenigs)! - Multiple WS urls for PolkadotJS API

- [#278](https://github.com/moonbeam-foundation/xcm-sdk/pull/278) [`b032066`](https://github.com/moonbeam-foundation/xcm-sdk/commit/b032066a07428607b75e6cb6f2a5e9f1e5d78b4f) Thanks [@Rihyx](https://github.com/Rihyx)! - Update Vime and fix vulnerability

## 2.1.0

### Minor Changes

- [#267](https://github.com/moonbeam-foundation/xcm-sdk/pull/267) [`e214548`](https://github.com/moonbeam-foundation/xcm-sdk/commit/e214548fb5be6b6c153b165960805e0f5279aa26) Thanks [@ekenigs](https://github.com/ekenigs)! - Updated PolkadotJS dependencies to v11

## 2.0.8

### Patch Changes

- [#262](https://github.com/moonbeam-foundation/xcm-sdk/pull/262) [`2ee7f8e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/2ee7f8e0af4edad1170f046b0eaa70ce49eaf65b) Thanks [@ekenigs](https://github.com/ekenigs)! - Updated dependencies

## 2.0.7

### Patch Changes

- [#256](https://github.com/moonbeam-foundation/xcm-sdk/pull/256) [`653b0b5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/653b0b5d162d5b6d724dd91f37f026cfb3d3ed2f) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dependecies

## 2.0.6

### Patch Changes

- [#237](https://github.com/moonbeam-foundation/xcm-sdk/pull/237) [`0967f74`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0967f74c5a32af2df8c1c4213e0c8f3bef5427cb) Thanks [@mmaurello](https://github.com/mmaurello)! - Modify MRL types

## 2.0.5

### Patch Changes

- [#235](https://github.com/moonbeam-foundation/xcm-sdk/pull/235) [`4e3a861`](https://github.com/moonbeam-foundation/xcm-sdk/commit/4e3a861699a415058f0601ae431fb2dbd6269b17) Thanks [@Rihyx](https://github.com/Rihyx)! - update dev deps

## 2.0.4

### Patch Changes

- [#230](https://github.com/moonbeam-foundation/xcm-sdk/pull/230) [`ee5cd03dff5fef8f580800b91f9cd2aa66b793ed`](https://github.com/moonbeam-foundation/xcm-sdk/commit/ee5cd03dff5fef8f580800b91f9cd2aa66b793ed) Thanks [@dependabot](https://github.com/apps/dependabot)! - Update follow-redirects

## 2.0.3

### Patch Changes

- [#226](https://github.com/moonbeam-foundation/xcm-sdk/pull/226) [`da06ea59a1fdfe09448c5c8998fa3a13a85e98f5`](https://github.com/moonbeam-foundation/xcm-sdk/commit/da06ea59a1fdfe09448c5c8998fa3a13a85e98f5) Thanks [@ekenigs](https://github.com/ekenigs)! - Added util function getSovereignAccountAddresses

## 2.0.2

### Patch Changes

- [#211](https://github.com/moonbeam-foundation/xcm-sdk/pull/211) [`3ade51ff0ef5acc4a6f84391159d3652cd6ee792`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3ade51ff0ef5acc4a6f84391159d3652cd6ee792) Thanks [@mmaurello](https://github.com/mmaurello)! - Add MRL types to polkadot API

## 2.0.1

### Patch Changes

- [#214](https://github.com/moonbeam-foundation/xcm-sdk/pull/214) [`c5b5d890ddcbc199108328ff535e9a63e58becd4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/c5b5d890ddcbc199108328ff535e9a63e58becd4) Thanks [@Rihyx](https://github.com/Rihyx)! - Update dev dependencies

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

## 1.0.4

### Patch Changes

- [#192](https://github.com/moonbeam-foundation/xcm-sdk/pull/192) [`0b3cb1d`](https://github.com/moonbeam-foundation/xcm-sdk/commit/0b3cb1db7897bec9bfd743fe3f8104e480500496) Thanks [@mmaurello](https://github.com/mmaurello)! - Manta - Moonbeam integration and change of repo url

## 1.0.3

### Patch Changes

- [#148](https://github.com/moonbeam-foundation/xcm-sdk/pull/148) [`3f071c4`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3f071c42555e9694b090b2281eb9d67b695aa750) Thanks [@mmaurello](https://github.com/mmaurello)! - Picasso integration with Moonbase and dependency updates

- [#145](https://github.com/moonbeam-foundation/xcm-sdk/pull/145) [`cd5da97`](https://github.com/moonbeam-foundation/xcm-sdk/commit/cd5da97e606e94f0ec0d2faa17ac44297c5ee98e) Thanks [@ekenigs](https://github.com/ekenigs)! - Disabled Polkadot.js API init warnings

## 1.0.2

### Patch Changes

- [#112](https://github.com/moonbeam-foundation/xcm-sdk/pull/112) [`697bdbb`](https://github.com/moonbeam-foundation/xcm-sdk/commit/697bdbbf10e569499f9e10dff0bb3173de01d458) Thanks [@ekenigs](https://github.com/ekenigs)! - ERC20 Alan and DEV tokens from Moonbase Alpha to Beta

## 1.0.1

### Patch Changes

- [`069b738`](https://github.com/moonbeam-foundation/xcm-sdk/commit/069b73810c6e1e271edc489ed40bae06d9d62a37) Thanks [@mmaurello](https://github.com/mmaurello)! - Mangata - Moonriver integration

## 1.0.0

### Major Changes

- [#87](https://github.com/moonbeam-foundation/xcm-sdk/pull/87) [`3c8835e`](https://github.com/moonbeam-foundation/xcm-sdk/commit/3c8835e4afbe6fe0fd33a035e9c82d58e1902a45) Thanks [@ekenigs](https://github.com/ekenigs)! - SDK v1 which is not Moonbeam specific and with a new more user-friendly interface and new features

## 0.0.7

### Patch Changes

- [#74](https://github.com/moonbeam-foundation/xcm-sdk/pull/74) [`7159d68`](https://github.com/moonbeam-foundation/xcm-sdk/commit/7159d68cd9a2a8c0c2e2e0f8a8405e6a1a9a8607) Thanks [@ekenigs](https://github.com/ekenigs)! - Added a convertDecimals function
