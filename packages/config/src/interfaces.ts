// eslint-disable-next-line import/no-cycle
import { Asset, Chain, MoonChain } from './constants';

export interface AssetConfig<Assets extends Asset> {
  id: string;
  /**
   * id -> erc20Id
   * `0xffffffff${BigInt(id).toString(16).padStart(32, '0')}`
   * exceptions are native tokens, for them we use
   * Erc20BalancesPrecompile 0x0000000000000000000000000000000000000802
   */
  erc20Id: string;
  originSymbol: Assets;
  originAssetId?: number;
}

export interface MoonChainConfig {
  chain: MoonChain;
  name: string;
  ws: string;
  parachainId: number;
}
export interface ChainConfig {
  chain: Chain;
  name: string;
  ws: string;
  parachainId: number;
  weight: number;
  moonAssetId?: number | bigint;
  palletInstance?: number;
}
