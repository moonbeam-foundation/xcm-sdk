import { AnyParachain } from '@moonbeam-network/xcm-types';
import { AssetRoute } from '@moonbeam-network/xcm-config';
import { PolkadotService } from '../polkadot';
import { DestinationChainTransferData } from '../sdk.interfaces';
import { getBalance, getDestinationFee, getMin } from './getTransferData.utils';

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
  });
  const min = await getMin({
    asset,
    builder: route.destination.min,
    chain: destination,
  });
  const fee = await getDestinationFee({
    asset: route.destination.fee.asset,
    chain: route.destination.chain,
    fee: route.destination.fee.amount,
  });

  return {
    balance,
    existentialDeposit: polkadot.existentialDeposit,
    fee,
    min,
  };
}
