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
import { BuildVersionedAsset } from '../VersionedAssetBuilder';
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
        console.log('params', params);
        console.log('options', options);

        const [assets, versionedFeeAssetId] = await getVersionedAssets({
          getVersionedFeeAsset,
          getVersionedTransferAsset,
          options,
          params,
        });
        console.log('versionedFeeAssetId', versionedFeeAssetId);

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
