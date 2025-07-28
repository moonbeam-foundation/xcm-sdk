---
"@moonbeam-network/xcm-builder": major
"@moonbeam-network/xcm-config": major
"@moonbeam-network/xcm-types": major
"@moonbeam-network/mrl": major
"@moonbeam-network/xcm-sdk": major
"@moonbeam-network/xcm-utils": major
---

# Major Release: Enhanced XCM Transfer Monitoring

This major release introduces comprehensive monitoring capabilities for XCM transfers, enabling developers to track transfer states across both source and destination chains.

## 🚨 Breaking Changes

### Transfer Function API Changes

The `transfer` function signature has been updated across all packages to improve consistency and enable monitoring features:

**Before:**
```typescript
// XCM
const data = await Sdk().setAsset(asset).setSource(source).setDestination(destination);
await data.transfer(amount, { polkadotSigner: pair });

// MRL  
const transferData = await Mrl().setSource(source).setDestination(destination).setAsset(asset);
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
     signers: { polkadotSigner: pair }
   });
   ```

2. **For MRL transfers:**
   ```typescript
   // Replace this:
   await transferData.transfer(amount, isAutomatic, { evmSigner: walletClient });
   
   // With this:
   await transferData.transfer({
     amount,
     isAutomatic,
     signers: { evmSigner: walletClient }
   });
   ```

3. **Add monitoring callbacks (optional):**
   ```typescript
   await data.transfer({
     amount,
     signers: { polkadotSigner: pair },
     onSourceFinalized: () => console.log('Transaction sent successfully'),
     onSourceError: (error) => console.error('Error sending transaction', error),
     onDestinationFinalized: () => console.log('Assets successfully received'),
     onDestinationError: (error) => console.error('Error receiving assets', error)
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