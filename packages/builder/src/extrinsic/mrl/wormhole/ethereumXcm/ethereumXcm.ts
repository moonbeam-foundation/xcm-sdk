import { convertAddressTo32Bytes } from '@moonbeam-network/xcm-utils';
import { Address, encodeFunctionData } from 'viem';
import { Wormhole } from '@wormhole-foundation/sdk-connect';
import { EvmPlatform } from '@wormhole-foundation/sdk-evm';
import { MrlExtrinsicConfigBuilder } from '../../../ExtrinsicBuilder.interfaces';
import { ExtrinsicConfig } from '../../../ExtrinsicConfig';
import { BATCH_CONTRACT_ABI } from './BatchContractAbi';
import { ERC20_ABI } from './Erc20Abi';
import { TOKEN_BRIDGE_ABI } from './TokenBridgeAbi';
import { TOKEN_BRIDGE_RELAYER_ABI } from './TokenBridgeRelayerAbi';

export const BATCH_CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000808';

export function ethereumXcm() {
  return {
    transact: ({
      isAutomatic,
    }: {
      isAutomatic: boolean;
    }): MrlExtrinsicConfigBuilder => ({
      build: ({
        asset,
        destination,
        destinationAddress,
        moonChain,
        moonGasLimit,
      }) => {
        if (!destination.wh?.name) {
          throw new Error(
            `Destination chain ${destination.name} does not have a wormhole name`,
          );
        }

        const wh = new Wormhole(moonChain.isTestChain ? 'Testnet' : 'Mainnet', [
          EvmPlatform,
        ]);
        const whDestinationChain = wh.getChain(destination.wh.name).config
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
                whDestinationChain,
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
                whDestinationChain,
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
