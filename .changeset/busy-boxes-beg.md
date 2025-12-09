---
"@moonbeam-network/xcm-builder": minor
"@moonbeam-network/xcm-config": minor
"@moonbeam-network/xcm-types": minor
"@moonbeam-network/xcm-utils": minor
"@moonbeam-network/mrl": minor
"@moonbeam-network/xcm-sdk": minor
---

Change of MoonChain concept to BridgeChain


BREAKING CHANGES

-> MRL Package

- `moonChain` has been renamed to `bridgeChain`. 
Update all references accordingly.

- Transfer data source structure updated.

  - A new property otherFees has been added.
  - The existing relayerFee field has been moved to `source.otherFees.relayer`
Update any code that previously accessed `relayerFee` at the root of source.
