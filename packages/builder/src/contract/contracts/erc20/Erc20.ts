/* eslint-disable @typescript-eslint/no-use-before-define */
import { ContractConfigBuilder } from '../../ContractBuilder.interfaces';
import { ContractConfig } from '../../ContractConfig';

export function Erc20() {
  return {
    balanceOf: (): ContractConfigBuilder => ({
      build: ({ address }) =>
        new ContractConfig({
          args: [address],
          func: 'balanceOf',
          module: 'Erc20',
        }),
    }),
  };
}
