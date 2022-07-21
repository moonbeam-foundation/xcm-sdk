// eslint-disable-next-line import/no-cycle
import {
  MOONBASE_ASSETS,
  MOONBASE_CHAINS,
  MOONBEAM_ASSETS,
  MOONBEAM_CHAINS,
  MOONRIVER_ASSETS,
  MOONRIVER_CHAINS,
} from './constants';

export interface AssetConfig<Asset> {
  id: string;
  /**
   * id -> erc20Id
   * `0xffffffff${BigInt(id).toString(16).padStart(32, '0')}`
   * exceptions are native tokens, for them we use
   * Erc20BalancesPrecompile 0x0000000000000000000000000000000000000802
   */
  erc20Id: string;
  originSymbol: Asset;
  originAssetId?: number;
}

export type MoonbaseAssets = typeof MOONBASE_ASSETS[number];
export type MoonriverAssets = typeof MOONRIVER_ASSETS[number];
export type MoonbeamAssets = typeof MOONBEAM_ASSETS[number];

export interface MoonChainConfig {
  name: string;
  ws: string;
  parachainId: number;
}
export interface ChainConfig extends MoonChainConfig {
  weight: number;
}

export type MoonbaseChains = typeof MOONBASE_CHAINS[number];
export type MoonriverChains = typeof MOONRIVER_CHAINS[number];
export type MoonbeamChains = typeof MOONBEAM_CHAINS[number];
