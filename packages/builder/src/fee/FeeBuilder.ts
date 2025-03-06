/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { SubstrateCallConfig } from '../types/substrate/SubstrateCallConfig';
import type {
  FeeConfigBuilder,
  FeeConfigBuilderParams,
  GetVersionedAssetId,
  XcmPaymentFeeProps,
} from './FeeBuilder.interfaces';
import {
  buildVersionedAssetId,
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
  const localMethods = {
    fromHere: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: () =>
          buildVersionedAssetId.fromHere(options.parents),
        options,
      }),

    fromHereAndGeneralIndex: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: () => buildVersionedAssetId.fromHere(),
        getVersionedTransferAsset: ({ asset }) =>
          buildVersionedAssetId.fromPalletInstanceAndGeneralIndex(asset),
        options,
      }),

    fromHereAndSourceGeneralIndex: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: () => buildVersionedAssetId.fromHere(),
        getVersionedTransferAsset: ({ source, asset }) =>
          buildVersionedAssetId.fromSource.palletInstanceAndGeneralIndex(
            source,
            asset,
          ),
        options,
      }),

    fromGeneralIndex: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ feeAsset }) =>
          buildVersionedAssetId.fromGeneralIndex(feeAsset),
        options,
      }),

    fromPalletInstanceAndAccountKey20: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ feeAsset }) =>
          buildVersionedAssetId.fromPalletInstance(feeAsset),
        getVersionedTransferAsset: ({ asset }) =>
          buildVersionedAssetId.fromAccountKey20(asset),
        options,
      }),

    fromGlobalConsensus: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ feeAsset }) =>
          buildVersionedAssetId.fromGlobalConsensus(feeAsset),
        options,
      }),
  };

  const sourceMethods = {
    fromSourceAccountKey20: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ source, asset }) =>
          buildVersionedAssetId.fromSource.accountKey20(source, asset),
        options,
      }),

    fromSourceGeneralIndex: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ source, feeAsset }) =>
          buildVersionedAssetId.fromSource.generalIndex(source, feeAsset),
        options,
      }),

    fromSourcePalletInstance: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ source, feeAsset }) =>
          buildVersionedAssetId.fromSource.palletInstance(source, feeAsset),
        options,
      }),

    fromSourceGlobalConsensus: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ source, feeAsset }) => {
          const sourceAsset = source.getChainAsset(feeAsset);
          return buildVersionedAssetId.fromGlobalConsensus(sourceAsset);
        },
        options,
      }),
  };

  const legacyMethods = {
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
  };

  return {
    ...localMethods,
    ...sourceMethods,
    ...legacyMethods,
  };
}

interface CreateXcmFeeBuilderProps {
  getVersionedFeeAsset: GetVersionedAssetId;
  getVersionedTransferAsset?: GetVersionedAssetId;
  options: XcmPaymentFeeProps;
}

const createXcmFeeBuilder = ({
  getVersionedFeeAsset,
  getVersionedTransferAsset,
  options,
}: CreateXcmFeeBuilderProps): FeeConfigBuilder => ({
  build: (params: FeeConfigBuilderParams) =>
    new SubstrateCallConfig({
      api: params.api,
      call: async (): Promise<bigint> => {
        console.log('params', params);
        console.log('options', options);
        const versionedFeeAssetId = await getVersionedFeeAsset(params);
        console.log('versionedFeeAssetId', versionedFeeAssetId);

        let assets;
        if (getVersionedTransferAsset) {
          const versionedTransferAssetId =
            await getVersionedTransferAsset(params);
          assets =
            params.feeAsset === params.asset
              ? [versionedFeeAssetId]
              : options.shouldTransferAssetPrecedeFeeAsset
                ? [versionedTransferAssetId, versionedFeeAssetId]
                : [versionedFeeAssetId, versionedTransferAssetId];
        } else {
          assets = [versionedFeeAssetId];
        }

        const instructions = getInstructions({
          isAssetReserveChain: options.isAssetReserveChain,
          assets,
          versionedFeeAssetId,
          address: params.address,
        });

        console.log('instructions', instructions);

        return getFeeForXcmInstructionsAndAsset(
          params.api,
          instructions,
          versionedFeeAssetId,
        );
      },
    }),
});

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
