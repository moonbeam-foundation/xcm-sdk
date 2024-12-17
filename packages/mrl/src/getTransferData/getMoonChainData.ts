import { type MrlAssetRoute, getMoonChain } from '@moonbeam-network/xcm-config';
import { getBalance, getDestinationFee } from '@moonbeam-network/xcm-sdk';
import { EvmChain, EvmParachain, Parachain } from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { evmToAddress } from '@polkadot/util-crypto';
import type { MoonChainTransferData } from '../mrl.interfaces';

interface GetMoonChainDataParams {
  route: MrlAssetRoute;
  sourceAddress: string;
  destinationAddress: string;
}

export async function getMoonChainData({
  route,
  sourceAddress,
  destinationAddress,
}: GetMoonChainDataParams): Promise<MoonChainTransferData> {
  if (!route.mrl) {
    throw new Error(
      `MRL config is not defined for source chain ${route.source.chain.name} and asset ${route.source.asset.originSymbol}`,
    );
  }

  const moonChain = getMoonChain(route.source.chain);
  const isDestinationMoonChain = moonChain.isEqual(route.destination.chain);
  let address = isDestinationMoonChain ? destinationAddress : sourceAddress;

  const fee = await getDestinationFee({
    address,
    asset: route.source.asset,
    destination: moonChain,
    fee: route.mrl.moonChain.fee.amount,
    feeAsset: route.mrl.moonChain.fee.asset,
  });

  if (
    Parachain.is(route.source.chain) &&
    !route.source.chain.isEqual(moonChain)
  ) {
    const addressToUse = EvmParachain.is(route.source.chain)
      ? evmToAddress(sourceAddress)
      : sourceAddress;
    const { address20 } = getMultilocationDerivedAddresses({
      address: addressToUse,
      paraId: route.source.chain.parachainId,
      isParents: true,
    });

    address = address20;
  }

  const balance = await getBalance({
    address,
    asset: moonChain.getChainAsset(route.mrl.moonChain.asset),
    builder: route.mrl.moonChain.balance,
    chain: moonChain,
  });

  const feeBalance = await getBalance({
    address,
    asset: moonChain.getChainAsset(route.mrl.moonChain.fee.asset),
    builder: route.mrl.moonChain.fee.balance,
    chain: moonChain,
  });

  return {
    address,
    balance,
    feeBalance,
    chain: moonChain,
    fee,
  };
}
