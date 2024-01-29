import {
  AssetMinConfigBuilder,
  BalanceConfigBuilder,
  ContractConfigBuilder,
  ExtrinsicConfigBuilder,
  FeeConfigBuilder,
} from '@moonbeam-network/xcm-builder';
import { AnyChain, Asset } from '@moonbeam-network/xcm-types';

export interface AssetConfigConstructorParams {
  asset: Asset;
  balance: BalanceConfigBuilder;
  contract?: ContractConfigBuilder;
  destination: AnyChain;
  destinationFee: DestinationFeeConfig;
  extrinsic?: ExtrinsicConfigBuilder;
  fee?: FeeAssetConfig;
  min?: AssetMinConfigBuilder;
}

export interface DestinationFeeConfig extends FeeAssetConfig {
  amount: number | FeeConfigBuilder;
}

export interface FeeAssetConfig {
  asset: Asset;
  balance: BalanceConfigBuilder;
  xcmDeliveryFeeAmount?: number;
}

export class AssetConfig {
  readonly asset: Asset;

  readonly balance: BalanceConfigBuilder;

  readonly contract?: ContractConfigBuilder;

  readonly destination: AnyChain;

  readonly destinationFee: DestinationFeeConfig;

  readonly extrinsic?: ExtrinsicConfigBuilder;

  readonly fee?: FeeAssetConfig;

  readonly min?: AssetMinConfigBuilder;

  constructor({
    asset,
    balance,
    contract,
    destination,
    destinationFee,
    extrinsic,
    fee,
    min,
  }: AssetConfigConstructorParams) {
    this.asset = asset;
    this.balance = balance;
    this.contract = contract;
    this.destination = destination;
    this.destinationFee = destinationFee;
    this.extrinsic = extrinsic;
    this.fee = fee;
    this.min = min;
  }
}
