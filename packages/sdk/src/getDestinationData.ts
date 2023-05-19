/* eslint-disable @typescript-eslint/no-use-before-define */
import { FeeConfigBuilder } from '@moonbeam-network/xcm-builder';
import { AssetConfig, TransferConfig } from '@moonbeam-network/xcm-config';
import { AnyChain, AssetAmount } from '@moonbeam-network/xcm-types';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import { PolkadotService } from './polkadot';
import { DestinationChainTransferData } from './sdk.interfaces';

export interface GetDestinationDataParams {
  transferConfig: TransferConfig;
  destinationAddress: string;
  polkadot: PolkadotService;
}

export async function getDestinationData({
  transferConfig,
  destinationAddress,
  polkadot,
}: GetDestinationDataParams): Promise<DestinationChainTransferData> {
  const {
    asset,
    destination: { chain, config },
  } = transferConfig;
  const zeroAmount = AssetAmount.fromAsset(asset, {
    amount: 0n,
    decimals: await polkadot.getAssetDecimals(asset),
  });

  const { balance, min } = await getBalanceAndMin({
    address: destinationAddress,
    chain,
    config,
    polkadot,
  });

  const balanceAmount = zeroAmount.copyWith({ amount: balance });
  const { existentialDeposit } = polkadot;
  const feeAmount = await getFee({ config: transferConfig, polkadot });
  const minAmount = zeroAmount.copyWith({ amount: min });

  return {
    balance: balanceAmount,
    chain,
    existentialDeposit,
    fee: feeAmount,
    min: minAmount,
  };
}

export interface GetBalancesParams {
  address: string;
  config: AssetConfig;
  chain: AnyChain;
  polkadot: PolkadotService;
}

export async function getBalanceAndMin({
  address,
  config,
  chain,
  polkadot,
}: GetBalancesParams) {
  const assetId = chain.getBalanceAssetId(config.asset);

  const balance = await polkadot.query(
    config.balance.build({
      address,
      asset: assetId,
    }),
  );
  const min = config.min
    ? await polkadot.query(config.min.build({ asset: assetId }))
    : 0n;

  return {
    balance,
    min,
  };
}

export interface GetFeeParams {
  config: TransferConfig;
  polkadot: PolkadotService;
}

export async function getFee({
  config,
  polkadot,
}: GetFeeParams): Promise<AssetAmount> {
  const { amount, asset } = config.source.config.destinationFee;
  const decimals = await polkadot.getAssetDecimals(asset);
  const zeroAmount = AssetAmount.fromAsset(asset, {
    amount: 0n,
    decimals,
  });

  if (Number.isFinite(amount)) {
    return zeroAmount.copyWith({
      amount: toBigInt(amount as number, decimals),
    });
  }

  const cfg = (amount as FeeConfigBuilder).build({
    api: polkadot.api,
    asset: polkadot.chain.getAssetId(asset),
  });

  return zeroAmount.copyWith({
    amount: await cfg.call(),
  });
}
