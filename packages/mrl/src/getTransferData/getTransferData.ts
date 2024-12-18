import {
  ContractConfig,
  ExtrinsicConfig,
  WormholeConfig,
} from '@moonbeam-network/xcm-builder';
import type { MrlAssetRoute } from '@moonbeam-network/xcm-config';
import {
  EvmService,
  PolkadotService,
  type Signers,
  convertToChainDecimals,
  getDestinationData,
} from '@moonbeam-network/xcm-sdk';
import {
  AssetAmount,
  EvmChain,
  EvmParachain,
} from '@moonbeam-network/xcm-types';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import type { TransferData } from '../mrl.interfaces';
import { WormholeService } from '../services/wormhole';
import { getMoonChainData } from './getMoonChainData';
import { getSourceData } from './getSourceData';
import {
  buildTransfer,
  getMoonChainFeeValueOnSource,
  getMrlMin,
} from './getTransferData.utils';

interface GetTransferDataParams {
  route: MrlAssetRoute;
  sourceAddress: string;
  destinationAddress: string;
  isAutomatic: boolean;
}

export async function getTransferData({
  route,
  sourceAddress,
  destinationAddress,
  isAutomatic,
}: GetTransferDataParams): Promise<TransferData> {
  if (!route.mrl) {
    throw new Error(
      `MrlConfigBuilder is not defined for source chain ${route.source.chain.name} and asset ${route.source.asset.originSymbol}`,
    );
  }

  const destinationData = await getDestinationData({
    route,
    destinationAddress,
  });

  // NOTE: Here we need to convert the fee on the destination chain
  // to an asset on source chain.
  const destinationFee = convertToChainDecimals({
    asset: destinationData.fee,
    target: route.getDestinationFeeAssetOnSource(),
  });

  const sourceData = await getSourceData({
    isAutomatic: route.mrl.isAutomaticPossible && isAutomatic,
    route,
    destinationAddress,
    destinationFee,
    sourceAddress,
  });

  const moonChainData = await getMoonChainData({
    route,
    sourceAddress,
    destinationAddress,
  });

  return {
    destination: destinationData,
    getEstimate(amount: number | string) {
      const isSameAssetPayingDestinationFee =
        sourceData.balance.isSame(destinationFee);
      const bigAmount = Big(
        toBigInt(amount, sourceData.balance.decimals).toString(),
      );
      const fee = getMoonChainFeeValueOnSource({
        destinationData,
        moonChainData,
        sourceData,
      });
      const result = bigAmount
        .minus(
          isSameAssetPayingDestinationFee ? destinationFee.toBig() : Big(0),
        )
        .minus(fee)
        .minus(sourceData.relayerFee?.toBig() || Big(0));

      return sourceData.balance.copyWith({
        amount: result.lt(0) ? 0n : BigInt(result.toFixed()),
      });
    },
    isAutomaticPossible: route.mrl.isAutomaticPossible,
    max: sourceData.max,
    min: getMrlMin({
      destinationData,
      moonChainData,
      sourceData,
    }),
    moonChain: moonChainData,
    source: sourceData,
    async transfer(
      amount,
      isAutomatic,
      { evmSigner, polkadotSigner }: Partial<Signers>,
      statusCallback,
      sendOnlyRemoteExecution,
    ): Promise<string[]> {
      const source = route.source.chain;

      const bigintAmount = toBigInt(amount, sourceData.balance.decimals);
      const asset = AssetAmount.fromChainAsset(
        route.source.chain.getChainAsset(route.source.asset),
        { amount: bigintAmount },
      );
      const feeAsset = AssetAmount.fromChainAsset(
        route.source.chain.getChainAsset(
          route.source.fee?.asset || route.source.asset,
        ),
        { amount: sourceData.fee.amount },
      );
      const transfer = await buildTransfer({
        asset,
        destinationAddress,
        feeAsset,
        isAutomatic,
        route,
        sendOnlyRemoteExecution,
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
        const hash = await evm.transfer(evmSigner, transfer);

        return [hash];
      }

      if (ExtrinsicConfig.is(transfer) && EvmParachain.isAnyParachain(source)) {
        if (!polkadotSigner) {
          throw new Error('Polkadot signer must be provided');
        }

        const polkadot = await PolkadotService.create(source);
        const hash = await polkadot.transfer(
          sourceAddress,
          transfer,
          polkadotSigner,
          statusCallback,
        );

        return [hash];
      }

      if (
        WormholeConfig.is(transfer) &&
        (EvmChain.is(source) || EvmParachain.is(source))
      ) {
        if (!evmSigner) {
          throw new Error('EVM Signer must be provided');
        }

        const wh = WormholeService.create(source);

        return wh.transfer(evmSigner, transfer);
      }

      throw new Error('Either contract or extrinsic must be provided');
    },
  };
}
