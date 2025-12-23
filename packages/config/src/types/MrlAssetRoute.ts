import type {
  BalanceConfigBuilder,
  FeeConfigBuilder,
  MrlConfigBuilder,
  ProtocolFeeConfigBuilder,
} from '@moonbeam-network/xcm-builder';
import type { AnyParachain, Asset } from '@moonbeam-network/xcm-types';
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
  isAutomaticPossible: boolean; // TODO mjm make this true by default?
  transfer: MrlConfigBuilder;
  bridgeChain: BridgeChainConfig;
}

export interface ProtocolFeeConfig {
  amount: number | ProtocolFeeConfigBuilder;
  asset: Asset;
  balance: BalanceConfigBuilder;
}

export interface MrlSourceConfig extends SourceConfig {
  /** Protocol bridge fee (e.g., Snowbridge fee) */
  protocolFee?: ProtocolFeeConfig;
  bridgeChainFee?: {
    asset: Asset;
    balance: BalanceConfigBuilder;
  };
}

export interface BridgeChainConfig {
  asset: Asset;
  balance: BalanceConfigBuilder;
  chain: AnyParachain;
  fee: BridgeChainFeeConfig;
}

export interface BridgeChainFeeConfig extends FeeConfig {
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
