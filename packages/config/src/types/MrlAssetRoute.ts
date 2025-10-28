import type {
  BalanceConfigBuilder,
  FeeConfigBuilder,
  MrlConfigBuilder,
} from '@moonbeam-network/xcm-builder';
import type { Asset } from '@moonbeam-network/xcm-types';
import {
  AssetRoute,
  type AssetRouteConstructorParams,
  type FeeConfig,
  type SourceConfig,
} from './AssetRoute';

export interface MrlAssetRouteConstructorParams
  extends AssetRouteConstructorParams {
  source: MrlSourceConfig;
  mrl: MrlConfig;
}

export interface MrlConfig {
  isAutomaticPossible: boolean;
  transfer: MrlConfigBuilder;
  moonChain: MoonChainConfig;
}

export interface MrlSourceConfig extends SourceConfig {
  bridgeFee?: number | FeeConfigBuilder;
  // TODO mjm is it needed after the change?
  moonChainFee?: {
    asset: Asset;
    balance: BalanceConfigBuilder;
  };
}

export interface MoonChainConfig {
  asset: Asset;
  balance: BalanceConfigBuilder;
  fee: MoonChainFeeConfig;
}

export interface MoonChainFeeConfig extends FeeConfig {
  amount: number | FeeConfigBuilder;
}

export class MrlAssetRoute extends AssetRoute {
  readonly mrl: MrlConfig;
  readonly source: MrlSourceConfig;

  constructor({
    source,
    destination,
    contract,
    extrinsic,
    mrl,
  }: MrlAssetRouteConstructorParams & { source: MrlSourceConfig }) {
    super({ source, destination, contract, extrinsic });
    this.mrl = mrl;
    this.source = source;
  }
}
