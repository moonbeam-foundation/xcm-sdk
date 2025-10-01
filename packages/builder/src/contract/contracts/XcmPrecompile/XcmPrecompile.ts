import type { AssetAmount } from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { getExtrinsicArgumentVersion } from '../../../extrinsic/ExtrinsicBuilder.utils';
import { ContractConfig } from '../../../types';
import {
  type AssetAddressFormat,
  type ContractConfigBuilder,
  TransferType,
} from '../../ContractBuilder.interfaces';
import {
  encodeXcmMessageToBytes,
  getAssetMultilocation,
  getBeneficiaryMultilocation,
  getDestinationParachainMultilocation,
  getGlobalConsensusDestination,
} from '../../ContractBuilder.utils';
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
    transferAssetsToRelay: (): ContractConfigBuilder => ({
      build: ({ destinationAddress, asset }) => {
        return new ContractConfig({
          address: XCM_PRECOMPILE_ADDRESS,
          abi: XCM_ABI,
          args: [
            u8aToHex(decodeAddress(destinationAddress)),
            [[asset.address, asset.amount]],
            0,
          ],
          func: 'transferAssetsToRelay',
          module: 'Xcm',
        });
      },
    }),
    transferAssetsLocation: (): ContractConfigBuilder => ({
      // TODO

      build: ({ destinationAddress, asset, destination, sourceApi }) => {
        const destinationMultilocation = getGlobalConsensusDestination(
          sourceApi,
          destination,
        );

        console.log('destinationMultilocation', destinationMultilocation);

        console.log(
          'assetMultilocation',
          getAssetMultilocation(sourceApi, asset),
        );

        return new ContractConfig({
          address: XCM_PRECOMPILE_ADDRESS,
          abi: XCM_ABI,
          args: [
            getGlobalConsensusDestination(sourceApi, destination),
            getBeneficiaryMultilocation(destinationAddress, destination),
            [getAssetMultilocation(sourceApi, asset)],
            0,
          ],
          func: 'transferAssetsLocation',
          module: 'Xcm',
        });
      },
    }),
    transferAssetsUsingTypeAndThenAddress: (
      shouldTransferAssetPrecedeFeeAsset = false,
    ): ContractConfigBuilder => ({
      build: ({
        destinationAddress,
        asset,
        fee,
        destination,
        destinationApi,
        sourceApi,
      }) => {
        const assets = getAssets(
          asset,
          fee,
          shouldTransferAssetPrecedeFeeAsset,
        );

        const xcmMessage = buildXcmMessage(
          assets,
          destinationAddress,
          sourceApi,
        );

        const customXcmOnDest = encodeXcmMessageToBytes(
          xcmMessage,
          destinationApi,
        );

        const feeIndex = shouldTransferAssetPrecedeFeeAsset ? 1 : 0;

        return new ContractConfig({
          address: XCM_PRECOMPILE_ADDRESS,
          abi: XCM_ABI,
          args: [
            getDestinationParachainMultilocation(destination),
            assets,
            TransferType.DestinationReserve,
            feeIndex,
            TransferType.DestinationReserve,
            customXcmOnDest,
          ],
          func: 'transferAssetsUsingTypeAndThenAddress',
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
): AssetAddressFormat[] {
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

function buildXcmMessage(
  assets: AssetAddressFormat[],
  destinationAddress: string,
  sourceApi: ApiPromise | undefined,
) {
  const xcmVersion = getExtrinsicArgumentVersion(
    sourceApi?.tx.polkadotXcm?.send || sourceApi?.tx.xcmPallet?.send,
  );

  const instruction = {
    DepositAsset: {
      assets: { Wild: { AllCounted: assets.length } },
      beneficiary: {
        parents: 0,
        interior: {
          X1: [
            {
              AccountId32: {
                id: u8aToHex(decodeAddress(destinationAddress)),
                network: null,
              },
            },
          ],
        },
      },
    },
  };
  return {
    [xcmVersion]: [instruction],
  };
}
