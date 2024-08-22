import type {
  AssetMinConfigBuilder,
  BalanceConfigBuilder,
  ContractConfigBuilder,
  ExtrinsicConfigBuilder,
  FeeConfigBuilder,
} from '@moonbeam-network/xcm-builder';
import type { AnyChain, Asset } from '@moonbeam-network/xcm-types';

export interface AssetRouteConstructorParams {
  asset: Asset;
  source: SourceConfig;
  destination: DestinationConfig;
  transfer: ContractConfigBuilder | ExtrinsicConfigBuilder;
}

export interface SourceConfig {
  chain: AnyChain;
  balance: BalanceConfigBuilder;
  fee?: FeeConfig;
  min?: AssetMinConfigBuilder;
}

export interface DestinationConfig extends Omit<SourceConfig, 'fee'> {
  fee?: DestinationFeeConfig;
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

  readonly transfer: ContractConfigBuilder | ExtrinsicConfigBuilder;

  constructor({
    asset,
    source,
    destination,
    transfer,
  }: AssetRouteConstructorParams) {
    this.asset = asset;
    this.source = source;
    this.destination = destination;
    this.transfer = transfer;
  }
}
