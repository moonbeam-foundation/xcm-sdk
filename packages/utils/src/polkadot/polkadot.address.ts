import {
  bnToU8a,
  compactToU8a,
  hexToU8a,
  stringToU8a,
  u8aToHex,
} from '@polkadot/util';
import { blake2AsU8a, decodeAddress } from '@polkadot/util-crypto';
import { isEthAddress } from '../format';

/**
 * reference: https://github.com/Moonsong-Labs/xcm-tools/blob/main/scripts/calculate-sovereign-account.ts
 */

export function getSovereignAccountAddresses(paraId: number) {
  const paraIdU8a = bnToU8a(paraId, { bitLength: 32 });
  const relay = u8aToHex(
    new Uint8Array([...stringToU8a('para'), ...paraIdU8a]),
  ).padEnd(66, '0');
  const generic = u8aToHex(
    new Uint8Array([...stringToU8a('sibl'), ...paraIdU8a]),
  ).padEnd(66, '0');
  const moonbeam = generic.slice(0, 42);

  return {
    generic,
    moonbeam,
    relay,
  };
}

/**
 * reference: https://github.com/Moonsong-Labs/xcm-tools/blob/main/scripts/calculate-multilocation-derivative-account.ts
 */
// TODO update with parents 2 (for moonriver to moonbeam bridge)
export function getMultilocationDerivedAddresses({
  paraId,
  address,
  parents = 0,
}: {
  paraId?: number;
  address: string;
  parents?: 0 | 1 | 2;
}) {
  if (parents === 2) {
    throw new Error('Parents 2 not supported yet');
  }
  const accType = isEthAddress(address) ? 'AccountKey20' : 'AccountId32';
  const decodedAddress = isEthAddress(address)
    ? hexToU8a(address)
    : decodeAddress(address);

  // Describe Family
  // https://github.com/paritytech/polkadot/blob/master/xcm/xcm-builder/src/location_conversion.rs#L96-L118
  const family =
    parents === 0 && paraId
      ? 'ChildChain'
      : parents === 1 && !paraId
        ? 'ParentChain'
        : 'SiblingChain';

  const blake = blake2AsU8a(
    new Uint8Array([
      ...stringToU8a(family),
      ...(paraId ? compactToU8a(paraId) : []),
      ...compactToU8a(accType.length + (isEthAddress(address) ? 20 : 32)),
      ...stringToU8a(accType),
      ...decodedAddress,
    ]),
  );

  const address20 = u8aToHex(blake.slice(0, 20));
  const address32 = u8aToHex(blake.slice(0, 32));

  return {
    address20,
    address32,
  };
}
