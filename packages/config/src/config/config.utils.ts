import { isUndefined } from '@polkadot/util';
import { AssetSymbol, ChainKey } from '../constants';
import {
  ExtrinsicConfig,
  ExtrinsicPallet,
  XTokensExtrinsic,
  XTokensTransferMultiCurrenciesExtrinsic,
} from '../extrinsic';
import { Asset, Chain } from '../interfaces';

export function getOriginAssetId<Symbols extends AssetSymbol = AssetSymbol>(
  asset: Asset<Symbols>,
) {
  if (isUndefined(asset.originAssetId)) {
    throw new Error(`No originAssetId defined for asset ${asset.originSymbol}`);
  }

  return asset.originAssetId;
}

export function getMoonAssetId<ChainKeys extends ChainKey>(
  chain: Chain<ChainKeys>,
) {
  if (isUndefined(chain.moonAssetId)) {
    throw new Error(`No moonAssetId defined for chain ${chain.key}`);
  }

  return chain.moonAssetId;
}

export function getPalletInstance<ChainKeys extends ChainKey>(
  chain: Chain<ChainKeys>,
) {
  if (isUndefined(chain.palletInstance)) {
    throw new Error(`No palletInstance defined for chain ${chain.key}`);
  }

  return chain.palletInstance;
}

export function isMultiCurrency<Symbols extends AssetSymbol = AssetSymbol>(
  extrinsic: ExtrinsicConfig<Symbols>,
): extrinsic is XTokensTransferMultiCurrenciesExtrinsic<Symbols> {
  return (
    extrinsic.pallet === ExtrinsicPallet.XTokens &&
    extrinsic.extrinsic === XTokensExtrinsic.TransferMultiCurrencies
  );
}
