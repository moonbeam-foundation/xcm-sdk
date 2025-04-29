import type { AssetAmount } from '@moonbeam-network/xcm-types';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { ContractConfig } from '../../../types';
import type { ContractConfigBuilder } from '../../ContractBuilder.interfaces';
import { XCM_ABI } from './XcmPrecompileAbi';

const XCM_PRECOMPILE_ADDRESS = '0x000000000000000000000000000000000000081A';

export function XcmPrecompile() {
  return {
    transferAssetsToPara20: (
      shouldTransferAssetPrecedeFeeAsset = true,
    ): ContractConfigBuilder => ({
      build: ({ destinationAddress, asset, destination, fee }) => {
        const assets = getAssets(
          asset,
          fee,
          shouldTransferAssetPrecedeFeeAsset,
        );

        return new ContractConfig({
          address: XCM_PRECOMPILE_ADDRESS,
          abi: XCM_ABI,
          args: [destination.parachainId, destinationAddress, assets, 0],
          func: 'transferAssetsToPara20',
          module: 'Xcm',
        });
      },
    }),
    transferAssetsToPara32: (
      shouldTransferAssetPrecedeFeeAsset = false,
    ): ContractConfigBuilder => ({
      build: ({ destinationAddress, asset, destination, fee }) => {
        const assets = getAssets(
          asset,
          fee,
          shouldTransferAssetPrecedeFeeAsset,
        );

        return new ContractConfig({
          address: XCM_PRECOMPILE_ADDRESS,
          abi: XCM_ABI,
          args: [
            destination.parachainId,
            u8aToHex(decodeAddress(destinationAddress)),
            assets,
            0,
          ],
          func: 'transferAssetsToPara32',
          module: 'Xcm',
        });
      },
    }),
  };
}

function getAssets(
  asset: AssetAmount,
  feeAsset: AssetAmount,
  shouldTransferAssetPrecedeFeeAsset: boolean,
) {
  if (feeAsset.isSame(asset)) {
    return [[asset.address, asset.amount]];
  }

  return shouldTransferAssetPrecedeFeeAsset
    ? [
        [asset.address, asset.amount],
        [feeAsset.address, feeAsset.amount],
      ]
    : [
        [feeAsset.address, feeAsset.amount],
        [asset.address, asset.amount],
      ];
}
