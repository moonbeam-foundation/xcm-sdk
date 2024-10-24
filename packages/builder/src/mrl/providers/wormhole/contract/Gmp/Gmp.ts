import type { Address } from 'viem';
import { ContractConfig } from '../../../../../contract';
import type { MrlRedeemConfigBuilder } from '../../../../MrlBuilder.interfaces';
import { GMP_ABI } from './GmpAbi';

const module = 'GMP';

export const GMP_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000816';

export function Gmp() {
  return {
    wormholeTransferERC20: (): MrlRedeemConfigBuilder => ({
      build: ({ bytes }) => {
        const hex =
          `0x${Buffer.from(bytes as Uint8Array).toString('hex')}` as Address;

        return new ContractConfig({
          address: GMP_CONTRACT_ADDRESS,
          abi: GMP_ABI,
          args: [hex],
          func: 'wormholeTransferERC20',
          module,
        });
      },
    }),
  };
}
