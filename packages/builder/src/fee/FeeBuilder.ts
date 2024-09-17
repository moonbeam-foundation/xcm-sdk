/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { Option, u128 } from '@polkadot/types';
import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';
import { FeeConfigBuilder } from './FeeBuilder.interfaces';
import {
  getAssetIdType,
  getBuyExecutionInstruction,
  getClearOriginInstruction,
  getDepositAssetInstruction,
  getFeeForXcmInstructionsAndAsset,
  getVersionedAssetId,
  getWithdrawAssetInstruction,
} from './FeeBuilder.utils';

export function FeeBuilder() {
  return {
    assetManager,
    xcmPaymentApi,
  };
}

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
    // TODO mjm rename all this
    xcmPaymentFee: (): FeeConfigBuilder => ({
      build: ({ address, api, asset }) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            // TODO mjm rename assetId?
            const versionedAssetId = await getVersionedAssetId(api, asset);
            console.log('versionedAssetId', versionedAssetId);

            const instructions = [
              getWithdrawAssetInstruction([versionedAssetId]),
              getClearOriginInstruction(),
              getBuyExecutionInstruction(versionedAssetId),
              getDepositAssetInstruction(address),
            ];

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedAssetId,
            );
          },
        }),
    }),
    xcmPaymentFeeNonReserve: (): FeeConfigBuilder => ({
      build: ({ address, api, asset }) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedAssetId = await getVersionedAssetId(api, asset);

            const instructions = [
              getWithdrawAssetInstruction([versionedAssetId]),
              getClearOriginInstruction(),
              getBuyExecutionInstruction(versionedAssetId),
              getDepositAssetInstruction(address),
            ];

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedAssetId,
            );
          },
        }),
    }),
    xcmPaymentFeeDoubleAsset: (): FeeConfigBuilder => ({
      build: ({ address, api, asset, transferAsset }) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedAssetId = await getVersionedAssetId(api, asset);
            const versionedTransferAssetId = await getVersionedAssetId(
              api,
              transferAsset,
            );

            const instructions = [
              getWithdrawAssetInstruction([
                versionedAssetId,
                versionedTransferAssetId,
              ]),
              getClearOriginInstruction(),
              getBuyExecutionInstruction(versionedAssetId),
              getDepositAssetInstruction(address),
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
