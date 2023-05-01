import {
  BalanceConfigBuilder,
  ExtrinsicConfigBuilder,
} from '@moonbeam-network/xcm-builder';
import { Asset, Chain } from '@moonbeam-network/xcm-types';

interface CommonParams {
  asset: Asset;
  balance: BalanceConfigBuilder;
  destinations: Chain[];
  extrinsic: ExtrinsicConfigBuilder;
}

interface PropsWithFee extends CommonParams {
  feeAsset: Asset;
  feeBalance: BalanceConfigBuilder;
}

interface PropsWithoutFee extends CommonParams {
  feeAsset?: never;
  feeBalance?: never;
}

export type AssetConfigConstructorParams = PropsWithFee | PropsWithoutFee;

export class AssetConfig {
  readonly asset: Asset;

  readonly balance: BalanceConfigBuilder;

  readonly destinations: Chain[];

  readonly extrinsic: ExtrinsicConfigBuilder;

  readonly feeAsset?: Asset;

  readonly feeBalance?: BalanceConfigBuilder;

  constructor({
    asset,
    balance,
    destinations,
    extrinsic,
    feeAsset,
    feeBalance,
  }: AssetConfigConstructorParams) {
    this.asset = asset;
    this.balance = balance;
    this.destinations = destinations;
    this.extrinsic = extrinsic;
    this.feeAsset = feeAsset;
    this.feeBalance = feeBalance;

    if (feeAsset && !feeBalance) {
      throw new Error(
        `feeBalance is required when feeAsset is provided for ${this.asset.key}`,
      );
    }
  }
}
