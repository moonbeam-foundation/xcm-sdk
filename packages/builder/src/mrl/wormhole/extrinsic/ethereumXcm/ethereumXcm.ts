import { Address, encodeFunctionData } from 'viem';
import { ExtrinsicConfig } from '../../../../types/substrate/ExtrinsicConfig';
import { BATCH_CONTRACT_ABI } from './BatchContractAbi';
import { ERC20_ABI } from './Erc20Abi';
import { TOKEN_BRIDGE_ABI } from './TokenBridgeAbi';
import { TOKEN_BRIDGE_RELAYER_ABI } from './TokenBridgeRelayerAbi';
import { MrlConfigBuilder } from '../../../MrlBuilder.interfaces';
import { contract } from '../../contract';
import { ContractConfig } from '../../../..';

export const BATCH_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000808';

export function ethereumXcm() {
  return {
    transact: (): MrlConfigBuilder => ({
      build: (params) => {
        const { asset, isAutomatic, moonChain, moonGasLimit } = params;

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

        const contractConfig = isAutomatic
          ? (contract()
              .TokenBridgeRelayer()
              .transferTokensWithRelay()
              .build(params) as ContractConfig)
          : (contract()
              .TokenBridge()
              .transferTokens()
              .build(params) as ContractConfig);

        const approveTx = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [contractConfig.address as Address, tokenAmountOnMoonChain],
        });

        const transferTx = isAutomatic
          ? encodeFunctionData({
              abi: TOKEN_BRIDGE_RELAYER_ABI,
              functionName: 'transferTokensWithRelay',
              args: contractConfig.args,
            })
          : encodeFunctionData({
              abi: TOKEN_BRIDGE_ABI,
              functionName: 'transferTokens',
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              args: contractConfig.args,
            });

        const batchAll = encodeFunctionData({
          abi: BATCH_CONTRACT_ABI,
          functionName: 'batchAll',
          args: [
            [tokenAddressOnMoonChain, contractConfig.address as Address],
            [0n, 0n], // Value to send for each call
            [approveTx, transferTx], // Call data for each call
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
