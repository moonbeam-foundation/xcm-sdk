import { type Address, encodeFunctionData } from 'viem';
import { ERC20_ABI } from '../../../../../balance/Erc20Abi';
import type { ContractConfig } from '../../../../../types/evm/ContractConfig';
import { ExtrinsicConfig } from '../../../../../types/substrate/ExtrinsicConfig';
import { BATCH_CONTRACT_ADDRESS } from '../../../../MrlBuilder.constants';
import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';
import { contract as ContractBuilder } from '../../contract';
import { BATCH_CONTRACT_ABI } from './BatchContractAbi';

export function ethereumXcm() {
  return {
    transact: (): MrlConfigBuilder => ({
      build: (params) => {
        const { asset, isAutomatic, moonChain, moonGasLimit } = params;

        if (!moonGasLimit) {
          throw new Error('moonGasLimit must be defined');
        }

        const tokenAddressOnMoonChain = moonChain.getChainAsset(asset)
          .address as Address | undefined;

        if (!tokenAddressOnMoonChain) {
          throw new Error(
            `Asset ${asset.symbol} does not have a token address on chain ${moonChain.name}`,
          );
        }

        const tokenAmountOnMoonChain = asset.convertDecimals(
          moonChain.getChainAsset(asset).decimals,
        ).amount;

        const contract = (
          isAutomatic
            ? ContractBuilder()
                .TokenBridgeRelayer()
                .transferTokensWithRelay()
                .build(params)
            : ContractBuilder().TokenBridge().transferTokens().build(params)
        ) as ContractConfig;

        const approveTx = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [contract.address as Address, tokenAmountOnMoonChain],
        });

        const batchAll = encodeFunctionData({
          abi: BATCH_CONTRACT_ABI,
          functionName: 'batchAll',
          args: [
            [tokenAddressOnMoonChain, contract.address as Address],
            [0n, 0n], // Value to send for each call
            [approveTx, contract.encodeFunctionData()], // Call data for each call
            [], // Gas limit for each call
          ],
        });

        return new ExtrinsicConfig({
          module: 'ethereumXcm',
          func: 'transact',
          getArgs: () => [
            {
              V2: {
                gasLimit: moonGasLimit,
                action: {
                  Call: BATCH_CONTRACT_ADDRESS,
                },
                value: 0,
                input: batchAll,
              },
            },
          ],
        });
      },
    }),
  };
}
