import { ChainAssetId } from '@moonbeam-network/xcm-types';
import { ApiPromise } from '@polkadot/api';
import { Option, Result, u128 } from '@polkadot/types';
import { Error as PolkadotError, Weight } from '@polkadot/types/interfaces';
import { AnyJson } from '@polkadot/types/types';
import { XcmVersion } from '../extrinsic';
import { MoonbeamRuntimeXcmConfigAssetType } from './FeeBuilder.interfaces';

// TODO mjm find another solution with the asset decimal?
const DEFAULT_AMOUNT = 10 ** 6;

const moonChainNativeAssetId = '0x0000000000000000000000000000000000000802';

const XCM_VERSION: XcmVersion = XcmVersion.v4; // TODO

function isXcmV4() {
  return XCM_VERSION === XcmVersion.v4;
}
export function getWithdrawAssetInstruction(assetTypes: object[]) {
  return {
    WithdrawAsset: assetTypes.map((assetType) => ({
      fun: {
        Fungible: DEFAULT_AMOUNT,
      },
      id: { ...assetType },
    })),
  };
}

export function getReserveAssetDepositedInstruction(assetTypes: object[]) {
  return {
    ReserveAssetDeposited: assetTypes.map((assetType) => ({
      fun: {
        Fungible: DEFAULT_AMOUNT,
      },
      id: { ...assetType },
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
        fun: {
          Fungible: DEFAULT_AMOUNT,
        },
        id: {
          ...assetType,
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
        max_assets: 0,
        parents: 0,
      },
    },
  };
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

function applyConcreteWrapper(id: object) {
  return {
    Concrete: { ...id },
  };
}

// TODO this is for Moonbeam
function getNativeAssetId(): object {
  const palletInstance = {
    PalletInstance: '10',
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

function getConcreteAssetIdWithAccountKey20(asset: ChainAssetId): object {
  const id = {
    interior: {
      X2: [
        {
          PalletInstance: '110',
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

export async function getVersionedAssetId(
  api: ApiPromise,
  asset: ChainAssetId,
): Promise<object> {
  if (asset === moonChainNativeAssetId) {
    return getNativeAssetId();
  }

  if (isHexString(asset)) {
    return getConcreteAssetIdWithAccountKey20(asset);
  }

  const assetType = await getAssetIdType(api, asset);
  const assetTypeObject = assetType.unwrap().asXcm.toJSON();

  return isXcmV4() ? assetTypeObject : applyConcreteWrapper(assetTypeObject);
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
  console.log('xcmToWeightResult', xcmToWeightResult.toHuman());
  if (!xcmToWeightResult.isOk) {
    throw new Error(
      'There was an error trying to get the weight for the xcm instructions (queryXcmWeight)',
    );
  }
  const xcmToWeight = xcmToWeightResult.asOk;
  console.log('versionedAssetId', versionedAssetId);

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
  console.log('weightToForeingAssets', weightToForeingAssets.toHuman());
  return weightToForeingAssets.asOk.toBigInt();
}
