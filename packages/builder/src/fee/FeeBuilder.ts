/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';
import type {
  FeeConfigBuilder,
  FeeConfigBuilderParams,
  XcmPaymentFeeProps,
} from './FeeBuilder.interfaces';
import {
  getBuyExecutionInstruction,
  getClearOriginInstruction,
  getDepositAssetInstruction,
  getFeeForXcmInstructionsAndAsset,
  getReserveAssetDepositedInstruction,
  getSetTopicInstruction,
  getVersionedAssetId,
  getWithdrawAssetInstruction,
} from './FeeBuilder.utils';

export function FeeBuilder() {
  return {
    xcmPaymentApi,
  };
}

function xcmPaymentApi() {
  return {
    xcmPaymentFee: ({
      isAssetReserveChain,
      shouldTransferAssetPrecedeFeeAsset = false,
    }: XcmPaymentFeeProps): FeeConfigBuilder => ({
      build: ({
        address,
        api,
        asset,
        destination,
        feeAsset,
      }: FeeConfigBuilderParams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedFeeAssetId = await getVersionedAssetId(
              api,
              feeAsset,
              destination,
            );
            const versionedTransferAssetId = await getVersionedAssetId(
              api,
              asset,
              destination,
            );
            const versionedAssets = shouldTransferAssetPrecedeFeeAsset
              ? [versionedTransferAssetId, versionedFeeAssetId]
              : [versionedFeeAssetId, versionedTransferAssetId];

            const assets =
              feeAsset === asset ? [versionedFeeAssetId] : versionedAssets;

            const instructions = [
              isAssetReserveChain
                ? getWithdrawAssetInstruction(assets)
                : getReserveAssetDepositedInstruction(assets),
              getClearOriginInstruction(),
              getBuyExecutionInstruction(versionedFeeAssetId),
              getDepositAssetInstruction(address, assets),
              getSetTopicInstruction(),
            ];

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedFeeAssetId,
            );
          },
        }),
    }),
  };
}
