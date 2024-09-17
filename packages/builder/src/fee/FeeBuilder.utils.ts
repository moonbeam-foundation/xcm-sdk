import { ChainAssetId } from '@moonbeam-network/xcm-types';
import { ApiPromise } from '@polkadot/api';
import { Option, Result, Vec } from '@polkadot/types';
import { Error as PolkadotError } from '@polkadot/types/interfaces';
import { XcmVersionedAssetId } from '@polkadot/types/lookup';
import { MoonbeamRuntimeXcmConfigAssetType } from './FeeBuilder.interfaces';

const DEFAULT_AMOUNT = 10 * 18;

const moonChainNativeAssetId = '0x0000000000000000000000000000000000000802';

export function getWithdrawAssetInstruction(assetTypes: any[]) {
  return {
    WithdrawAsset: assetTypes.map((assetType) => ({
      fun: {
        Fungible: DEFAULT_AMOUNT,
      },
      id: { ...assetType },
    })),
  };
}

export function getReserveAssetDepositedInstruction(assetType) {
  return {
    ReserveAssetDeposited: [
      {
        fun: {
          Fungible: '1',
        },
        id: { ...assetType },
      },
    ],
  };
}

export function getClearOriginInstruction() {
  return {
    ClearOrigin: 'NULL',
  };
}

export function getBuyExecutionInstruction(assetType) {
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

export function getDepositAssetInstruction(address: string) {
  return {
    DepositAsset: {
      assets: {
        Wild: {
          AllCounted: 1,
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
  const type = (await api.query.assetManager.assetIdType(
    asset,
  )) as unknown as Option<MoonbeamRuntimeXcmConfigAssetType>;

  if (type.isNone || !type.unwrap().isXcm) {
    throw new Error(`No asset type found for asset ${asset}`);
  }
  return type;
}

// TODO mjm rename
export async function getVersionedAssetId(
  api: ApiPromise,
  asset: ChainAssetId,
) {
  const acceptablePaymentAssetsResult: Result<
    Vec<XcmVersionedAssetId>,
    PolkadotError
  > = await api.call.xcmPaymentApi.queryAcceptablePaymentAssets(3);
  const acceptablePaymentAssets = acceptablePaymentAssetsResult.isOk
    ? acceptablePaymentAssetsResult.asOk.map((value) => value.asV3.toHuman())
    : [];

  // console.log('acceptablePaymentAssets', acceptablePaymentAssets);
  // TODO mjm verify that the assets Id are in the acceptablePaymentAssets

  if (asset === moonChainNativeAssetId) {
    return {
      Concrete: {
        interior: {
          X1: {
            PalletInstance: 10,
          },
        },
        parents: 0,
      },
    };
  }
  if (typeof asset === 'string' && asset.startsWith('0x')) {
    return {
      Concrete: {
        interior: {
          X2: [
            {
              PalletInstance: 110,
            },
            {
              AccountKey20: {
                key: asset,
                network: null,
              },
            },
          ],
        },
        parents: 0,
      },
    };
  }
  const assetType = await getAssetIdType(api, asset);

  return {
    Concrete: {
      ...assetType.unwrap().asXcm.toJSON(),
    },
  };
}
