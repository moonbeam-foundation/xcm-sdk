import type { AnyChain } from '@moonbeam-network/xcm-types';
import type { FeeConfigBuilderParams } from '../FeeBuilder.interfaces';
import {
  getBuyExecutionInstruction,
  getClearOriginInstruction,
  getDepositAssetInstruction,
  getDescendOriginInstruction,
  getReserveAssetDepositedInstruction,
  getSetTopicInstruction,
  getUniversalOriginInstruction,
  getWithdrawAssetInstruction,
} from '../FeeBuilder.utils';
import type { CreateXcmFeeBuilderProps } from './xcmPaymentApi';

export interface GetVersionedAssetsProps extends CreateXcmFeeBuilderProps {
  params: FeeConfigBuilderParams;
}

export async function getVersionedAssets({
  getVersionedFeeAsset,
  getVersionedTransferAsset,
  options,
  params,
}: GetVersionedAssetsProps): Promise<[object[], object]> {
  const { asset: transferAsset, feeAsset } = params;
  const versionedFeeAssetId = await getVersionedFeeAsset(params);

  const assets = [versionedFeeAssetId];

  if (feeAsset !== transferAsset && getVersionedTransferAsset) {
    const versionedTransferAssetId = await getVersionedTransferAsset(params);

    if (options.shouldTransferAssetPrecedeFeeAsset) {
      assets.unshift(versionedTransferAssetId);
    } else {
      assets.push(versionedTransferAssetId);
    }
  }

  return [assets, versionedFeeAssetId];
}

interface GetInstructionsProps {
  isAssetReserveChain: boolean;
  assets: object[];
  versionedFeeAssetId: object;
  address: string;
  source: AnyChain;
  isEcosystemBridge?: boolean;
}

export function getInstructions({
  isAssetReserveChain,
  assets,
  versionedFeeAssetId,
  address,
  source,
  isEcosystemBridge,
}: GetInstructionsProps) {
  const instructions = [
    isAssetReserveChain
      ? getWithdrawAssetInstruction(assets)
      : getReserveAssetDepositedInstruction(assets),
    getClearOriginInstruction(),
    getBuyExecutionInstruction(versionedFeeAssetId),
    getDepositAssetInstruction(address, assets),
    getSetTopicInstruction(),
  ];

  if (isEcosystemBridge) {
    return [
      getUniversalOriginInstruction(source),
      getDescendOriginInstruction(source),
      ...instructions,
    ];
  }

  return instructions;
}
