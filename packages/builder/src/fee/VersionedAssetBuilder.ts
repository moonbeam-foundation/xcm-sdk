import type { AnyChain } from '@moonbeam-network/xcm-types';
import type { ChainAsset } from '@moonbeam-network/xcm-types';
import { Parachain } from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { Option } from '@polkadot/types';
import type { StagingXcmV4Location } from '@polkadot/types/lookup';
import { normalizeX1 } from '../extrinsic/ExtrinsicBuilder.utils';
import type { MoonbeamRuntimeXcmConfigAssetType } from './FeeBuilder.interfaces';
import { STABLE_XCM_VERSION } from './FeeBuilder.utils';

export function BuildVersionedAsset() {
  return {
    fromHere: (parents = 1) => ({
      parents,
      interior: 'Here',
    }),

    fromAccountKey20: (asset: ChainAsset): object => ({
      interior: {
        X2: [
          {
            PalletInstance: asset.getAssetPalletInstance(),
          },
          {
            AccountKey20: {
              key: asset.address,
              network: null,
            },
          },
        ],
      },
      parents: '0',
    }),

    fromGeneralIndex: (asset: ChainAsset): object => ({
      interior: {
        X1: [{ GeneralIndex: asset.getAssetId() }],
      },
      parents: '0',
    }),

    fromGlobalConsensus: (asset: ChainAsset): object => ({
      interior: {
        X2: [
          { GlobalConsensus: { Ethereum: { chainId: 1 } } },
          { AccountKey20: { key: asset.address, network: null } },
        ],
      },
      parents: 2,
    }),

    fromPalletInstance: (asset: ChainAsset): object => {
      return {
        interior: {
          X1: [
            {
              PalletInstance: asset.getAssetPalletInstance(),
            },
          ],
        },
        parents: '0',
      };
    },

    fromPalletInstanceAndGeneralIndex: (asset: ChainAsset): object => {
      return {
        interior: {
          X2: [
            {
              PalletInstance: asset.getAssetPalletInstance(),
            },
            { GeneralIndex: asset.getAssetId() },
          ],
        },
        parents: '0',
      };
    },

    fromSource: () => ({
      accountKey20: (source: AnyChain, asset: ChainAsset) => {
        if (!(source instanceof Parachain)) {
          throw new Error(
            `Chain ${source.name} must be a Parachain to build versioned asset id for XcmPaymentApi fee calculation`,
          );
        }

        const sourceAsset = source.getChainAsset(asset);

        return {
          interior: {
            X3: [
              { Parachain: source.parachainId },
              { PalletInstance: sourceAsset.getAssetPalletInstance() },
              { AccountKey20: { key: sourceAsset.address, network: null } },
            ],
          },
          parents: 1,
        };
      },

      palletInstance: (source: AnyChain, asset: ChainAsset): object => {
        if (!(source instanceof Parachain)) {
          throw new Error(
            `Chain ${source.name} must be a Parachain to build versioned asset id for XcmPaymentApi fee calculation`,
          );
        }

        const sourceAsset = source.getChainAsset(asset);

        return {
          interior: {
            X2: [
              { Parachain: source.parachainId },
              {
                PalletInstance: sourceAsset.getAssetPalletInstance(),
              },
            ],
          },
          parents: 1,
        };
      },

      palletInstanceAndGeneralIndex: (
        source: AnyChain,
        asset: ChainAsset,
      ): object => {
        if (!(source instanceof Parachain)) {
          throw new Error(
            `Chain ${source.name} must be a Parachain to build versioned asset id for XcmPaymentApi fee calculation`,
          );
        }

        const sourceAsset = source.getChainAsset(asset);

        return {
          interior: {
            X3: [
              { Parachain: source.parachainId },
              { PalletInstance: sourceAsset.getAssetPalletInstance() },
              { GeneralIndex: sourceAsset.getAssetId() },
            ],
          },
          parents: 1,
        };
      },
    }),
  };
}

export function QueryVersionedAsset() {
  return {
    fromCurrencyIdToLocations: async (asset: ChainAsset, api: ApiPromise) => {
      const result = await api.query.assetRegistry.currencyIdToLocations(
        asset.getAssetRegisteredId(),
      );

      if (!result || result.isEmpty) {
        throw new Error(`No location found for asset ${asset.getSymbol()}`);
      }

      return result.toJSON() as object;
    },
    fromAssetId: async (asset: ChainAsset, api: ApiPromise) => {
      if (!asset.getAssetRegisteredId()) {
        throw new Error(
          `No asset registered id found for asset ${asset.getSymbol()}`,
        );
      }

      const assetManagerResult = await api.query.assetManager.assetIdType<
        Option<MoonbeamRuntimeXcmConfigAssetType>
      >(asset.getAssetRegisteredId());

      if (
        assetManagerResult.isNone ||
        assetManagerResult.isEmpty ||
        !assetManagerResult.unwrap().isXcm
      ) {
        const evmForeignAssetsResult =
          await api.query.evmForeignAssets.assetsById<
            Option<StagingXcmV4Location>
          >(asset.getAssetRegisteredId());

        if (
          !evmForeignAssetsResult ||
          evmForeignAssetsResult.isEmpty ||
          evmForeignAssetsResult.isNone
        ) {
          throw new Error(`No asset type found for asset ${asset.getSymbol()}`);
        }

        return evmForeignAssetsResult.unwrapOrDefault().toJSON() as object;
      }

      return normalizeX1(
        STABLE_XCM_VERSION,
        assetManagerResult.unwrapOrDefault().asXcm.toJSON(),
      ) as object;
    },
  };
}
