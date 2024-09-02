import { AssetRoute } from '@moonbeam-network/xcm-config';
import {
  convertToChainDecimals,
  getDestinationData,
  Signers,
} from '@moonbeam-network/xcm-sdk';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import Big from 'big.js';
import { TransferData } from '../mrl.interfaces';

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
      const destination = route.destination.chain;
      const bigintAmount = toBigInt(amount, sourceData.balance.decimals);
      const asset = AssetAmount.fromChainAsset(
        route.source.chain.getChainAsset(route.asset),
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

        return (
          createContract(source, contract) as TransferContractInterface
        ).transfer(evmSigner);
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
