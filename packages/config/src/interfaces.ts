// eslint-disable-next-line import/no-cycle
import { AssetSymbol, ChainKey, MoonChainKey } from './constants';

export interface Asset<Symbols extends AssetSymbol = AssetSymbol> {
  id: string;
  /**
   * id -> erc20Id
   * `0xffffffff${BigInt(id).toString(16).padStart(32, '0')}`
   * exceptions are native tokens, for them we use
   * Erc20BalancesPrecompile 0x0000000000000000000000000000000000000802
   */
  erc20Id: string;
  originSymbol: Symbols;
  originAssetId?: number;
  isNative?: boolean;
}

export interface ChainBase<Key = ChainKey> {
  key: Key;
  name: string;
  ws: string;
  parachainId: number;
}

export interface MoonChain extends ChainBase<MoonChainKey> {
  decimals: number;
  unitsPerSecond: bigint;
}

export interface Chain extends ChainBase {
  weight: number;
  moonAssetId?: number | bigint;
  palletInstance?: number;
}
