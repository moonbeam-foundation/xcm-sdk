/* eslint-disable @typescript-eslint/no-use-before-define */
import { AssetRoute } from '@moonbeam-network/xcm-config';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import { AnyParachain, AssetAmount } from '@moonbeam-network/xcm-types';
import { TransferContractInterface, createContract } from '../contract';
import {
  DestinationChainTransferData,
  Signers,
  TransferData,
} from '../sdk.interfaces';
import { getDestinationData } from './getDestinationData';
import { getSourceData } from './getSourceData';
import { PolkadotService } from '../polkadot';

export interface GetTransferDataParams {
  route: AssetRoute;
  source: AnyParachain;
  sourceAddress: string;
  destinationAddress: string;
}

export async function getTransferData({
  route,
  source,
  sourceAddress,
  destinationAddress,
}: GetTransferDataParams): Promise<TransferData> {
  const destinationData = await getDestinationData({
    route,
    destinationAddress,
  });

  // Here we need to convert the fee on the destination chain to an asset on source chain.
  const destinationFeeAsset = source.getChainAsset(destinationData.fee);
  const destinationFee = AssetAmount.fromChainAsset(destinationFeeAsset, {
    amount: destinationData.fee.convertDecimals(destinationFeeAsset.decimals)
      .amount,
  });

  const sourceData = await getSourceData({
    route,
    destinationAddress,
    destinationFee,
    source,
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
    /**
     * Right now it will be always true
     * because all current asset can be sent both directions
     * and our configuration need destination config.
     */
    isSwapPossible: true,
    max: sourceData.max,
    min: getMin(destinationData),
    source: sourceData,
    async transfer(
      amount,
      { evmSigner, polkadotSigner }: Partial<Signers>,
    ): Promise<string> {
      const bigintAmount = toBigInt(amount, sourceData.balance.decimals);
      const asset = source.getChainAsset(route.asset);
      const feeAsset = source.getChainAsset(destinationFee);

      const contract = route.contract?.build({
        address: destinationAddress,
        amount: bigintAmount,
        asset: asset.address || asset.getAssetId(),
        destination: route.destination as AnyParachain,
        fee: destinationFee.amount,
        feeAsset: feeAsset.address || feeAsset.getAssetId(),
      });
      const extrinsic = route.extrinsic?.build({
        address: destinationAddress,
        amount: bigintAmount,
        asset: asset.getAssetId(),
        destination: route.destination as AnyParachain,
        fee: destinationFee.amount,
        feeAsset: feeAsset.getAssetId(),
        palletInstance: asset.getAssetPalletInstance(),
        source,
      });

      if (contract) {
        if (!evmSigner) {
          throw new Error('EVM Signer must be provided');
        }

        return (
          createContract(source, contract) as TransferContractInterface
        ).transfer(evmSigner);
      }

      if (extrinsic) {
        if (!polkadotSigner) {
          throw new Error('Polkadot signer must be provided');
        }

        const polkadot = await PolkadotService.create(source);

        return polkadot.transfer(sourceAddress, extrinsic, polkadotSigner);
      }

      throw new Error('Either contract or extrinsic must be provided');
    },
  };
}

function getMin({
  balance,
  existentialDeposit,
  fee,
  min,
}: DestinationChainTransferData) {
  const result = Big(0)
    .plus(balance.isSame(fee) ? fee.toBig() : Big(0))
    .plus(
      balance.isSame(existentialDeposit) &&
        balance.toBig().lt(existentialDeposit.toBig())
        ? existentialDeposit.toBig()
        : Big(0),
    )
    .plus(balance.toBig().lt(min.toBig()) ? min.toBig() : Big(0));

  return balance.copyWith({
    amount: BigInt(result.toFixed()),
  });
}
