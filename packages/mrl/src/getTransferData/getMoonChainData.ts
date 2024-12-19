import { type MrlAssetRoute, getMoonChain } from '@moonbeam-network/xcm-config';
import { getBalance, getDestinationFee } from '@moonbeam-network/xcm-sdk';
import {
  type AnyChain,
  EvmParachain,
  Parachain,
} from '@moonbeam-network/xcm-types';
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
  const moonChainAddress = getMoonChainAddress({
    source: route.source.chain,
    destination: route.destination.chain,
    sourceAddress,
    destinationAddress,
  });

  const fee = await getDestinationFee({
    address: moonChainAddress,
    asset: route.source.asset,
    destination: moonChain,
    fee: route.mrl.moonChain.fee.amount,
    feeAsset: route.mrl.moonChain.fee.asset,
  });

  const balance = await getBalance({
    address: moonChainAddress,
    asset: moonChain.getChainAsset(route.mrl.moonChain.asset),
    builder: route.mrl.moonChain.balance,
    chain: moonChain,
  });

  const feeBalance = await getBalance({
    address: moonChainAddress,
    asset: moonChain.getChainAsset(route.mrl.moonChain.fee.asset),
    builder: route.mrl.moonChain.fee.balance,
    chain: moonChain,
  });

  return {
    address: moonChainAddress,
    balance,
    feeBalance,
    chain: moonChain,
    fee,
  };
}

interface GetMoonChainAddressParams {
  source: AnyChain;
  destination: AnyChain;
  sourceAddress: string;
  destinationAddress: string;
}

export function getMoonChainAddress({
  source,
  destination,
  sourceAddress,
  destinationAddress,
}: GetMoonChainAddressParams): string {
  const moonChain = getMoonChain(source);
  const isDestinationMoonChain = moonChain.isEqual(destination);
  const isSourceMoonChain = moonChain.isEqual(source);

  let moonChainAddress = isDestinationMoonChain
    ? destinationAddress
    : sourceAddress;

  // for Parachain to EVM transactions, we use the computed origin account in the moonchain
  if (Parachain.is(source) && !isSourceMoonChain) {
    const isSourceEvmSigner = EvmParachain.is(source) && source.isEvmSigner;

    const { address20: computedOriginAccount } =
      getMultilocationDerivedAddresses({
        address: isSourceEvmSigner
          ? evmToAddress(sourceAddress)
          : sourceAddress,
        paraId: source.parachainId,
        isParents: true,
      });

    moonChainAddress = computedOriginAccount;
  }

  return moonChainAddress;
}
