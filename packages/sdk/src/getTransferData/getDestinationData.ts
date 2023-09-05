/* eslint-disable @typescript-eslint/no-use-before-define */
import { FeeConfigBuilder } from '@moonbeam-network/xcm-builder';
import { TransferConfig } from '@moonbeam-network/xcm-config';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import { PolkadotService } from '../polkadot';
import { DestinationChainTransferData, EvmSigner } from '../sdk.interfaces';
import { getBalance, getDecimals, getMin } from './getTransferData.utils';

export interface GetDestinationDataParams {
  transferConfig: TransferConfig;
  destinationAddress: string;
  evmSigner: EvmSigner;
  polkadot: PolkadotService;
}

export async function getDestinationData({
  transferConfig,
  destinationAddress,
  evmSigner,
  polkadot,
}: GetDestinationDataParams): Promise<DestinationChainTransferData> {
  const {
    asset,
    destination: { chain, config },
  } = transferConfig;

  const zeroAmount = AssetAmount.fromAsset(asset, {
    amount: 0n,
    decimals: await getDecimals({
      address: destinationAddress,
      config,
      evmSigner,
      polkadot,
    }),
  });

  const balance = await getBalance({
    address: destinationAddress,
    config,
    evmSigner,
    polkadot,
  });
  const min = await getMin(config, polkadot);

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
