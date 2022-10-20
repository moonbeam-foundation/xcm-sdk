import { isString, isUndefined } from '@polkadot/util';
import { AssetSymbol, ChainKey } from '../constants';
import {
  ExtrinsicConfig,
  ExtrinsicPallet,
  XTokensExtrinsic,
  XTokensTransferMultiCurrenciesExtrinsic,
} from '../extrinsic';
import { Asset, AssetId, Chain, MoonChain } from '../interfaces';

export function getAssetForeignId<Symbols extends AssetSymbol = AssetSymbol>(
  asset: Asset<Symbols>,
  chain: ChainKey,
): AssetId {
  const id = asset.foreignIds?.[chain];

  if (isUndefined(id)) {
    throw new Error(
      `No foreignAssetId defined for asset ${asset.originSymbol} and chain ${chain}`,
    );
  }

  return id;
}

export function getMoonAssetId<ChainKeys extends ChainKey>(
  chain: Chain<ChainKeys>,
) {
  if (isUndefined(chain.moonAssetId)) {
    throw new Error(`No moonAssetId defined for chain ${chain.key}`);
  }

  return chain.moonAssetId;
}

export function getUnitsPerSecond<ChainKeys extends ChainKey>(
  chain: Chain<ChainKeys>,
) {
  if (isUndefined(chain.unitsPerSecond)) {
    throw new Error(`No unitsPerSecond defined for chain ${chain.key}`);
  }

  return chain.unitsPerSecond;
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

export function getSymbol<Symbols extends AssetSymbol>(
  symbolOrAsset: Symbols | Asset<Symbols>,
): Symbols {
  return isString(symbolOrAsset) ? symbolOrAsset : symbolOrAsset.originSymbol;
}

export function getChainKey<ChainKeys extends ChainKey>(
  keyOrChain: ChainKeys | Chain<ChainKeys>,
): ChainKeys {
  return isString(keyOrChain) ? keyOrChain : keyOrChain.key;
}

export function getOverallWeight<ChainKeys extends ChainKey = ChainKey>(
  chain: Chain<ChainKeys> | MoonChain,
  txWeight: bigint,
): bigint {
  if (!chain.weights) {
    throw new Error(`No weights found for chain: ${chain.key}`);
  }

  const {
    descendOriginWeight,
    withdrawAssetWeight,
    buyExecutionWeight,
    transactWeight,
    baseExtrinsicWeight,
  } = chain.weights;

  return (
    descendOriginWeight +
    withdrawAssetWeight +
    buyExecutionWeight +
    transactWeight +
    baseExtrinsicWeight +
    txWeight
  );
}

export function getOverallFee(
  overallWeight: bigint,
  unitsPerSecond: bigint,
): bigint {
  return (overallWeight * unitsPerSecond) / 1_000_000_000_000n;
}
