import {
  Asset,
  AssetSymbol,
  Chain,
  ChainKey,
  MoonChain,
} from '@moonbeam-network/xcm-config';
import { Balance } from '../sdk';

export interface AssetBalanceInfo<
  Symbols extends AssetSymbol = AssetSymbol,
  ChainKeys extends ChainKey = ChainKey,
> {
  asset: Asset<Symbols>;
  balance: Balance<string>;
  origin: Chain<ChainKeys> | MoonChain;
}

export interface XCMType {
  Xcm: {
    parents: number;
    interior: unknown;
  };
}
