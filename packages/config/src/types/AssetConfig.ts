import {
  AssetMinConfigBuilder,
  BalanceConfigBuilder,
  ContractConfigBuilder,
  ExtrinsicConfigBuilder,
} from '@moonbeam-network/xcm-builder';
import { Asset, Chain } from '@moonbeam-network/xcm-types';

export interface AssetConfigConstructorParams {
  asset: Asset;
  balance: BalanceConfigBuilder;
  contract?: ContractConfigBuilder;
  destinations: Chain;
  extrinsic?: ExtrinsicConfigBuilder;
  fee?: FeeAssetConfig;
  min?: AssetMinConfigBuilder;
}

export interface FeeAssetConfig {
  asset: Asset;
  balance: BalanceConfigBuilder;
}

export class AssetConfig {
  readonly asset: Asset;

  readonly balance: BalanceConfigBuilder;

  readonly contract?: ContractConfigBuilder;

  readonly destination: Chain;

  readonly extrinsic?: ExtrinsicConfigBuilder;

  readonly fee?: FeeAssetConfig;

  readonly min?: AssetMinConfigBuilder;

  constructor({
    asset,
    balance,
    contract,
    destinations,
    extrinsic,
    fee,
    min,
  }: AssetConfigConstructorParams) {
    this.asset = asset;
    this.balance = balance;
    this.contract = contract;
    this.destination = destinations;
    this.extrinsic = extrinsic;
    this.fee = fee;
    this.min = min;
  }
}
