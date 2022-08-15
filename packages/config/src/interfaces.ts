// eslint-disable-next-line import/no-cycle
import { Asset, Chain, MoonChain } from './constants';

export interface AssetConfig<Assets extends Asset = Asset> {
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
  isNative?: boolean;
}

export interface ChainBaseConfig<Chains = Chain> {
  chain: Chains;
  name: string;
  ws: string;
  parachainId: number;
}

export interface MoonChainConfig extends ChainBaseConfig<MoonChain> {
  decimals: number;
}

export interface ChainConfig extends ChainBaseConfig {
  weight: number;
  moonAssetId?: number | bigint;
  palletInstance?: number;
}
