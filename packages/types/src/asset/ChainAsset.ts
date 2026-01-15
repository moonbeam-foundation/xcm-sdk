import { toBigInt } from '@moonbeam-network/xcm-utils';
import { Asset, type AssetConstructorParams } from './Asset';

export interface ChainAssetConstructorParams extends AssetConstructorParams {
  address?: string;
  decimals: number;
  ids?: ChainAssetIds;
  min?: number | bigint;
  symbol?: string;
}

export interface ChainAssetIds {
  balanceId?: ChainAssetId;
  id?: ChainAssetId;
  minId?: ChainAssetId;
  palletInstance?: number;
  generalKey?: GeneralKey;
  /**
   * Position in memory of the allowance slot for the asset
   * example for weTH = 4
   * contract WETH9 {
   *   string public name     = "Wrapped Ether"; // slot 0
   *   string public symbol   = "WETH"; // slot 1
   *   uint8  public decimals = 18; // slot 2
   *   event  Approval(address indexed src, address indexed guy, uint wad); // events do not consume storage slots
   *   event  Transfer(address indexed src, address indexed dst, uint wad); // events do not consume storage slots
   *   event  Deposit(address indexed dst, uint wad); // events do not consume storage slots
   *   event  Withdrawal(address indexed src, uint wad); // events do not consume storage slots
   *   mapping (address => uint)                       public  balanceOf; // slot 3
   *   mapping (address => mapping (address => uint))  public  allowance; // slot 4
   * } */
  allowanceSlot?: number;
}

export type ChainAssetId =
  | string
  | number
  | bigint
  | { [key: string]: ChainAssetId };

export interface GeneralKey {
  length: number;
  data: string;
}

export class ChainAsset extends Asset {
  readonly address?: string;

  readonly decimals: number;

  readonly ids?: ChainAssetIds;

  readonly min?: bigint;

  readonly symbol?: string;

  constructor({
    address,
    decimals,
    ids,
    min,
    symbol,
    ...other
  }: ChainAssetConstructorParams) {
    super(other);

    this.address = address;
    this.decimals = decimals;
    this.ids = ids;
    this.min = min ? toBigInt(min, decimals) : undefined;
    this.symbol = symbol;
  }

  static fromAsset(
    asset: Asset,
    params: Omit<ChainAssetConstructorParams, keyof AssetConstructorParams>,
  ): ChainAsset {
    return new ChainAsset({
      ...asset,
      ...params,
    });
  }

  copyWith(params: Partial<ChainAssetConstructorParams>): ChainAsset {
    return new ChainAsset({
      ...this,
      ...params,
    });
  }

  getSymbol(): string {
    return this.symbol || this.originSymbol;
  }

  getAssetId(): ChainAssetId {
    return this.ids?.id ?? this.originSymbol;
  }

  getAssetRegisteredId(): ChainAssetId | undefined {
    return this.ids?.id;
  }

  getBalanceAssetId(): ChainAssetId {
    return this.ids?.balanceId ?? this.getAssetId();
  }

  getMinAssetId(): ChainAssetId {
    return this.ids?.minId ?? this.getAssetId();
  }

  getAssetPalletInstance(): number {
    if (!this.ids?.palletInstance) {
      throw new Error(
        `Pallet instance is not defined for ${this.originSymbol}`,
      );
    }

    return this.ids?.palletInstance;
  }

  getAssetMin(): bigint {
    return this.min ?? 0n;
  }

  getGeneralKey(): GeneralKey | undefined {
    return this.ids?.generalKey;
  }

  hasOnlyAddress(): this is { address: string } {
    return !!this.address && !this.ids?.id;
  }
}
