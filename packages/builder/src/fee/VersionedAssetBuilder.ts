import type { AnyChain } from '@moonbeam-network/xcm-types';
import type { ChainAsset } from '@moonbeam-network/xcm-types';
import { Parachain } from '@moonbeam-network/xcm-types';

export const buildVersionedAssetId = {
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
    validatePalletInstance(asset);

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
    validatePalletInstance(asset);

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

  fromSource: {
    accountKey20: (source: AnyChain, asset: ChainAsset) => {
      if (!(source instanceof Parachain)) {
        throw new Error(
          'Source must be a Parachain to build versioned asset id',
        ); // TODO mjm improve message
      }

      const sourceAsset = source.getChainAsset(asset);

      validatePalletInstance(sourceAsset);

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

    generalIndex: (source: AnyChain, asset: ChainAsset): object => {
      if (!(source instanceof Parachain)) {
        throw new Error(
          'Source must be a Parachain to build versioned asset id',
        ); // TODO mjm improve message
      }

      const sourceAsset = source.getChainAsset(asset);

      return {
        interior: {
          X2: [
            { Parachain: source.parachainId },
            { GeneralIndex: sourceAsset.getAssetId() },
          ],
        },
        parents: 1,
      };
    },

    palletInstance: (source: AnyChain, asset: ChainAsset): object => {
      if (!(source instanceof Parachain)) {
        throw new Error(
          'Source must be a Parachain to build versioned asset id',
        ); // TODO mjm improve message
      }

      const sourceAsset = source.getChainAsset(asset);

      validatePalletInstance(sourceAsset);

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
          'Chain must be a Parachain to build versioned asset id',
        ); // TODO mjm improve message
      }

      const sourceAsset = source.getChainAsset(asset);

      validatePalletInstance(sourceAsset);

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
  },
};

const validatePalletInstance = (asset: ChainAsset) => {
  if (!asset.getAssetPalletInstance()) {
    throw new Error(
      'No pallet instance configured for the asset for XcmPaymentApi fee calculation',
    );
  }
};
