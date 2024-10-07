import { convertAddressTo32Bytes } from '@moonbeam-network/xcm-utils';
import type { Address } from 'viem';
import { ContractConfig } from '../../../../../contract';
import type { MrlConfigBuilder } from '../../../../MrlBuilder.interfaces';
import { wormholeFactory } from '../../wormhole';
import { TOKEN_BRIDGE_ABI } from './TokenBridgeAbi';

const module = 'TokenBridge';

export function TokenBridge() {
  return {
    transferTokens: (): MrlConfigBuilder => ({
      build: ({ asset, destination, destinationAddress, moonChain }) => {
        const wh = wormholeFactory(moonChain);
        const whDestination = wh.getChain(destination.getWormholeName()).config
          .chainId;

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

        const contractAddress =
          wh.getChain('Moonbeam').config.contracts.tokenBridge;

        if (!contractAddress) {
          throw new Error(`Wormhole address not found for ${moonChain.name}`);
        }

        return new ContractConfig({
          address: contractAddress,
          abi: TOKEN_BRIDGE_ABI,
          args: [
            tokenAddressOnMoonChain,
            tokenAmountOnMoonChain,
            whDestination,
            destinationAddress32bytes,
            0n,
            0,
          ],
          func: 'transferTokens',
          module,
        });
      },
    }),
  };
}
