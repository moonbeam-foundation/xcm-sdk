import { u8aToHex } from '@polkadot/util';
import { ContractConfig } from '../../../../../contract';
import type { MrlExecuteConfigBuilder } from '../../../../MrlBuilder.interfaces';
import { GMP_ABI } from './GmpAbi';

const module = 'GMP';

export const GMP_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000816';

export function Gmp() {
  return {
    wormholeTransferERC20: (): MrlExecuteConfigBuilder => ({
      build: ({ bytes }) => {
        const hex = u8aToHex(bytes);

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
