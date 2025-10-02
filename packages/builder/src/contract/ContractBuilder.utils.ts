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

// TODO do it correctly after PoC
function encodeParachain(paraId: number): string {
  return `0x00${paraId.toString(16).padStart(8, '0')}`;
}

export function getPrecompileDestinationInterior(
  destination: AnyParachain,
  address?: string,
): [Address, Address] | [Address] {
  if (!address) {
    return [`0x0000000${destination.parachainId.toString(16)}`];
  }

  /* 
   01: AccountId32
   03: AccountKey20
   https://docs.moonbeam.network/builders/interoperability/xcm/xc20/xtokens/#building-the-precompile-multilocation
   */
  const accountType = EvmParachain.is(destination) ? '03' : '01';
  const acc = `0x${accountType}${u8aToHex(
    decodeAddress(address),
    -1,
    false,
  )}00` as Address;

  return destination.parachainId
    ? [`0x0000000${destination.parachainId.toString(16)}`, acc]
    : [acc];
}

// TODO do it correctly after PoC
export function getBeneficiaryMultilocation(
  address: string,
  destination: AnyParachain,
): DestinationMultilocation {
  // TODO extract to function
  const accountType = EvmParachain.is(destination) ? '03' : '01';
  const acc = `0x${accountType}${u8aToHex(
    decodeAddress(address),
    -1,
    false,
  )}00` as Address;

  return [0, [acc]];
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

  return [1, [`0x00${destination.parachainId.toString(16).padStart(8, '0')}`]];
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

export function getAccountKey20Multilocation(
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

// TODO do it correctly after PoC
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

/**
 * Encodes an XCM message to bytes for use in Solidity precompiles
 */
export function encodeXcmMessageToBytes(
  xcmMessage: Record<string, unknown>,
  api: ApiPromise | undefined,
): string {
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

function encodeGlobalConsensus(
  api: ApiPromise | undefined,
  destination: AnyParachain,
): string {
  const globalConsensus = getGlobalConsensus(destination);

  return encodeXcmJunction(api, {
    GlobalConsensus: globalConsensus,
  });
}

function encodePalletInstance(
  api: ApiPromise | undefined,
  palletInstance: number,
): string {
  return encodeXcmJunction(api, {
    PalletInstance: palletInstance,
  });
}

function encodeXcmJunction(
  api: ApiPromise | undefined,
  junction: object,
): string {
  if (!api) {
    throw new Error('API is required to encode XCM junction');
  }

  const junctionType = api.registry.createType('XcmV3Junction', junction);

  return junctionType.toHex();
}

function encodeAddress(destination: AnyParachain, address: string): string {
  const accountType = EvmParachain.is(destination) ? '03' : '01';
  return `0x${accountType}${u8aToHex(
    decodeAddress(address),
    -1,
    false,
  )}00` as Address;
}
