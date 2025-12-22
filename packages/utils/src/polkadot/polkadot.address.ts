import { TypeRegistry } from '@polkadot/types';
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
export function getMultilocationDerivedAddresses({
  paraId,
  address,
  parents = 0,
}: {
  paraId?: number;
  address: string;
  parents?: 0 | 1 | 2;
}) {
  const accType = isEthAddress(address) ? 'AccountKey20' : 'AccountId32';
  const decodedAddress = isEthAddress(address)
    ? hexToU8a(address)
    : decodeAddress(address);

  const family = getFamily(parents, paraId);

  const toHash = buildToHashPayload({
    parents,
    family,
    paraId,
    accType,
    address,
    decodedAddress,
  });

  const blake = blake2AsU8a(toHash);

  const address20 = u8aToHex(blake.slice(0, 20));
  const address32 = u8aToHex(blake.slice(0, 32));

  return {
    address20,
    address32,
  };
}

function getFamily(parents: 0 | 1 | 2, paraId?: number) {
  if (parents === 0 && paraId) {
    return 'ChildChain';
  } else if (parents === 1 && !paraId) {
    return 'ParentChain';
  } else if (parents === 2) {
    if (!paraId) {
      throw new Error(
        'ParaId is required for global consensus to get the family for getMultilocationDerivedAddresses',
      );
    }
    return 'glblcnsnss';
  }
  return 'SiblingChain';
}

function buildToHashPayload({
  parents,
  family,
  paraId,
  accType,
  address,
  decodedAddress,
}: {
  parents: 0 | 1 | 2;
  family: string;
  paraId?: number;
  accType: string;
  address: string;
  decodedAddress: Uint8Array;
}): Uint8Array {
  if (parents === 2) {
    if (!isEthAddress(address) || accType !== 'AccountKey20') {
      throw new Error(
        'GlobalConsensus (parents=2) branch currently supports AccountKey20 (20-byte) addresses only',
      );
    }
    if (paraId === undefined) {
      throw new Error(
        'ParaId must be provided for parents=2 GlobalConsensus case',
      );
    }

    /**
     *  currently only Kusama is supported, to calculate the computed origin account, we decide to hardcode it to avoid passing more parameters
     *  if in the future we need another consensus, we can pass it as a parameter
     */
    const consensus = 'Kusama';
    /**
     * reference: https://github.com/paritytech/polkadot-sdk/blob/c9648837536dc71249f3f5dd13af6ac90ffb7a62/polkadot/xcm/src/v3/junction.rs#L86
     * Polkadot: [2]
     * Kusama: [3]
     */
    const consensusValue = [3];

    const registry = new TypeRegistry();

    return new Uint8Array([
      ...stringToU8a(family),
      ...Uint8Array.from(consensusValue),
      ...new Uint8Array([8]),
      ...registry
        .createType('[Junction; 2]', [
          { Parachain: paraId },
          { AccountKey20: { network: consensus, key: decodedAddress } },
        ])
        .toU8a(),
    ]);
  }

  // parents = 0 or 1: ORIGINAL descend-origin hashing logic
  return new Uint8Array([
    ...stringToU8a(family),
    ...(paraId ? compactToU8a(paraId) : []),
    ...compactToU8a(accType.length + (isEthAddress(address) ? 20 : 32)),
    ...stringToU8a(accType),
    ...decodedAddress,
  ]);
}
