import {
  type AnyParachain,
  type AssetAmount,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import type { Address } from 'viem';
import { getGlobalConsensus } from '../extrinsic/pallets/polkadotXcm/polkadotXcm.util';
import type {
  AssetMultilocation,
  DestinationMultilocation,
} from './ContractBuilder.interfaces';

export function getPrecompileDestinationInterior(
  destination: AnyParachain,
  address?: string,
): [Address, Address] | [Address] {
  if (!address) {
    return [encodeParachain(destination.parachainId)];
  }
  const acc = encodeAddress(destination, address);

  return destination.parachainId
    ? [encodeParachain(destination.parachainId), acc]
    : [acc];
}

export function getBeneficiaryMultilocation(
  address: string,
  destination: AnyParachain,
): DestinationMultilocation {
  return [0, [encodeAddress(destination, address)]];
}

export function getDestinationMultilocation(
  address: string,
  destination: AnyParachain,
): DestinationMultilocation {
  const interior = getPrecompileDestinationInterior(destination, address);
  return [1, interior];
}

export function getDestinationParachainMultilocation(
  destination: AnyParachain,
): DestinationMultilocation {
  if (destination.isRelay) {
    return [1, []];
  }

  return [1, [encodeParachain(destination.parachainId)]];
}

export function getGlobalConsensusDestination(
  sourceApi: ApiPromise | undefined,
  destination: AnyParachain,
) {
  return [
    2,
    [
      encodeGlobalConsensus(sourceApi, destination),
      encodeParachain(destination.parachainId),
    ],
  ];
}

export function getPalletInstanceMultilocation(
  sourceApi: ApiPromise | undefined,
  asset: AssetAmount,
): AssetMultilocation {
  return [
    [0, [encodePalletInstance(sourceApi, asset.getAssetPalletInstance())]],
    asset.amount,
  ];
}

export function getAssetAddressMultilocation(
  sourceApi: ApiPromise | undefined,
  asset: AssetAmount,
  destination: AnyParachain,
): AssetMultilocation {
  if (!asset.address) {
    throw new Error(`Asset address is required for ${asset.key}`);
  }

  return [
    [
      0,
      [
        encodePalletInstance(sourceApi, asset.getAssetPalletInstance()),
        encodeAddress(destination, asset.address),
      ],
    ],
    asset.amount,
  ];
}

export function getGlobalConsensusAssetMultilocation(
  sourceApi: ApiPromise | undefined,
  asset: AssetAmount,
  destination: AnyParachain,
): AssetMultilocation {
  const assetInDestination = destination.getChainAsset(asset);
  return [
    [
      2,
      [
        encodeGlobalConsensus(sourceApi, destination),
        encodeParachain(destination.parachainId),
        encodePalletInstance(
          sourceApi,
          assetInDestination.getAssetPalletInstance(),
        ),
      ],
    ],
    asset.amount,
  ];
}

export function getAddressGlobalConsensusAssetMultilocation(
  sourceApi: ApiPromise | undefined,
  asset: AssetAmount,
  destination: AnyParachain,
): AssetMultilocation {
  const assetInDestination = destination.getChainAsset(asset);

  if (!assetInDestination.address) {
    throw new Error(`Asset address is required for ${assetInDestination.key}`);
  }

  return [
    [
      2,
      [
        encodeGlobalConsensus(sourceApi, destination),
        encodeParachain(destination.parachainId),
        encodePalletInstance(
          sourceApi,
          assetInDestination.getAssetPalletInstance(),
        ),
        encodeAddress(destination, assetInDestination.address),
      ],
    ],
    asset.amount,
  ];
}

/**
 * Encodes an XCM message to bytes for use in Solidity precompiles
 */
export function encodeXcmMessageToBytes(
  xcmMessage: Record<string, unknown>,
  api: ApiPromise | undefined,
): Address {
  if (!api) {
    throw new Error('API is required to encode XCM message');
  }

  try {
    const versionedXcm = api.createType('XcmVersionedXcm', xcmMessage);
    return versionedXcm.toHex();
  } catch (error) {
    console.error('Failed to encode XCM message:', error);
    throw error;
  }
}

function encodeParachain(paraId: number): Address {
  return `0x00${paraId.toString(16).padStart(8, '0')}`;
}

function encodeGlobalConsensus(
  api: ApiPromise | undefined,
  destination: AnyParachain,
): Address {
  const globalConsensus = getGlobalConsensus(destination);

  return encodeXcmJunction(api, {
    GlobalConsensus: globalConsensus,
  });
}

function encodePalletInstance(
  api: ApiPromise | undefined,
  palletInstance: number,
): Address {
  return encodeXcmJunction(api, {
    PalletInstance: palletInstance,
  });
}

function encodeXcmJunction(
  api: ApiPromise | undefined,
  junction: object,
): Address {
  if (!api) {
    throw new Error('API is required to encode XCM junction');
  }

  const junctionType = api.createType('XcmV3Junction', junction);

  return junctionType.toHex();
}

function encodeAddress(destination: AnyParachain, address: string): Address {
  const accountType = EvmParachain.is(destination) ? '03' : '01';
  return `0x${accountType}${u8aToHex(
    decodeAddress(address),
    -1,
    false,
  )}00` as Address;
}
