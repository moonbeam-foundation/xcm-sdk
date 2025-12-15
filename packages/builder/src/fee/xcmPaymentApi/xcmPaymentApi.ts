import { SubstrateCallConfig } from '../../types/substrate/SubstrateCallConfig';
import type {
  FeeConfigBuilder,
  FeeConfigBuilderParams,
  GetVersionedAssetId,
  XcmPaymentFeeProps,
} from '../FeeBuilder.interfaces';
import { getFeeForXcmInstructionsAndAsset } from '../FeeBuilder.utils';
import {
  BuildVersionedAsset,
  QueryVersionedAsset,
} from '../VersionedAssetBuilder';
import { getInstructions, getVersionedAssets } from './xcmPaymentApi.utils';

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

    fromSourcePalletInstance: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: ({ source, feeAsset }) =>
          BuildVersionedAsset().fromSource().palletInstance(source, feeAsset),
        options,
      }),
  };

  const queryMethods = {
    fromCurrencyIdToLocations: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: async ({ feeAsset, api }) => {
          return await QueryVersionedAsset().fromCurrencyIdToLocations(
            feeAsset,
            api,
          );
        },
        options,
      }),
    fromAssetIdQuery: (options: XcmPaymentFeeProps) =>
      createXcmFeeBuilder({
        getVersionedFeeAsset: async ({ feeAsset, api }) => {
          return await QueryVersionedAsset().fromAssetId(feeAsset, api);
        },
        getVersionedTransferAsset: async ({ asset, api }) => {
          return await QueryVersionedAsset().fromAssetId(asset, api);
        },
        options,
      }),
  };

  return {
    ...localMethods,
    ...sourceMethods,
    ...queryMethods,
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
  build: (params: FeeConfigBuilderParams) => {
    return new SubstrateCallConfig({
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
          source: params.source,
          isEcosystemBridge: options.isEcosystemBridge,
        });

        return getFeeForXcmInstructionsAndAsset(
          params.api,
          instructions,
          versionedFeeAssetId,
        );
      },
    });
  },
});
