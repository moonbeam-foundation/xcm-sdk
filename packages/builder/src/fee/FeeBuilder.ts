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
        source,
      }: FeeConfigBuilderParams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const sourceAsset = source.getChainAsset(asset);
            const versionedFeeAssetId = await getVersionedAssetId(
              api,
              sourceAsset,
              destination,
            );
            const versionedTransferAssetId = await getVersionedAssetId(
              api,
              asset,
              destination,
            );
            console.log('versionedFeeAssetId', versionedFeeAssetId);
            console.log(
              'getWithdrawAssetInstruction(assets)',
              getWithdrawAssetInstruction([versionedFeeAssetId]),
            );

            // TODO mjm refactor all this
            const versionedAssets = shouldTransferAssetPrecedeFeeAsset
              ? [versionedTransferAssetId, versionedFeeAssetId]
              : [versionedFeeAssetId, versionedTransferAssetId];
            console.log('versionedAssets', versionedAssets);

            const assets =
              feeAsset === asset ? [versionedFeeAssetId] : versionedAssets;
            console.log('assets', assets);

            const instructions = [
              isAssetReserveChain
                ? getWithdrawAssetInstruction(assets)
                : getReserveAssetDepositedInstruction(assets),
              getClearOriginInstruction(),
              getBuyExecutionInstruction(versionedFeeAssetId),
              getDepositAssetInstruction(address, assets),
              getSetTopicInstruction(),
            ];

            console.log('instructions', instructions);

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
