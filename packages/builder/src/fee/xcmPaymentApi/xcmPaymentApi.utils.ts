import type { FeeConfigBuilderParams } from '../FeeBuilder.interfaces';
import {
  getBuyExecutionInstruction,
  getClearOriginInstruction,
  getDepositAssetInstruction,
  getReserveAssetDepositedInstruction,
  getSetTopicInstruction,
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
}

export function getInstructions({
  isAssetReserveChain,
  assets,
  versionedFeeAssetId,
  address,
}: GetInstructionsProps) {
  return [
    isAssetReserveChain
      ? getWithdrawAssetInstruction(assets)
      : getReserveAssetDepositedInstruction(assets),
    getClearOriginInstruction(),
    getBuyExecutionInstruction(versionedFeeAssetId),
    getDepositAssetInstruction(address, assets),
    getSetTopicInstruction(),
  ];
}
