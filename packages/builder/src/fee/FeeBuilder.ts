/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';
import { FeeConfigBuilder, XcmPaymentFeeProps } from './FeeBuilder.interfaces';
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
      shouldTransferAssetPrecedeAsset = false,
    }: XcmPaymentFeeProps): FeeConfigBuilder => ({
      build: ({ address, api, asset, chain, transferAsset }) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedAssetId = await getVersionedAssetId(
              api,
              asset,
              chain,
            );
            const versionedTransferAssetId = await getVersionedAssetId(
              api,
              transferAsset,
              chain,
            );
            const versionedAssets = shouldTransferAssetPrecedeAsset
              ? [versionedTransferAssetId, versionedAssetId]
              : [versionedAssetId, versionedTransferAssetId];

            const assets =
              asset === transferAsset ? [versionedAssetId] : versionedAssets;

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
