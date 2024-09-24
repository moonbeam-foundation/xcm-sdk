/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';
import type {
  FeeConfigBuilder,
  FeeConfigBuilderPrams,
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
        feeAsset,
        chain,
        transferAsset,
      }: FeeConfigBuilderPrams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedAssetId = await getVersionedAssetId(
              api,
              feeAsset,
              chain,
            );
            const versionedTransferAssetId = await getVersionedAssetId(
              api,
              transferAsset,
              chain,
            );
            const versionedAssets = shouldTransferAssetPrecedeFeeAsset
              ? [versionedTransferAssetId, versionedAssetId]
              : [versionedAssetId, versionedTransferAssetId];

            const assets =
              feeAsset === transferAsset ? [versionedAssetId] : versionedAssets;

            const instructions = [
              isAssetReserveChain
                ? getWithdrawAssetInstruction(assets)
                : getReserveAssetDepositedInstruction(assets),
              getClearOriginInstruction(),
              getBuyExecutionInstruction(versionedAssetId),
              getDepositAssetInstruction(address, assets),
              getSetTopicInstruction(),
            ];

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedAssetId,
            );
          },
        }),
    }),
  };
}
