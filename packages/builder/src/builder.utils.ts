import { type AnyParachain, EvmParachain } from '@moonbeam-network/xcm-types';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import type { Address } from 'viem';

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
