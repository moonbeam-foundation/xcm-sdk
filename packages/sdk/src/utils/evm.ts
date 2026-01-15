import {
  type Address,
  encodeAbiParameters,
  keccak256,
  maxUint256,
  numberToHex,
  parseAbiParameters,
} from 'viem';

export function getAllowanceSlot(
  owner: string,
  spender: string,
  allowanceSlot: number,
): Address {
  const mappingSlot = allowanceSlot;

  const outer = keccak256(
    encodeAbiParameters(parseAbiParameters('address, uint256'), [
      owner as Address,
      BigInt(mappingSlot),
    ]),
  );

  return keccak256(
    encodeAbiParameters(parseAbiParameters('address, bytes32'), [
      spender as Address,
      outer,
    ]),
  );
}

export const MAX_ALLOWANCE_HEX = numberToHex(maxUint256);
