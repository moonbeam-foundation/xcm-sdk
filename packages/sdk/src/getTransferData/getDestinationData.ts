/* eslint-disable @typescript-eslint/no-use-before-define */
import { FeeConfigBuilder } from '@moonbeam-network/xcm-builder';
import { TransferConfig } from '@moonbeam-network/xcm-config';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import { PolkadotService } from '../polkadot';
import { DestinationChainTransferData } from '../sdk.interfaces';
import { getBalance, getMin } from './getTransferData.utils';

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
    destination: { chain, config },
  } = transferConfig;
  const balance = await getBalance({
    address: destinationAddress,
    chain,
    config,
    polkadot,
  });
  const min = await getMin(config, polkadot);
  const fee = await getFee({
    address: destinationAddress,
    transferConfig,
    polkadot,
  });

  return {
    balance,
    chain,
    existentialDeposit: polkadot.existentialDeposit,
    fee,
    min,
  };
}

export interface GetFeeParams {
  address: string;
  transferConfig: TransferConfig;
  polkadot: PolkadotService;
}

export async function getFee({
  transferConfig,
  polkadot,
}: GetFeeParams): Promise<AssetAmount> {
  // TODO: we have to consider correctly here when an asset is ERC20 to get it from contract
  const { amount, asset } = transferConfig.source.config.destinationFee;
  const chainAsset = transferConfig.destination.chain.getChainAsset(asset);

  if (Number.isFinite(amount)) {
    return chainAsset.toAssetAmount({
      amount: amount as number,
    });
  }

  const cfg = (amount as FeeConfigBuilder).build({
    api: polkadot.api,
    asset: chainAsset.getAssetId(),
  });

  return chainAsset.toAssetAmount({
    amount: await cfg.call(),
  });
}
