import type { AssetRoute } from '@moonbeam-network/xcm-config';
import {
  type AnyParachain,
  AssetAmount,
  type EvmParachain,
} from '@moonbeam-network/xcm-types';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import type { Signers, TransferData } from '../sdk.interfaces';
import { EvmService } from '../services/evm/EvmService';
import { PolkadotService } from '../services/polkadot';
import { getDestinationData } from './getDestinationData';
import { getSourceData } from './getSourceData';
import {
  convertToChainDecimals,
  getMin,
  validateSovereignAccountBalances,
} from './getTransferData.utils';

interface GetTransferDataParams {
  route: AssetRoute;
  sourceAddress: string;
  destinationAddress: string;
}

export async function getTransferData({
  route,
  sourceAddress,
  destinationAddress,
}: GetTransferDataParams): Promise<TransferData> {
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
      const source = route.source.chain as AnyParachain;
      const destination = route.destination.chain as AnyParachain;
      const bigintAmount = toBigInt(amount, sourceData.balance.decimals);
      validateSovereignAccountBalances({
        amount: bigintAmount,
        destinationData,
        sourceData,
      });
      const asset = AssetAmount.fromChainAsset(
        route.source.chain.getChainAsset(route.source.asset),
        { amount: bigintAmount },
      );
      const [sourcePolkadot, destinationPolkadot] =
        await PolkadotService.createMulti([source, destination]);

      const contract = route.contract?.build({
        asset,
        destination,
        destinationAddress,
        destinationApi: destinationPolkadot.api,
        fee: destinationFee,
        source,
        sourceAddress,
        sourceApi: sourcePolkadot.api,
      });
      const extrinsic = route.extrinsic?.build({
        asset,
        destination,
        destinationAddress,
        destinationApi: destinationPolkadot.api,
        fee: destinationFee,
        source,
        sourceAddress,
        sourceApi: sourcePolkadot.api,
      });

      if (contract) {
        if (!evmSigner) {
          throw new Error('EVM Signer must be provided');
        }

        const evm = EvmService.create(source as EvmParachain);

        return evm.transfer(evmSigner, contract);
      }

      if (extrinsic) {
        if (!polkadotSigner) {
          throw new Error('Polkadot signer must be provided');
        }

        return sourcePolkadot.transfer(
          sourceAddress,
          extrinsic,
          polkadotSigner,
        );
      }

      throw new Error('Either contract or extrinsic must be provided');
    },
  };
}
