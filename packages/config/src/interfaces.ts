import { AssetSymbol, ChainKey, MoonChainKey } from './constants';

export type AssetId = number | bigint | string;

export interface Asset<Symbols extends AssetSymbol = AssetSymbol> {
  id: string;
  /**
   * Foreign assets id -> erc20Id
   * `0xffffffff${BigInt(id).toString(16).padStart(32, '0')}`
   * Local assets id -> erc20Id
   * `0xfffffffe${BigInt(id).toString(16).padStart(32, '0')}`
   * exceptions are native tokens, for them we use
   * Erc20BalancesPrecompile 0x0000000000000000000000000000000000000802
   */
  erc20Id: string;
  foreignIds?: Partial<Record<ChainKey, AssetId>>;
  originSymbol: Symbols;
  isNative?: boolean;
  isLocalAsset?: boolean;
  isDummy?: boolean;
}

export interface ChainBase<ChainKeys extends ChainKey | MoonChainKey> {
  key: ChainKeys;
  name: string;
  ws: string;
  parachainId: number;
}

export interface MoonChain extends ChainBase<MoonChainKey> {
  chainId: number;
  decimals: number;
  unitsPerSecond: bigint;
}

export interface Chain<ChainKeys extends ChainKey = ChainKey>
  extends ChainBase<ChainKeys> {
  weight: number;
  moonAssetId?: number | bigint;
  palletInstance?: number;
}
