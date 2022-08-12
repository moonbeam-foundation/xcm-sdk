import {
  Asset,
  AssetConfig,
  ChainConfig,
  MoonChainConfig,
} from '@moonbeam-network/xcm-config';
import {
  PalletAssetsAssetAccount,
  PalletAssetsAssetMetadata,
} from '@polkadot/types/lookup';

export interface AssetBalanceInfo<Assets extends Asset> {
  asset: AssetConfig<Assets>;
  balance: PalletAssetsAssetAccount;
  meta: PalletAssetsAssetMetadata;
  origin: ChainConfig | MoonChainConfig;
}
