import {
  AssetMinConfigBuilder,
  BalanceConfigBuilder,
  ContractConfigBuilder,
  ExtrinsicConfigBuilder,
} from '@moonbeam-network/xcm-builder';
import { Asset, Chain } from '@moonbeam-network/xcm-types';

interface CommonParams {
  asset: Asset;
  balance: BalanceConfigBuilder;
  contract?: ContractConfigBuilder;
  destinations: Chain[];
  extrinsic?: ExtrinsicConfigBuilder;
  min?: AssetMinConfigBuilder;
}

interface ParamsWithFee extends CommonParams {
  feeAsset: Asset;
  feeBalance: BalanceConfigBuilder;
}

interface ParamsWithoutFee extends CommonParams {
  feeAsset?: never;
  feeBalance?: never;
}

export type AssetConfigConstructorParams = ParamsWithFee | ParamsWithoutFee;

export class AssetConfig {
  readonly asset: Asset;

  readonly balance: BalanceConfigBuilder;

  readonly contract?: ContractConfigBuilder;

  readonly destinations: Chain[];

  readonly extrinsic?: ExtrinsicConfigBuilder;

  readonly feeAsset?: Asset;

  readonly feeBalance?: BalanceConfigBuilder;

  readonly min?: AssetMinConfigBuilder;

  constructor({
    asset,
    balance,
    contract,
    destinations,
    extrinsic,
    feeAsset,
    feeBalance,
    min,
  }: AssetConfigConstructorParams) {
    this.asset = asset;
    this.balance = balance;
    this.contract = contract;
    this.destinations = destinations;
    this.extrinsic = extrinsic;
    this.feeAsset = feeAsset;
    this.feeBalance = feeBalance;
    this.min = min;

    if (feeAsset && !feeBalance) {
      throw new Error(
        `feeBalance is required when feeAsset is provided for ${this.asset.key}`,
      );
    }
  }
}
