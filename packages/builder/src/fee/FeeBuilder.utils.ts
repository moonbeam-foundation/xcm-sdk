import { type AnyChain, EvmParachain } from '@moonbeam-network/xcm-types';
import { isEthAddress } from '@moonbeam-network/xcm-utils';
import type { ApiPromise } from '@polkadot/api';
import type { Result, u128 } from '@polkadot/types';
import type {
  Error as PolkadotError,
  Weight,
} from '@polkadot/types/interfaces';
import type { AnyJson } from '@polkadot/types/types';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { XcmVersion } from '../extrinsic';
import { getGlobalConsensus } from '../extrinsic/pallets/polkadotXcm/polkadotXcm.util';

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

export function getUniversalOriginInstruction(source?: AnyChain) {
  if (!EvmParachain.isAnyParachain(source)) {
    throw new Error('Source is not a parachain');
  }

  return {
    UniversalOrigin: {
      GlobalConsensus: getGlobalConsensus(source),
    },
  };
}

export function getDescendOriginInstruction(source?: AnyChain) {
  if (!EvmParachain.isAnyParachain(source)) {
    throw new Error('Source is not a parachain');
  }

  return {
    DescendOrigin: {
      X1: [
        {
          Parachain: source.parachainId,
        },
      ],
    },
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

  const weightToForeignAssets =
    await api.call.xcmPaymentApi.queryWeightToAssetFee<
      Result<u128, PolkadotError>
    >(xcmToWeight, {
      [STABLE_XCM_VERSION]: {
        ...versionedAssetId,
      },
    });

  // If the asset is not supported by V4, retry with V5
  // TODO this is a temporary solution, we should find a better way to handle this, with xcmPallet.supportedVersion or polkadotXcm.supportedVersion
  if (!weightToForeignAssets.isOk) {
    console.error(
      'Error trying to get the fee with the weight and asset (weightToForeignAssets) with V4, retrying with V5',
    );

    const weightToForeignAssetsV5 =
      await api.call.xcmPaymentApi.queryWeightToAssetFee<
        Result<u128, PolkadotError>
      >(xcmToWeight, {
        [XcmVersion.v5]: {
          ...versionedAssetId,
        },
      });

    if (!weightToForeignAssetsV5.isOk) {
      throw new Error(
        'There was an error trying to get the fee with the weight and asset (weightToForeignAssets). Make sure the asset is supported by XcmPaymentApi.',
      );
    }
    return weightToForeignAssetsV5.asOk.toBigInt();
  }
  return weightToForeignAssets.asOk.toBigInt();
}
