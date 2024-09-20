/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { Option, u128 } from '@polkadot/types';
import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';
import { FeeConfigBuilder, XcmPaymentFeeProps } from './FeeBuilder.interfaces';
import {
  getAssetIdType,
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
    assetManager,
    xcmPaymentApi,
  };
}
// TODO mjm remove this if unused
function assetManager() {
  return {
    assetTypeUnitsPerSecond: (weight = 1_000_000_000): FeeConfigBuilder => ({
      build: ({ api, asset }) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const type = await getAssetIdType(api, asset);

            const unwrappedType = type.unwrap();

            const res = (await api.query.assetManager.assetTypeUnitsPerSecond(
              unwrappedType,
            )) as unknown as Option<u128>;

            const unitsPerSecond = res.unwrapOrDefault().toBigInt();

            return (BigInt(weight) * unitsPerSecond) / BigInt(10 ** 12);
          },
        }),
    }),
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

            console.log('instructions', instructions);
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
