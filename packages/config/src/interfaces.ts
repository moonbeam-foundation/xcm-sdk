import { BalanceConfig } from './balance';
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
}

export interface ChainBase<ChainKeys extends ChainKey | MoonChainKey> {
  key: ChainKeys;
  name: string;
  ws: string;
  parachainId: number;
  weights?: {
    descendOriginWeight: bigint;
    withdrawAssetWeight: bigint;
    buyExecutionWeight: bigint;
    transactWeight: bigint;
  };
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
  /**
   * units per second - a number of units per second
   * unitsPerSecond = weightPerSecond * baseExtrinsicCost / baseExtrinsicWeight
   */
  unitsPerSecond?: bigint;
}

export interface XcmFeeAsset<Symbols extends AssetSymbol = AssetSymbol> {
  balance: BalanceConfig<Symbols>;
  asset: Asset<Symbols>;
}
