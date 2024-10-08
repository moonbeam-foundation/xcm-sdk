import type { BalanceConfigBuilder } from '@moonbeam-network/xcm-builder';
import type { Asset } from '@moonbeam-network/xcm-types';
import {
  AssetRoute,
  type AssetRouteConstructorParams,
  type SourceConfig,
} from './AssetRoute';

export interface MrlAssetRouteConstructorParams
  extends AssetRouteConstructorParams {
  source: MrlSourceConfig;
}

export interface MrlSourceConfig extends SourceConfig {
  moonChainFee?: {
    asset: Asset;
    balance: BalanceConfigBuilder;
  };
}

export class MrlAssetRoute extends AssetRoute {
  readonly source: MrlSourceConfig;

  constructor({
    source,
    destination,
    contract,
    extrinsic,
    mrl,
  }: MrlAssetRouteConstructorParams & { source: MrlSourceConfig }) {
    super({ source, destination, contract, extrinsic, mrl });
    this.source = source;
  }
}
