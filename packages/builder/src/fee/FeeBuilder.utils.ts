import {
  type AnyChain,
  type AnyParachain,
  type ChainAsset,
  type ChainAssetId,
  Parachain,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import type { Option, Result, u128 } from '@polkadot/types';
import type {
  Error as PolkadotError,
  Weight,
} from '@polkadot/types/interfaces';
import type { AnyJson } from '@polkadot/types/types';
import { XcmVersion } from '../extrinsic';
import {
  normalizeConcrete,
  normalizeX1,
} from '../extrinsic/ExtrinsicBuilder.utils';
import type { MoonbeamRuntimeXcmConfigAssetType } from './FeeBuilder.interfaces';

const DEFAULT_AMOUNT = 10 ** 6;
const DEFAULT_HEX_STRING =
  '0xabcdef1234567890fedcba0987654321abcdef1234567890fedcba0987654321';

const XCM_VERSION: XcmVersion = XcmVersion.v4; // TODO

function isXcmV4() {
  return XCM_VERSION === XcmVersion.v4;
}

export function getWithdrawAssetInstruction(assetTypes: object[]) {
  return {
    WithdrawAsset: assetTypes.map((assetType) => ({
      id: { ...assetType },
      fun: {
        Fungible: DEFAULT_AMOUNT,
      },
    })),
  };
}

export function getReserveAssetDepositedInstruction(assetTypes: object[]) {
  return {
    ReserveAssetDeposited: assetTypes.map((assetType) => ({
      id: { ...assetType },
      fun: {
        Fungible: DEFAULT_AMOUNT,
      },
    })),
  };
}

export function getClearOriginInstruction() {
  return {
    ClearOrigin: 'NULL',
  };
}

export function getBuyExecutionInstruction(assetType: object) {
  // TODO should verify that asset is in acceptable payment assets
  // api.call.xcmPaymentApi.queryAcceptablePaymentAssets(xcmVersion)
  return {
    BuyExecution: {
      fees: {
        id: {
          ...assetType,
        },
        fun: {
          Fungible: DEFAULT_AMOUNT,
        },
      },
      weight_limit: {
        Unlimited: 'NULL',
      },
    },
  };
}

export function getDepositAssetInstruction(address: string, assets: object[]) {
  const accountKey = {
    // TODO mjm get AccountId32 or AccountKey20 dynamically
    AccountId32: {
      key: 0x5a071f642798f89d68b050384132eea7b65db483b00dbb05548d3ce472cfef48,
      network: null,
    },
  };

  return {
    DepositAsset: {
      assets: {
        Wild: {
          AllCounted: assets.length,
        },
      },
      beneficiary: {
        interior: {
          X1: isXcmV4() ? [accountKey] : accountKey,
        },
        parents: 0,
      },
      max_assets: 0,
    },
  };
}

export function getSetTopicInstruction() {
  return {
    SetTopic: DEFAULT_HEX_STRING,
  };
}

// TODO this is for Moonbeam, when applying to all we have to
// configure the multilocation of the native asset in the chain
function getNativeAssetId(palletInstanceNumber: number | undefined): object {
  if (!palletInstanceNumber) {
    throw new Error(
      'No pallet instance configured for the native asset for XcmPaymentApi fee calculation',
    );
  }

  const palletInstance = {
    PalletInstance: palletInstanceNumber,
  };
  const id = {
    interior: {
      X1: isXcmV4() ? [palletInstance] : palletInstance,
    },
    parents: '0',
  };
  return normalizeConcrete(XCM_VERSION, id);
}

function getConcreteAssetIdWithAccountKey20(
  asset: ChainAssetId,
  palletInstance: number | undefined,
): object {
  if (!palletInstance) {
    throw new Error(
      `No pallet instance configured for the asset ${asset} for XcmPaymentApi fee calculation`,
    );
  }

  const id = {
    interior: {
      X2: [
        {
          PalletInstance: palletInstance,
        },
        {
          AccountKey20: {
            key: asset,
            network: null,
          },
        },
      ],
    },
    parents: '0',
  };
  return normalizeConcrete(XCM_VERSION, id);
}

export async function getAssetIdType(
  api: ApiPromise,
  asset: ChainAssetId,
): Promise<Option<MoonbeamRuntimeXcmConfigAssetType>> {
  const type =
    await api.query.assetManager.assetIdType<
      Option<MoonbeamRuntimeXcmConfigAssetType>
    >(asset);

  if (type.isNone || !type.unwrap().isXcm) {
    throw new Error(`No asset type found for asset ${asset}`);
  }
  return type;
}

// TODO mjm deprecate this
export async function getVersionedAssetId(
  api: ApiPromise,
  asset: ChainAsset,
  chain: AnyParachain,
): Promise<object> {
  if (asset.key === 'dot' && chain.key === 'polkadot') {
    return { parents: 0, interior: 'Here' };
  }
  if (asset.key === 'dot' && chain.key === 'polkadot-asset-hub') {
    return { parents: 1, interior: 'Here' };
  }

  if (asset.key === 'astr' && chain.key === 'astar') {
    return { parents: 0, interior: 'Here' };
  }

  if (asset.key === 'hdx' && chain.key === 'hydration') {
    return {
      parents: 0,
      interior: { X1: [{ GeneralIndex: 0 }] },
    };
  }

  if (
    asset.key === 'glmr' &&
    (chain.key === 'astar' || chain.key === 'hydration')
  ) {
    return {
      parents: 1,
      interior: {
        X2: [{ Parachain: 2004 }, { PalletInstance: 10 }],
      },
    };
  }

  if (asset.key === 'usdcwh' && chain.key === 'hydration') {
    console.log('asset post', asset.key, asset.address);
    return {
      parents: 1,
      interior: {
        X3: [
          { Parachain: 2004 },
          { PalletInstance: 110 },
          { AccountKey20: { key: asset.address, network: null } },
        ],
      },
    };
  }

  const assetId = asset.getAssetId();
  const palletInstance = asset.getAssetPalletInstance();

  if (assetId === chain.nativeAsset.originSymbol) {
    return getNativeAssetId(palletInstance);
  }
  console.log('asset', asset);

  if (asset.hasOnlyAddress()) {
    return getConcreteAssetIdWithAccountKey20(asset.address, palletInstance);
  }

  const assetType = await getAssetIdType(api, assetId);
  const assetTypeObject = assetType.unwrap().asXcm.toJSON();
  const normalizedAssetTypeObject = normalizeX1(XCM_VERSION, assetTypeObject);

  return normalizeConcrete(XCM_VERSION, normalizedAssetTypeObject);
}

export async function getFeeForXcmInstructionsAndAsset(
  api: ApiPromise,
  instructions: AnyJson,
  versionedAssetId: object,
) {
  const xcmToWeightResult = await api.call.xcmPaymentApi.queryXcmWeight<
    Result<Weight, PolkadotError>
  >({
    [XCM_VERSION]: instructions,
  });
  if (!xcmToWeightResult.isOk) {
    throw new Error(
      'There was an error trying to get the weight for the xcm instructions (queryXcmWeight)',
    );
  }
  const xcmToWeight = xcmToWeightResult.asOk;
  console.log('xcmToWeight', xcmToWeight.toHuman());

  const weightToForeignAssets =
    await api.call.xcmPaymentApi.queryWeightToAssetFee<
      Result<u128, PolkadotError>
    >(xcmToWeight, {
      [XCM_VERSION]: {
        ...versionedAssetId,
      },
    });
  console.log('weightToForeignAssets', weightToForeignAssets.toHuman());
  if (!weightToForeignAssets.isOk) {
    throw new Error(
      'There was an error trying to get the fee with the weight and asset (weightToForeignAssets)',
    );
  }
  return weightToForeignAssets.asOk.toBigInt();
}

export function buildVersionedAssetIdFromHere(parents = 1) {
  return {
    parents,
    interior: 'Here',
  };
}

export function buildVersionedAssetIdFromSourceAccountKey20(
  source: AnyChain,
  asset: ChainAsset,
) {
  if (!(source instanceof Parachain)) {
    throw new Error('Source must be a Parachain to build versioned asset id'); // TODO mjm improve message
  }

  const sourceAsset = source.getChainAsset(asset);

  if (!sourceAsset.getAssetPalletInstance()) {
    // TODO mjm not have the same message repeated over and over?
    throw new Error(
      'No pallet instance configured for the asset for XcmPaymentApi fee calculation',
    );
  }

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
}

export function buildVersionedAssetIdFromPalletInstance(
  asset: ChainAsset,
): object {
  if (!asset.getAssetPalletInstance()) {
    throw new Error(
      'No pallet instance configured for the asset for XcmPaymentApi fee calculation',
    );
  }

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
}

export function buildVersionedAssetIdFromSourcePalletInstance(
  source: AnyChain,
  asset: ChainAsset,
): object {
  if (!(source instanceof Parachain)) {
    throw new Error('Source must be a Parachain to build versioned asset id'); // TODO mjm improve message
  }

  const sourceAsset = source.getChainAsset(asset);

  if (!sourceAsset.getAssetPalletInstance()) {
    throw new Error(
      'No pallet instance configured for the asset for XcmPaymentApi fee calculation',
    );
  }

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
}

export function buildVersionedAssetIdFromAccountKey20(
  asset: ChainAsset,
): object {
  return {
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
  };

  // TODO mjm verify for all these that the versioned asset id exists in the query
}

export function buildVersionedAssetIdFromGeneralIndex(
  asset: ChainAsset,
): object {
  return {
    interior: {
      X1: [{ GeneralIndex: asset.getAssetId() }],
    },
    parents: '0',
  };
}

export function buildVersionedAssetIdFromSourceGeneralIndex(
  source: AnyChain,
  asset: ChainAsset,
): object {
  if (!(source instanceof Parachain)) {
    throw new Error('Source must be a Parachain to build versioned asset id'); // TODO mjm improve message
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
}

export function buildVersionedAssetIdFromPalletInstanceAndGeneralIndex(
  asset: ChainAsset,
): object {
  if (!asset.getAssetPalletInstance()) {
    throw new Error(
      'No pallet instance configured for the asset for XcmPaymentApi fee calculation',
    );
  }

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
}

export function buildVersionedAssetIdFromSourcePalletInstanceAndGeneralIndex(
  source: AnyChain,
  asset: ChainAsset,
): object {
  if (!(source instanceof Parachain)) {
    throw new Error('Chain must be a Parachain to build versioned asset id'); // TODO mjm improve message
  }

  const sourceAsset = source.getChainAsset(asset);

  if (!sourceAsset.getAssetPalletInstance()) {
    throw new Error(
      'No pallet instance configured for the asset for XcmPaymentApi fee calculation',
    );
  }

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
}

export function buildVersionedAssetIdFromGlobalConsensus(
  asset: ChainAsset,
): object {
  return {
    interior: {
      X2: [
        { GlobalConsensus: { Ethereum: { chainId: 1 } } },
        { AccountKey20: { key: asset.address, network: null } },
      ],
    },
    parents: 2,
  };
}
