import { bnToU8a, u8aToHex, stringToU8a } from '@polkadot/util';

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
