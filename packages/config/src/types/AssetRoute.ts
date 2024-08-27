import type {
  AssetMinConfigBuilder,
  BalanceConfigBuilder,
  ContractConfigBuilder,
  ExtrinsicConfigBuilder,
  FeeConfigBuilder,
  MrlConfigBuilder,
} from '@moonbeam-network/xcm-builder';
import type { AnyChain, Asset } from '@moonbeam-network/xcm-types';

export interface AssetRouteConstructorParams {
  asset: Asset;
  source: SourceConfig;
  destination: DestinationConfig;
  contract?: ContractConfigBuilder;
  extrinsic?: ExtrinsicConfigBuilder;
  mrl?: MrlConfigBuilder;
}

export interface SourceConfig {
  chain: AnyChain;
  balance: BalanceConfigBuilder;
  fee?: FeeConfig;
  min?: AssetMinConfigBuilder;
}

export interface DestinationConfig extends Omit<SourceConfig, 'fee'> {
  fee: DestinationFeeConfig;
}

export interface FeeConfig {
  asset: Asset;
  balance: BalanceConfigBuilder;
  // NOTE: Sometimes we need to add some extra amount ("XCM Delivery Fee") to a fee
  // that is returned by "paymentInfo" for extrinsic to not fail.
  extra?: number;
}

export interface DestinationFeeConfig extends FeeConfig {
  amount: number | FeeConfigBuilder;
}

export class AssetRoute {
  readonly asset: Asset;

  readonly source: SourceConfig;

  readonly destination: DestinationConfig;

  readonly contract?: ContractConfigBuilder;

  readonly extrinsic?: ExtrinsicConfigBuilder;

  readonly mrl?: MrlConfigBuilder;

  constructor({
    asset,
    source,
    destination,
    contract,
    extrinsic,
    mrl,
  }: AssetRouteConstructorParams) {
    this.asset = asset;
    this.source = source;
    this.destination = destination;
    this.contract = contract;
    this.extrinsic = extrinsic;
    this.mrl = mrl;
  }
}
