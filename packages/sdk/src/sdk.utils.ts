/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  AssetConfig,
  ChainTransferConfig,
  TransferConfig,
} from '@moonbeam-network/xcm-config';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import { PolkadotService } from './polkadot';
import { SourceChainTransferData, TransferData } from './sdk.interfaces';

export async function getTransferData({
  asset,
  source,
  destination,
}: TransferConfig): Promise<TransferData> {
  const source = await getSourceData(asset, source);

  return {
    destination: {} as any,
    getEstimate(amount: number | string) {
      amount;
      return {} as any;
    },
    isSwapPossible: true,
    source,
    swap() {
      return {} as any;
    },
    transfer(amount: number | string) {
      amount;
      return '' as any;
    },
  };
}

export async function getSourceData(
  address: string,
  { chain, config }: ChainTransferConfig,
): Promise<SourceChainTransferData> {
  const polkadot = await PolkadotService.create(chain.ws);
  const decimals = chain.getAssetDecimals(config.asset) || polkadot.decimals;
  const balanceAssetId = chain.getBalanceAssetId(config.asset);
  const assetWithDecimals = AssetAmount.fromAsset(config.asset, {
    amount: 0n,
    decimals,
  });

  // TODO: Promise.all or Multi?
  const balance = await polkadot.query(
    config.balance.build({ address, asset: balanceAssetId }),
  );
  const min = config.min
    ? await polkadot.query(config.min.build({ asset: balanceAssetId }))
    : 0n;

  return {
    balance: assetWithDecimals.copyWith({ amount: balance }),
    chain,
    fee: undefined,
    feeBalance: undefined,
    max: undefined,
  };
}

export async function getFee(config: AssetConfig) {
  if (config.contract) {
    return getContractFee(config);
  }

  return getExtrinsicFee(config);
}

export async function getExtrinsicFee(config: AssetConfig) {}

export async function getContractFee(config: AssetConfig) {}
