import type {
  AnyParachain,
  ChainAsset,
  ChainAssetId,
} from '@moonbeam-network/xcm-types';
import { isEthAddress } from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import type { Option, Result, u128 } from '@polkadot/types';
import type {
  Error as PolkadotError,
  Weight,
} from '@polkadot/types/interfaces';
import type { AnyJson } from '@polkadot/types/types';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { XcmVersion } from '../extrinsic';
import {
  normalizeConcrete,
  normalizeX1,
} from '../extrinsic/ExtrinsicBuilder.utils';
import type { MoonbeamRuntimeXcmConfigAssetType } from './FeeBuilder.interfaces';

const DEFAULT_AMOUNT = 10 ** 6;
const DEFAULT_HEX_STRING =
  '0xabcdef1234567890fedcba0987654321abcdef1234567890fedcba0987654321';

export const STABLE_XCM_VERSION: XcmVersion = XcmVersion.v4; // TODO: make this dynamic

function isXcmV4() {
  return STABLE_XCM_VERSION === XcmVersion.v4;
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
    [isEthAddress(address) ? 'AccountKey20' : 'AccountId32']: {
      key: isEthAddress(address) ? address : u8aToHex(decodeAddress(address)),
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
  return normalizeConcrete(STABLE_XCM_VERSION, id);
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
  return normalizeConcrete(STABLE_XCM_VERSION, id);
}

export async function getAssetIdType(
  api: ApiPromise,
  asset: ChainAssetId,
): Promise<Option<MoonbeamRuntimeXcmConfigAssetType>> {
  const type =
    await api.query.assetManager.assetIdType<
      Option<MoonbeamRuntimeXcmConfigAssetType>
    >(asset);

  // TODO: check if this can be used
  // const type =
  //   await api.query.evmForeignAssets.assetsById<
  //     Option<MoonbeamRuntimeXcmConfigAssetType>
  //   >(asset);

  if (type.isNone || !type.unwrap().isXcm) {
    throw new Error(`No asset type found for asset ${asset}`);
  }
  return type;
}

// TODO deprecate this after applying to asset migration
export async function getVersionedAssetId(
  api: ApiPromise,
  asset: ChainAsset,
  chain: AnyParachain,
): Promise<object> {
  const assetId = asset.getAssetId();
  const palletInstance = asset.getAssetPalletInstance();

  if (assetId === chain.nativeAsset.originSymbol) {
    return getNativeAssetId(palletInstance);
  }

  if (asset.hasOnlyAddress()) {
    return getConcreteAssetIdWithAccountKey20(asset.address, palletInstance);
  }

  const assetType = await getAssetIdType(api, assetId);
  const assetTypeObject = assetType.unwrap().asXcm.toJSON();
  const normalizedAssetTypeObject = normalizeX1(
    STABLE_XCM_VERSION,
    assetTypeObject,
  );

  return normalizeConcrete(STABLE_XCM_VERSION, normalizedAssetTypeObject);
}

export async function getFeeForXcmInstructionsAndAsset(
  api: ApiPromise,
  instructions: AnyJson,
  versionedAssetId: object,
) {
  const xcmToWeightResult = await api.call.xcmPaymentApi.queryXcmWeight<
    Result<Weight, PolkadotError>
  >({
    [STABLE_XCM_VERSION]: instructions,
  });
  if (!xcmToWeightResult.isOk) {
    throw new Error(
      'There was an error trying to get the weight for the xcm instructions (queryXcmWeight)',
    );
  }
  const xcmToWeight = xcmToWeightResult.asOk;
  console.log('xcmToWeight', xcmToWeight);

  const weightToForeignAssets =
    await api.call.xcmPaymentApi.queryWeightToAssetFee<
      Result<u128, PolkadotError>
    >(xcmToWeight, {
      [STABLE_XCM_VERSION]: {
        ...versionedAssetId,
      },
    });

  if (!weightToForeignAssets.isOk) {
    throw new Error(
      'There was an error trying to get the fee with the weight and asset (weightToForeignAssets). Check if the asset is supported for XcmPaymentApi.',
    );
  }
  return weightToForeignAssets.asOk.toBigInt();
}
