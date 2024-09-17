/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { Option, Result, u128 } from '@polkadot/types';
import { Error as PolkadotError, Weight } from '@polkadot/types/interfaces';
import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';
import { FeeConfigBuilder } from './FeeBuilder.interfaces';
import {
  getAssetIdType,
  getBuyExecutionInstruction,
  getClearOriginInstruction,
  getDepositAssetInstruction,
  getVersionedAssetId,
  getWithdrawAssetInstruction,
} from './FeeBuilder.utils';

export function FeeBuilder() {
  return {
    assetManager,
    xcmPaymentFee,
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

function xcmPaymentFee() {
  return {
    // TODO mjm rename all this
    xcmPaymentFee: (): FeeConfigBuilder => ({
      build: ({ address, api, asset }) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            // TODO mjm rename assetId?
            const assetId = await getVersionedAssetId(api, asset);
            console.log('assetId', assetId);

            const instructions = [
              getWithdrawAssetInstruction([assetId]),
              getClearOriginInstruction(),
              getBuyExecutionInstruction(assetId),
              getDepositAssetInstruction(address),
            ];

            // TODO mjm not Weight
            const xcmToWeight: Result<Weight, PolkadotError> =
              await api.call.xcmPaymentApi.queryXcmWeight({
                V3: instructions,
              });
            console.log('xcmToWeight', xcmToWeight.toHuman());
            console.log('refTime', xcmToWeight.asOk.refTime.toHuman());

            const weightToForeingAssets: Result<u128, PolkadotError> =
              await api.call.xcmPaymentApi.queryWeightToAssetFee(
                xcmToWeight.asOk,
                {
                  V3: {
                    ...assetId,
                  },
                },
              );
            console.log(
              'weightToForeingAssets',
              weightToForeingAssets.toHuman(),
            );

            return weightToForeingAssets.asOk.toBigInt();
          },
        }),
    }),
    xcmPaymentFeeNonReserve: (): FeeConfigBuilder => ({
      build: ({ address, api, asset }) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const assetId = await getVersionedAssetId(api, asset);

            const instructions = [
              getWithdrawAssetInstruction([assetId]),
              getClearOriginInstruction(),
              getBuyExecutionInstruction(assetId),
              getDepositAssetInstruction(address),
            ];

            const xcmToWeight: Result<Weight, PolkadotError> =
              await api.call.xcmPaymentApi.queryXcmWeight({
                V3: instructions,
              });
            console.log('xcmToWeight', xcmToWeight.toHuman());
            console.log('refTime', xcmToWeight.asOk.refTime.toHuman());

            const weightToForeingAssets: Result<u128, PolkadotError> =
              await api.call.xcmPaymentApi.queryWeightToAssetFee(
                xcmToWeight.asOk,
                {
                  V3: {
                    ...assetId,
                  },
                },
              );
            console.log(
              'weightToForeingAssets',
              weightToForeingAssets.toHuman(),
            );

            return weightToForeingAssets.asOk.toBigInt();
          },
        }),
    }),
    xcmPaymentFeeDoubleAsset: (): FeeConfigBuilder => ({
      build: ({ address, api, asset, transferAsset }) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const assetId = await getVersionedAssetId(api, asset);
            const transferAssetId = await getVersionedAssetId(
              api,
              transferAsset,
            );

            const instructions = [
              getWithdrawAssetInstruction([assetId, transferAssetId]),
              getClearOriginInstruction(),
              getBuyExecutionInstruction(assetId),
              getDepositAssetInstruction(address),
            ];

            const xcmToWeight: Result<Weight, PolkadotError> =
              await api.call.xcmPaymentApi.queryXcmWeight({
                V3: instructions,
              });
            console.log('xcmToWeight', xcmToWeight.toHuman());
            console.log('refTime', xcmToWeight.asOk.refTime.toHuman());

            const weightToForeingAssets: Result<u128, PolkadotError> =
              await api.call.xcmPaymentApi.queryWeightToAssetFee(
                xcmToWeight.asOk,
                {
                  V3: {
                    ...assetId,
                  },
                },
              );
            console.log(
              'weightToForeingAssets',
              weightToForeingAssets.toHuman(),
            );

            return weightToForeingAssets.asOk.toBigInt();
          },
        }),
    }),
  };
}
