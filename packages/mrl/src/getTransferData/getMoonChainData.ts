import { type MrlAssetRoute, getMoonChain } from '@moonbeam-network/xcm-config';
import { getBalance, getDestinationFee } from '@moonbeam-network/xcm-sdk';
import { Parachain } from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import type {
  DestinationTransferData,
  MoonChainTransferData,
} from '../mrl.interfaces';

interface GetMoonChainDataParams {
  destinationData: DestinationTransferData;
  route: MrlAssetRoute;
  sourceAddress: string;
}

export async function getMoonChainData({
  destinationData,
  route,
  sourceAddress,
}: GetMoonChainDataParams): Promise<MoonChainTransferData> {
  if (!route.mrl) {
    throw new Error(
      `MRL config is not defined for source chain ${route.source.chain.name} and asset ${route.source.asset.originSymbol}`,
    );
  }

  const moonChain = getMoonChain(route.source.chain);
  // TODO is this used for something? do we need the balance?
  // const asset = moonChain.getChainAsset(route.mrl.moonChain.asset);
  // const isDestinationMoonChain = route.destination.chain.isEqual(moonChain);

  // TODO technically not correct
  // if (isDestinationMoonChain) {
  //   return {
  //     balance: destinationData.balance,
  //     chain: destinationData.chain,
  //     fee: destinationData.fee,
  //   };
  // }

  const fee = await getDestinationFee({
    address: sourceAddress, // TODO not correct
    asset: route.source.asset,
    destination: moonChain,
    fee: route.mrl.moonChain.fee.amount,
    feeAsset: route.mrl.moonChain.fee.asset,
  });

  let address = sourceAddress;

  if (Parachain.is(route.source.chain)) {
    const { address20 } = getMultilocationDerivedAddresses({
      address: sourceAddress,
      paraId: route.source.chain.parachainId,
      isParents: true,
    });

    address = address20;
  }

  const feeBalance = await getBalance({
    address,
    asset: moonChain.getChainAsset(route.mrl.moonChain.fee.asset),
    builder: route.mrl.moonChain.fee.balance,
    chain: moonChain,
  });

  return {
    // TODO technically feeBalance
    balance: feeBalance,
    chain: moonChain,
    fee,
  };
}
