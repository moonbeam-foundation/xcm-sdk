import { type AnyParachain, EvmParachain } from '@moonbeam-network/xcm-types';
import type { ApiPromise } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import type { Address } from 'viem';
import type { DestinationMultilocation } from './ContractBuilder.interfaces';

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
