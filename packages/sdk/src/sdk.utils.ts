/* eslint-disable @typescript-eslint/no-use-before-define */
import { AssetConfig, TransferConfig } from '@moonbeam-network/xcm-config';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import { PolkadotService } from './polkadot';
import { SourceChainTransferData, TransferData } from './sdk.interfaces';

export interface GetTransferDataParams {
  config: TransferConfig;
  destinationAddress: string;
  sourceAddress: string;
}

export async function getTransferData({
  config,
  destinationAddress,
  sourceAddress,
}: GetTransferDataParams): Promise<TransferData> {
  const [destPolkadot, srcPolkadot] = await PolkadotService.createMulti([
    config.destination.chain.ws,
    config.source.chain.ws,
  ]);

  // const source = await getSourceData();

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

export interface GetSourceDataParams {
  address: string;
  config: TransferConfig;
  polkadot: PolkadotService;
}

export async function getSourceData({
  address,
  config,
  polkadot,
}: GetSourceDataParams): Promise<SourceChainTransferData> {
  const {
    asset,
    source: { chain, config: srcConfig },
  } = config;

  const balanceAssetId = chain.getBalanceAssetId(asset);
  const assetAmount = AssetAmount.fromAsset(asset, {
    amount: 0n,
    decimals: chain.getAssetDecimals(asset) || polkadot.decimals,
  });
  const feeAssetAmount = srcConfig.fee
    ? AssetAmount.fromAsset(srcConfig.fee.asset, {
        amount: 0n,
        decimals:
          chain.getAssetDecimals(srcConfig.fee.asset) || polkadot.decimals,
      })
    : assetAmount;

  // TODO: Promise.all or Multi?
  const balance = await polkadot.query(
    srcConfig.balance.build({ address, asset: balanceAssetId }),
  );
  const min = srcConfig.min
    ? await polkadot.query(srcConfig.min.build({ asset: balanceAssetId }))
    : 0n;

  return {
    balance: assetAmount.copyWith({ amount: balance }),
    chain,
    existentialDeposit: polkadot.existentialDeposit,
    fee: undefined,
    feeBalance: undefined,
    max: undefined,
    min: assetAmount.copyWith({ amount: min }),
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
