/* eslint-disable @typescript-eslint/no-use-before-define */
import { FeeConfigBuilder } from '@moonbeam-network/xcm-builder';
import { AnyParachain, AssetAmount } from '@moonbeam-network/xcm-types';
import { AssetRoute } from '@moonbeam-network/xcm-config';
import { PolkadotService } from '../polkadot';
import { DestinationChainTransferData } from '../sdk.interfaces';
import { getBalance, getMin } from './getTransferData.utils';

export interface GetDestinationDataParams {
  route: AssetRoute;
  destinationAddress: string;
}

export async function getDestinationData({
  route,
  destinationAddress,
}: GetDestinationDataParams): Promise<DestinationChainTransferData> {
  const destination = route.destination.chain as AnyParachain;
  const polkadot = await PolkadotService.create(destination);
  const asset = route.destination.chain.getChainAsset(route.asset);
  const balance = await getBalance({
    address: destinationAddress,
    asset,
    builder: route.destination.balance,
    chain: destination,
    polkadot,
  });
  const min = await getMin(route, polkadot);
  const fee = await getFee({
    route,
    polkadot,
  });

  return {
    balance,
    existentialDeposit: polkadot.existentialDeposit,
    fee,
    min,
  };
}

export interface GetFeeParams {
  route: AssetRoute;
  polkadot: PolkadotService;
}

export async function getFee({
  route,
  polkadot,
}: GetFeeParams): Promise<AssetAmount> {
  // TODO: we have to consider correctly here when an asset is ERC20 to get it from contract
  const { amount, asset: feeAsset } = route.destination.fee;
  const asset = AssetAmount.fromChainAsset(
    route.destination.chain.getChainAsset(feeAsset),
    {
      amount: 0n,
    },
  );

  if (Number.isFinite(amount)) {
    return asset.copyWith({
      amount: amount as number,
    });
  }

  const cfg = (amount as FeeConfigBuilder).build({
    api: polkadot.api,
    asset: asset.getAssetId(),
  });

  return asset.copyWith({
    amount: await cfg.call(),
  });
}
