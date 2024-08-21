import { convertAddressTo32Bytes } from '@moonbeam-network/xcm-utils';
import { Address, encodeFunctionData } from 'viem';
import { ExtrinsicConfig } from '../../../../extrinsic/ExtrinsicConfig';
import { BATCH_CONTRACT_ABI } from './BatchContractAbi';
import { ERC20_ABI } from './Erc20Abi';
import { TOKEN_BRIDGE_ABI } from './TokenBridgeAbi';
import { TOKEN_BRIDGE_RELAYER_ABI } from './TokenBridgeRelayerAbi';
import { MrlConfigBuilder } from '../../../MrlBuilder.interfaces';
import { wormholeFactory } from '../../wormhole';

export const BATCH_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000808';

export function ethereumXcm() {
  return {
    transact: ({
      isAutomatic,
    }: {
      isAutomatic: boolean;
    }): MrlConfigBuilder => ({
      build: ({
        asset,
        destination,
        destinationAddress,
        moonChain,
        moonGasLimit,
      }) => {
        const wh = wormholeFactory(moonChain);
        const whDestination = wh.getChain(destination.getWormholeName()).config
          .chainId;
        const whContractAddress = (
          isAutomatic
            ? wh.getChain('Moonbeam').config.contracts.tokenBridgeRelayer
            : wh.getChain('Moonbeam').config.contracts.tokenBridge
        ) as Address;

        const tokenAddressOnMoonChain = moonChain.getChainAsset(asset)
          .address as Address | undefined;

        if (!tokenAddressOnMoonChain) {
          throw new Error(
            `Asset ${asset.symbol} does not have a token address on chain ${moonChain.name}`,
          );
        }

        const destinationAddress32bytes = convertAddressTo32Bytes(
          destinationAddress,
        ) as Address;
        const tokenAmountOnMoonChain = asset.convertDecimals(
          moonChain.getChainAsset(asset).decimals,
        ).amount;

        const approveTx = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [whContractAddress, tokenAmountOnMoonChain],
        });
        const transferTx = isAutomatic
          ? encodeFunctionData({
              abi: TOKEN_BRIDGE_RELAYER_ABI,
              functionName: 'transferTokensWithRelay',
              args: [
                tokenAddressOnMoonChain,
                tokenAmountOnMoonChain,
                0,
                whDestination,
                destinationAddress32bytes,
                0,
              ],
            })
          : encodeFunctionData({
              abi: TOKEN_BRIDGE_ABI,
              functionName: 'transferTokens',
              args: [
                tokenAddressOnMoonChain,
                tokenAmountOnMoonChain,
                whDestination,
                destinationAddress32bytes,
                0n,
                0,
              ],
            });
        const batchAll = encodeFunctionData({
          abi: BATCH_CONTRACT_ABI,
          functionName: 'batchAll',
          args: [
            [tokenAddressOnMoonChain, whContractAddress],
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
