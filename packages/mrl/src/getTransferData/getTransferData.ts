import { AssetRoute } from '@moonbeam-network/xcm-config';
import {
  convertToChainDecimals,
  EvmService,
  getDestinationData,
  getMin,
  PolkadotService,
  Signers,
} from '@moonbeam-network/xcm-sdk';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import {
  AssetAmount,
  EvmChain,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import Big from 'big.js';
import { ContractConfig, ExtrinsicConfig } from '@moonbeam-network/xcm-builder';
import { TransferData } from '../mrl.interfaces';
import { getSourceData } from './getSourceData';
import { buildTransfer } from './getTransferData.utils';

export interface GetTransferDataParams {
  route: AssetRoute;
  sourceAddress: string;
  destinationAddress: string;
}

export async function getTransferData({
  route,
  sourceAddress,
  destinationAddress,
}: GetTransferDataParams): Promise<TransferData> {
  if (!route.mrl) {
    throw new Error(
      `MrlConfigBuilder is not defined for source chain ${route.source.chain.name} and asset ${route.asset.originSymbol}`,
    );
  }

  const destinationData = await getDestinationData({
    route,
    destinationAddress,
  });

  // Here we need to convert the fee on the destination chain to an asset on source chain.
  const destinationFee = convertToChainDecimals({
    asset: destinationData.fee,
    chain: route.source.chain,
  });

  const sourceData = await getSourceData({
    route,
    destinationAddress,
    destinationFee,
    sourceAddress,
  });

  return {
    destination: destinationData,
    getEstimate(amount: number | string) {
      const bigAmount = Big(
        toBigInt(amount, sourceData.balance.decimals).toString(),
      );
      const result = bigAmount.minus(
        sourceData.balance.isSame(destinationFee)
          ? destinationFee.toBig()
          : Big(0),
      );

      return sourceData.balance.copyWith({
        amount: result.lt(0) ? 0n : BigInt(result.toFixed()),
      });
    },
    max: sourceData.max,
    min: getMin(destinationData),
    source: sourceData,
    async transfer(
      amount,
      { evmSigner, polkadotSigner }: Partial<Signers>,
    ): Promise<string> {
      const source = route.source.chain;

      const bigintAmount = toBigInt(amount, sourceData.balance.decimals);
      const asset = AssetAmount.fromChainAsset(
        route.source.chain.getChainAsset(route.asset),
        { amount: bigintAmount },
      );

      const transfer = await buildTransfer({
        asset,
        destinationAddress,
        destinationFee,
        route,
        sourceAddress,
      });

      if (
        ContractConfig.is(transfer) &&
        (EvmChain.is(source) || EvmParachain.is(source))
      ) {
        if (!evmSigner) {
          throw new Error('EVM Signer must be provided');
        }

        const evm = EvmService.create(source);

        return evm.transfer(evmSigner, transfer);
      }

      if (ExtrinsicConfig.is(transfer) && EvmParachain.isAnyParachain(source)) {
        if (!polkadotSigner) {
          throw new Error('Polkadot signer must be provided');
        }

        const polkadot = await PolkadotService.create(source);

        return polkadot.transfer(sourceAddress, transfer, polkadotSigner);
      }

      // TODO: Wormhole transfer!

      throw new Error('Either contract or extrinsic must be provided');
    },
  };
}
