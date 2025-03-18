import { SubstrateCallConfig } from '../../types/substrate/SubstrateCallConfig';
import type {
  FeeConfigBuilder,
  FeeConfigBuilderParams,
  GetVersionedAssetId,
  XcmPaymentFeeProps,
} from '../FeeBuilder.interfaces';
import {
  getBuyExecutionInstruction,
  getClearOriginInstruction,
  getDepositAssetInstruction,
  getFeeForXcmInstructionsAndAsset,
  getReserveAssetDepositedInstruction,
  getSetTopicInstruction,
  getVersionedAssetId,
  getWithdrawAssetInstruction,
} from '../FeeBuilder.utils';
import {
  BuildVersionedAsset,
  QueryVersionedAsset,
} from '../VersionedAssetBuilder';
import { getInstructions } from './xcmPaymentApi.utils';
import { getVersionedAssets } from './xcmPaymentApi.utils';

export function xcmPaymentApi() {
  const localMethods = {
    fromHere: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: () =>
          BuildVersionedAsset().fromHere(options.parents),
        options,
      }),

    fromHereAndGeneralIndex: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: () => BuildVersionedAsset().fromHere(),
        getVersionedTransferAsset: ({ asset }) =>
          BuildVersionedAsset().fromPalletInstanceAndGeneralIndex(asset),
        options,
      }),

    fromPalletInstanceAndGeneralIndex: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ feeAsset }) =>
          BuildVersionedAsset().fromPalletInstanceAndGeneralIndex(feeAsset),
        options,
      }),

    fromHereAndSourceGeneralIndex: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: () => BuildVersionedAsset().fromHere(),
        getVersionedTransferAsset: ({ source, asset }) =>
          BuildVersionedAsset()
            .fromSource()
            .palletInstanceAndGeneralIndex(source, asset),
        options,
      }),

    fromGeneralIndex: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ feeAsset }) =>
          BuildVersionedAsset().fromGeneralIndex(feeAsset),
        options,
      }),

    fromPalletInstance: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ feeAsset }) =>
          BuildVersionedAsset().fromPalletInstance(feeAsset),
        options,
      }),

    fromPalletInstanceAndAccountKey20: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ feeAsset }) =>
          BuildVersionedAsset().fromPalletInstance(feeAsset),
        getVersionedTransferAsset: ({ asset }) =>
          BuildVersionedAsset().fromAccountKey20(asset),
        options,
      }),

    fromGlobalConsensus: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ feeAsset }) =>
          BuildVersionedAsset().fromGlobalConsensus(feeAsset),
        options,
      }),
  };

  const queryMethods = {
    fromCurrencyIdToLocations: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: async ({ source, feeAsset, api }) => {
          return await QueryVersionedAsset().fromCurrencyIdToLocations(
            feeAsset,
            api,
          );
        },
        options,
      }),
  };

  const sourceMethods = {
    fromSourceAccountKey20: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ source, asset }) =>
          BuildVersionedAsset().fromSource().accountKey20(source, asset),
        options,
      }),

    fromSourceGeneralIndex: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ source, feeAsset }) =>
          BuildVersionedAsset().fromSource().generalIndex(source, feeAsset),
        options,
      }),

    fromSourcePalletInstance: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ source, feeAsset }) =>
          BuildVersionedAsset().fromSource().palletInstance(source, feeAsset),
        options,
      }),

    fromSourceGlobalConsensus: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ source, feeAsset }) => {
          const sourceAsset = source.getChainAsset(feeAsset);
          return BuildVersionedAsset().fromGlobalConsensus(sourceAsset);
        },
        options,
      }),
  };

  const legacyMethods = {
    // TODO deprecate this after applying to asset migration
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

  return {
    ...localMethods,
    ...sourceMethods,
    ...queryMethods,
    ...legacyMethods,
  };
}

export interface CreateXcmFeeBuilderProps {
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
        const [assets, versionedFeeAssetId] = await getVersionedAssets({
          getVersionedFeeAsset,
          getVersionedTransferAsset,
          options,
          params,
        });

        const instructions = getInstructions({
          isAssetReserveChain: options.isAssetReserveChain,
          assets,
          versionedFeeAssetId,
          address: params.address,
        });

        return getFeeForXcmInstructionsAndAsset(
          params.api,
          instructions,
          versionedFeeAssetId,
        );
      },
    }),
});
