/* eslint-disable @typescript-eslint/no-use-before-define */
import { IConfigService, TransferConfig } from '@moonbeam-network/xcm-config';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import { TransferContractInterface, createContract } from '../contract';
import { PolkadotService } from '../polkadot';
import {
  DestinationChainTransferData,
  Signers,
  TransferData,
} from '../sdk.interfaces';
import { getDestinationData } from './getDestinationData';
import { getSourceData } from './getSourceData';

export interface GetTransferDataParams extends Partial<Signers> {
  configService: IConfigService;
  destinationAddress: string;
  sourceAddress: string;
  transferConfig: TransferConfig;
}

export async function getTransferData({
  configService,
  destinationAddress,
  evmSigner,
  polkadotSigner,
  sourceAddress,
  transferConfig,
}: GetTransferDataParams): Promise<TransferData> {
  const [destPolkadot, srcPolkadot] = await PolkadotService.createMulti([
    transferConfig.destination.chain,
    transferConfig.source.chain,
  ]);

  const destination = await getDestinationData({
    destinationAddress,
    polkadot: destPolkadot,
    transferConfig,
  });

  // Here we need to convert the fee on the destination chain to an asset on source chain.
  const destinationFeeAsset = transferConfig.source.chain.getChainAsset(
    destination.fee,
  );
  const destinationFee = AssetAmount.fromChainAsset(destinationFeeAsset, {
    amount: destination.fee.convertDecimals(destinationFeeAsset.decimals)
      .amount,
  });

  const source = await getSourceData({
    destinationAddress,
    destinationFee,
    polkadot: srcPolkadot,
    sourceAddress,
    transferConfig,
  });

  return {
    destination,
    getEstimate(amount: number | string) {
      const bigAmount = Big(
        toBigInt(amount, source.balance.decimals).toString(),
      );
      const result = bigAmount.minus(
        source.balance.isSame(destinationFee) ? destinationFee.toBig() : Big(0),
      );

      return source.balance.copyWith({
        amount: result.lt(0) ? 0n : BigInt(result.toFixed()),
      });
    },
    /**
     * Right now it will be always true
     * because all current asset can be sent both directions
     * and our configuration need destination config.
     */
    isSwapPossible: true,
    max: source.max,
    min: getMin(destination),
    source,
    async swap() {
      return getTransferData({
        configService,
        destinationAddress: sourceAddress,
        evmSigner,
        polkadotSigner,
        sourceAddress: destinationAddress,
        transferConfig: {
          ...transferConfig,
          destination: transferConfig.source,
          source: transferConfig.destination,
        },
      });
    },
    async transfer(amount, signers: Partial<Signers>): Promise<string> {
      const bigintAmount = toBigInt(amount, source.balance.decimals);
      const {
        source: { chain, config },
      } = transferConfig;
      const asset = chain.getChainAsset(transferConfig.asset);
      const feeAsset = chain.getChainAsset(destinationFee.key);

      const contract = config.contract?.build({
        address: destinationAddress,
        amount: bigintAmount,
        asset: asset.address || asset.getAssetId(),
        destination: destination.chain,
        fee: destinationFee.amount,
        feeAsset: feeAsset.address || feeAsset.getAssetId(),
      });
      const extrinsic = config.extrinsic?.build({
        address: destinationAddress,
        amount: bigintAmount,
        asset: asset.getAssetId(),
        destination: destination.chain,
        fee: destinationFee.amount,
        feeAsset: feeAsset.getAssetId(),
        palletInstance: asset.getAssetPalletInstance(),
        source: chain,
      });

      if (contract) {
        const signer = evmSigner || signers.evmSigner;

        if (!signer) {
          throw new Error('EVM Signer must be provided');
        }

        return (
          createContract(chain, contract) as TransferContractInterface
        ).transfer(signer);
      }

      if (extrinsic) {
        const signer = polkadotSigner || signers.polkadotSigner;

        if (!signer) {
          throw new Error('Polkadot signer must be provided');
        }

        return srcPolkadot.transfer(sourceAddress, extrinsic, signer);
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
