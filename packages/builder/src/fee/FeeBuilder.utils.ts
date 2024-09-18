import { ChainAssetId } from '@moonbeam-network/xcm-types';
import { ApiPromise } from '@polkadot/api';
import { Option, Result, u128 } from '@polkadot/types';
import { Error as PolkadotError, Weight } from '@polkadot/types/interfaces';
import { AnyJson } from '@polkadot/types/types';
import { MoonbeamRuntimeXcmConfigAssetType } from './FeeBuilder.interfaces';

// TODO mjm find another solution with the asset decimal?
const DEFAULT_AMOUNT = 10 ** 6;

const moonChainNativeAssetId = '0x0000000000000000000000000000000000000802';

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
  return {
    DepositAsset: {
      assets: {
        Wild: {
          AllCounted: assets.length,
        },
      },
      beneficiary: {
        interior: {
          X1: {
            AccountKey20: {
              key: address,
              network: null,
            },
          },
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

function getConcreteAssetId(): object {
  return {
    Concrete: {
      interior: {
        X1: {
          PalletInstance: '10',
        },
      },
      parents: '0',
    },
  };
}

function isHexString(asset: ChainAssetId): boolean {
  return typeof asset === 'string' && asset.startsWith('0x');
}

function getConcreteAssetIdWithAccountKey20(asset: ChainAssetId): object {
  return {
    Concrete: {
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
    },
  };
}

export async function getVersionedAssetId(
  api: ApiPromise,
  asset: ChainAssetId,
): Promise<object> {
  if (asset === moonChainNativeAssetId) {
    return getConcreteAssetId();
  }

  if (isHexString(asset)) {
    return getConcreteAssetIdWithAccountKey20(asset);
  }

  const assetType = await getAssetIdType(api, asset);
  return {
    Concrete: {
      ...assetType.unwrap().asXcm.toJSON(),
    },
  };
}

export async function getFeeForXcmInstructionsAndAsset(
  api: ApiPromise,
  instructions: AnyJson,
  versionedAssetId: object,
) {
  const xcmToWeightResult = await api.call.xcmPaymentApi.queryXcmWeight<
    Result<Weight, PolkadotError>
  >({
    V3: instructions,
  });
  console.log('xcmToWeightResult', xcmToWeightResult.toHuman());
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
      V3: {
        ...versionedAssetId,
      },
    });
  if (!xcmToWeightResult.isOk) {
    throw new Error(
      'There was an error trying to get the fee with the weight and asset (weightToForeingAssets)',
    );
  }
  console.log('weightToForeingAssets', weightToForeingAssets.toHuman());
  return weightToForeingAssets.asOk.toBigInt();
}
