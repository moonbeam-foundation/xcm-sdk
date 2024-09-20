/* eslint-disable sort-keys */
import { AnyParachain, ChainAssetId } from '@moonbeam-network/xcm-types';
import { ApiPromise } from '@polkadot/api';
import { Option, Result, u128 } from '@polkadot/types';
import { Error as PolkadotError, Weight } from '@polkadot/types/interfaces';
import { AnyJson } from '@polkadot/types/types';
import { XcmVersion } from '../extrinsic';
import { MoonbeamRuntimeXcmConfigAssetType } from './FeeBuilder.interfaces';

const DEFAULT_AMOUNT = 10 ** 6;
const DEFALUT_HEX_STRING =
  '0xabcdef1234567890fedcba0987654321abcdef1234567890fedcba0987654321';

const moonChainNativeAssetId = '0x0000000000000000000000000000000000000802';

const moonChainBalancesPalletInstance: Record<string, string> = {
  moonbeam: '10',
  moonriver: '10',
  'moonbase-alpha': '3',
};
const moonChainERC20PalletPalletInstance: Record<string, string> = {
  moonbeam: '110',
  moonriver: '110',
  'moonbase-alpha': '48',
};

const XCM_VERSION: XcmVersion = XcmVersion.v4; // TODO

function isXcmV4() {
  return XCM_VERSION === XcmVersion.v4;
}

function normalizeX1(assetType: Record<string, AnyJson>) {
  if (!isXcmV4) {
    return assetType;
  }
  const normalizedAssetType = { ...assetType };
  if (
    normalizedAssetType.interior &&
    typeof normalizedAssetType.interior === 'object' &&
    'x1' in normalizedAssetType.interior
  ) {
    if (!Array.isArray(normalizedAssetType.interior.x1)) {
      normalizedAssetType.interior.x1 = [normalizedAssetType.interior.x1];
    }
  }
  return normalizedAssetType;
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
    AccountKey20: {
      key: address,
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
    SetTopic: DEFALUT_HEX_STRING,
  };
}

function applyConcreteWrapper(id: object) {
  return {
    Concrete: { ...id },
  };
}

// TODO this is for Moonbeam
function getNativeAssetId(chainKey: string): object {
  const palletInstance = {
    PalletInstance: moonChainBalancesPalletInstance[chainKey],
  };
  const id = {
    interior: {
      X1: isXcmV4() ? [palletInstance] : palletInstance,
    },
    parents: '0',
  };

  return isXcmV4() ? id : applyConcreteWrapper(id);
}

function isHexString(asset: ChainAssetId): boolean {
  return typeof asset === 'string' && asset.startsWith('0x');
}

function getConcreteAssetIdWithAccountKey20(
  asset: ChainAssetId,
  chainKey: string,
): object {
  const id = {
    interior: {
      X2: [
        {
          PalletInstance: moonChainERC20PalletPalletInstance[chainKey],
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
  return isXcmV4() ? id : applyConcreteWrapper(id);
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

export async function getVersionedAssetId(
  api: ApiPromise,
  asset: ChainAssetId,
  chain: AnyParachain,
): Promise<object> {
  if (asset === moonChainNativeAssetId) {
    return getNativeAssetId(chain.key);
  }

  if (isHexString(asset)) {
    return getConcreteAssetIdWithAccountKey20(asset, chain.key);
  }

  const assetType = await getAssetIdType(api, asset);
  const assetTypeObject = assetType.unwrap().asXcm.toJSON();

  const normalizedAssetTypeObject = normalizeX1(assetTypeObject);

  return isXcmV4()
    ? normalizedAssetTypeObject
    : applyConcreteWrapper(normalizedAssetTypeObject);
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

  const weightToForeingAssets =
    await api.call.xcmPaymentApi.queryWeightToAssetFee<
      Result<u128, PolkadotError>
    >(xcmToWeight, {
      [XCM_VERSION]: {
        ...versionedAssetId,
      },
    });
  if (!weightToForeingAssets.isOk) {
    throw new Error(
      'There was an error trying to get the fee with the weight and asset (weightToForeingAssets)',
    );
  }
  return weightToForeingAssets.asOk.toBigInt();
}
