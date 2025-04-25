import type {
  AssetMinConfigBuilder,
  BalanceConfigBuilder,
  ContractConfigBuilder,
  ExtrinsicConfigBuilder,
  FeeConfigBuilder,
} from '@moonbeam-network/xcm-builder';
import type {
  AnyChain,
  Asset,
  ChainAsset,
  SetOptional,
} from '@moonbeam-network/xcm-types';

export interface AssetRouteConstructorParams {
  source: SourceConfig;
  destination: DestinationConfig;
  contract?: ContractConfigBuilder;
  extrinsic?: ExtrinsicConfigBuilder;
}

export interface SourceConfig {
  asset: Asset;
  chain: AnyChain;
  balance: BalanceConfigBuilder;
  fee: FeeConfig;
  destinationFee?: {
    asset?: Asset;
    balance: BalanceConfigBuilder;
  };
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

export interface DestinationFeeConfig
  extends SetOptional<FeeConfig, 'balance'> {
  amount: number | FeeConfigBuilder;
}

export class AssetRoute {
  readonly source: SourceConfig;

  readonly destination: DestinationConfig;

  readonly contract?: ContractConfigBuilder;

  readonly extrinsic?: ExtrinsicConfigBuilder;

  constructor({
    source,
    destination,
    contract,
    extrinsic,
  }: AssetRouteConstructorParams) {
    this.source = source;
    this.destination = destination;
    this.contract = contract;
    this.extrinsic = extrinsic;
  }

  getDestinationFeeAssetOnSource(): ChainAsset {
    return this.source.chain.getChainAsset(
      this.source.destinationFee?.asset || this.destination.fee.asset,
    );
  }
}
