import { convertAddressTo32Bytes } from '@moonbeam-network/xcm-utils';
import type { Address } from 'viem';
import { ContractConfig } from '../../../../../contract';
import {
  type MrlConfigBuilder,
  Provider,
} from '../../../../MrlBuilder.interfaces';
import { wormholeFactory } from '../../wormhole';
import { TOKEN_BRIDGE_RELAYER_ABI } from './TokenBridgeRelayerAbi';

const module = 'TokenBridgeRelayer';

export function TokenBridgeRelayer() {
  const provider = Provider.Wormhole;

  return {
    transferTokensWithRelay: (): MrlConfigBuilder => ({
      provider,
      build: ({ asset, destination, destinationAddress, bridgeChain }) => {
        const wh = wormholeFactory(bridgeChain);
        const whDestination = wh.getChain(destination.getWormholeName()).config
          .chainId;

        const tokenAddressOnMoonChain = bridgeChain.getChainAsset(asset)
          .address as Address | undefined;

        if (!tokenAddressOnMoonChain) {
          throw new Error(
            `Asset ${asset.symbol} does not have a token address on chain ${bridgeChain.name}`,
          );
        }

        const destinationAddress32bytes = convertAddressTo32Bytes(
          destinationAddress,
        ) as Address;
        const tokenAmountOnMoonChain = asset.convertDecimals(
          bridgeChain.getChainAsset(asset).decimals,
        ).amount;

        const contractAddress =
          wh.getChain('Moonbeam').config.contracts.tokenBridgeRelayer;

        if (!contractAddress) {
          throw new Error(`Wormhole address not found for ${bridgeChain.name}`);
        }

        return new ContractConfig({
          address: contractAddress,
          abi: TOKEN_BRIDGE_RELAYER_ABI,
          args: [
            tokenAddressOnMoonChain,
            tokenAmountOnMoonChain,
            0,
            whDestination,
            destinationAddress32bytes,
            0,
          ],
          func: 'transferTokensWithRelay',
          module,
        });
      },
    }),
  };
}
