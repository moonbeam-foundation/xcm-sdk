import type { MrlAssetRoute } from '@moonbeam-network/xcm-config';
import { getBalance, getDestinationFee } from '@moonbeam-network/xcm-sdk';
import { EvmParachain, Parachain } from '@moonbeam-network/xcm-types';
import { getMultilocationDerivedAddresses } from '@moonbeam-network/xcm-utils';
import { evmToAddress } from '@polkadot/util-crypto';
import type { BridgeChainTransferData } from '../mrl.interfaces';

interface GetBridgeChainDataParams {
  route: MrlAssetRoute;
  sourceAddress: string;
  destinationAddress: string;
}

export async function getBridgeChainData({
  route,
  sourceAddress,
  destinationAddress,
}: GetBridgeChainDataParams): Promise<BridgeChainTransferData> {
  if (!route.mrl) {
    throw new Error(
      `MRL config is not defined for source chain ${route.source.chain.name} and asset ${route.source.asset.originSymbol}`,
    );
  }

  const bridgeChain = route.mrl.bridgeChain.chain;
  const bridgeChainAddress = getBridgeChainAddress({
    route,
    sourceAddress,
    destinationAddress,
  });

  const fee = await getDestinationFee({
    address: bridgeChainAddress,
    asset: route.source.asset,
    destination: bridgeChain,
    fee: route.mrl.bridgeChain.fee.amount,
    feeAsset: route.mrl.bridgeChain.fee.asset,
    source: route.source.chain,
  });

  const balance = await getBalance({
    address: bridgeChainAddress,
    asset: bridgeChain.getChainAsset(route.mrl.bridgeChain.asset),
    builder: route.mrl.bridgeChain.balance,
    chain: bridgeChain,
  });

  const feeBalance = await getBalance({
    address: bridgeChainAddress,
    asset: bridgeChain.getChainAsset(route.mrl.bridgeChain.fee.asset),
    builder: route.mrl.bridgeChain.fee.balance,
    chain: bridgeChain,
  });

  return {
    address: bridgeChainAddress,
    balance,
    feeBalance,
    chain: bridgeChain,
    fee,
  };
}

interface GetBridgeChainAddressParams {
  route: MrlAssetRoute;
  sourceAddress: string;
  destinationAddress: string;
}

export function getBridgeChainAddress({
  route,
  sourceAddress,
  destinationAddress,
}: GetBridgeChainAddressParams): string {
  const source = route.source.chain;
  const destination = route.destination.chain;
  const bridgeChain = route.mrl.bridgeChain.chain;
  const isDestinationBridgeChain = bridgeChain.isEqual(destination);
  const isSourceBridgeChain = bridgeChain.isEqual(source);

  let bridgeChainAddress = isDestinationBridgeChain
    ? destinationAddress
    : sourceAddress;

  // for Parachain to EVM transactions, we use the computed origin account in the bridgeChain
  if (Parachain.is(source) && !isSourceBridgeChain) {
    const isSourceEvmSigner = EvmParachain.is(source) && source.isEvmSigner;

    const { address20: computedOriginAccount } =
      getMultilocationDerivedAddresses({
        address: isSourceEvmSigner
          ? evmToAddress(sourceAddress)
          : sourceAddress,
        paraId: source.parachainId,
        parents: 1,
      });

    bridgeChainAddress = computedOriginAccount;
  }

  return bridgeChainAddress;
}
