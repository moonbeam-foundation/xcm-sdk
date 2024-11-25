import { type Chain, defineChain } from 'viem';
import type { ChainAsset } from '../asset';

interface GetViemChainParams {
  id: number;
  name: string;
  nativeAsset: ChainAsset;
  rpc: string;
}

export function getViemChain({
  id,
  name,
  nativeAsset,
  rpc,
}: GetViemChainParams): Chain {
  return defineChain({
    id,
    name,
    nativeCurrency: {
      decimals: nativeAsset.decimals,
      name: nativeAsset.originSymbol,
      symbol: nativeAsset.originSymbol,
    },
    rpcUrls: {
      default: {
        http: [rpc],
      },
    },
  });
}
