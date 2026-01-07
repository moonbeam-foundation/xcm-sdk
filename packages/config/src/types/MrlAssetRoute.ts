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
  isAutomaticPossible?: boolean;
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
  readonly mrl: MrlConfig & { isAutomaticPossible: boolean };
  readonly source: MrlSourceConfig;

  constructor({
    source,
    destination,
    contract,
    extrinsic,
    mrl,
  }: MrlAssetRouteConstructorParams & { source: MrlSourceConfig }) {
    super({ source, destination, contract, extrinsic });
    // Set the default value for isAutomaticPossible as true when not defined
    this.mrl = {
      ...mrl,
      isAutomaticPossible: mrl.isAutomaticPossible ?? true,
    };
    this.source = source;
  }
}
