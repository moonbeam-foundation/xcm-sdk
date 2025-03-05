/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';
import type {
  FeeConfigBuilder,
  FeeConfigBuilderParams,
  XcmPaymentFeeProps,
} from './FeeBuilder.interfaces';
import {
  buildVersionedAssetIdFromAccountKey20,
  buildVersionedAssetIdFromGeneralIndex,
  buildVersionedAssetIdFromGlobalConsensus,
  buildVersionedAssetIdFromHere,
  buildVersionedAssetIdFromPalletInstance,
  buildVersionedAssetIdFromPalletInstanceAndGeneralIndex,
  buildVersionedAssetIdFromSourceAccountKey20,
  buildVersionedAssetIdFromSourceGeneralIndex,
  buildVersionedAssetIdFromSourcePalletInstance,
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
    // TODO mjm deprecate this
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
    fromHere: ({
      isAssetReserveChain,
      parents = 1,
    }: XcmPaymentFeeProps): FeeConfigBuilder => ({
      build: ({ address, api }: FeeConfigBuilderParams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedFeeAssetId = buildVersionedAssetIdFromHere(parents);
            console.log('versionedFeeAssetId', versionedFeeAssetId);

            const instructions = getInstructions({
              isAssetReserveChain, // TODO mjm revisit this
              assets: [versionedFeeAssetId],
              versionedFeeAssetId,
              address,
            });

            console.log('instructions', instructions);

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedFeeAssetId,
            );
          },
        }),
    }),
    fromSourceAccountKey20: ({
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
            const versionedAssetId =
              buildVersionedAssetIdFromSourceAccountKey20(source, asset);

            const versionedFeeAssetId = versionedAssetId;
            const assets = [versionedAssetId];

            const instructions = getInstructions({
              isAssetReserveChain, // TODO mjm revisit this
              assets,
              versionedFeeAssetId: versionedAssetId,
              address,
            });

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedFeeAssetId,
            );
          },
        }),
    }),
    fromPalletInstanceAndAccountKey20: ({
      isAssetReserveChain, // TODO mjm pass this?
      shouldTransferAssetPrecedeFeeAsset = false,
    }: XcmPaymentFeeProps): FeeConfigBuilder => ({
      build: ({ address, api, asset, feeAsset }: FeeConfigBuilderParams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedTransferAssetId =
              buildVersionedAssetIdFromAccountKey20(asset);
            const versionedFeeAssetId =
              buildVersionedAssetIdFromPalletInstance(feeAsset);

            const versionedAssets = shouldTransferAssetPrecedeFeeAsset
              ? [versionedTransferAssetId, versionedFeeAssetId]
              : [versionedFeeAssetId, versionedTransferAssetId];

            // TODO mjm refactor all this
            const assets =
              feeAsset === asset ? [versionedFeeAssetId] : versionedAssets;

            const instructions = getInstructions({
              isAssetReserveChain, // TODO mjm revisit this
              assets,
              versionedFeeAssetId,
              address,
            });

            console.log('instructions', instructions);

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedFeeAssetId,
            );
          },
        }),
    }),
    fromHereAndGeneralIndex: ({
      isAssetReserveChain,
      shouldTransferAssetPrecedeFeeAsset = false, // TODO mjm remove this?
    }: XcmPaymentFeeProps): FeeConfigBuilder => ({
      build: ({ address, api, asset, feeAsset }: FeeConfigBuilderParams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedTransferAssetId =
              buildVersionedAssetIdFromPalletInstanceAndGeneralIndex(asset);
            const versionedFeeAssetId = buildVersionedAssetIdFromHere();

            console.log('versionedTransferAssetId', versionedTransferAssetId);
            console.log('versionedFeeAssetId', versionedFeeAssetId);

            const versionedAssets = shouldTransferAssetPrecedeFeeAsset
              ? [versionedTransferAssetId, versionedFeeAssetId]
              : [versionedFeeAssetId, versionedTransferAssetId];

            // TODO mjm refactor all this
            const assets =
              feeAsset === asset ? [versionedFeeAssetId] : versionedAssets;

            const instructions = getInstructions({
              isAssetReserveChain, // TODO mjm revisit this
              assets,
              versionedFeeAssetId,
              address,
            });

            console.log('instructions', instructions);

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedFeeAssetId,
            );
          },
        }),
    }),
    fromHereAndSourceGeneralIndex: ({
      isAssetReserveChain,
      shouldTransferAssetPrecedeFeeAsset = false, // TODO mjm remove this?
    }: XcmPaymentFeeProps): FeeConfigBuilder => ({
      build: ({
        address,
        api,
        asset,
        feeAsset,
        source,
      }: FeeConfigBuilderParams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedTransferAssetId =
              buildVersionedAssetIdFromSourceGeneralIndex(source, asset);
            const versionedFeeAssetId = buildVersionedAssetIdFromHere();

            console.log('versionedTransferAssetId', versionedTransferAssetId);
            console.log('versionedFeeAssetId', versionedFeeAssetId);

            const versionedAssets = shouldTransferAssetPrecedeFeeAsset
              ? [versionedTransferAssetId, versionedFeeAssetId]
              : [versionedFeeAssetId, versionedTransferAssetId];

            // TODO mjm refactor all this
            const assets =
              feeAsset === asset ? [versionedFeeAssetId] : versionedAssets;

            const instructions = getInstructions({
              isAssetReserveChain, // TODO mjm revisit this
              assets,
              versionedFeeAssetId,
              address,
            });

            console.log('instructions', instructions);

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedFeeAssetId,
            );
          },
        }),
    }),
    fromGlobalConsensus: ({
      isAssetReserveChain,
      shouldTransferAssetPrecedeFeeAsset = false, // TODO mjm remove this?
    }: XcmPaymentFeeProps): FeeConfigBuilder => ({
      build: ({ address, api, feeAsset, source }: FeeConfigBuilderParams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedFeeAssetId =
              buildVersionedAssetIdFromGlobalConsensus(feeAsset);

            console.log('versionedFeeAssetId', versionedFeeAssetId);

            // TODO mjm refactor all this
            const assets = [versionedFeeAssetId];

            const instructions = getInstructions({
              isAssetReserveChain, // TODO mjm revisit this
              assets,
              versionedFeeAssetId,
              address,
            });

            console.log('instructions', instructions);

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedFeeAssetId,
            );
          },
        }),
    }),
    fromSourceGlobalConsensus: ({
      isAssetReserveChain,
      shouldTransferAssetPrecedeFeeAsset = false, // TODO mjm remove this?
    }: XcmPaymentFeeProps): FeeConfigBuilder => ({
      build: ({ address, api, feeAsset, source }: FeeConfigBuilderParams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const sourceAsset = source.getChainAsset(feeAsset);
            const versionedFeeAssetId =
              buildVersionedAssetIdFromGlobalConsensus(sourceAsset);

            const instructions = getInstructions({
              isAssetReserveChain, // TODO mjm revisit this
              assets: [versionedFeeAssetId],
              versionedFeeAssetId,
              address,
            });

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedFeeAssetId,
            );
          },
        }),
    }),
    fromSourcePalletInstance: ({
      isAssetReserveChain,
      shouldTransferAssetPrecedeFeeAsset = false, // TODO mjm remove this?
    }: XcmPaymentFeeProps): FeeConfigBuilder => ({
      build: ({ address, api, feeAsset, source }: FeeConfigBuilderParams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedFeeAssetId =
              buildVersionedAssetIdFromSourcePalletInstance(source, feeAsset);
            console.log('versionedFeeAssetId', versionedFeeAssetId);

            const instructions = getInstructions({
              isAssetReserveChain, // TODO mjm revisit this
              assets: [versionedFeeAssetId],
              versionedFeeAssetId,
              address,
            });

            return getFeeForXcmInstructionsAndAsset(
              api,
              instructions,
              versionedFeeAssetId,
            );
          },
        }),
    }),
    fromGeneralIndex: ({
      isAssetReserveChain,
      shouldTransferAssetPrecedeFeeAsset = false, // TODO mjm remove this?
    }: XcmPaymentFeeProps): FeeConfigBuilder => ({
      build: ({ address, api, feeAsset, source }: FeeConfigBuilderParams) =>
        new SubstrateCallConfig({
          api,
          call: async (): Promise<bigint> => {
            const versionedFeeAssetId =
              buildVersionedAssetIdFromGeneralIndex(feeAsset);
            const assets = [versionedFeeAssetId];

            const instructions = getInstructions({
              isAssetReserveChain, // TODO mjm revisit this
              assets,
              versionedFeeAssetId,
              address,
            });

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

interface GetInstructionsProps {
  isAssetReserveChain: boolean;
  assets: object[];
  versionedFeeAssetId: object;
  address: string;
}

function getInstructions({
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
