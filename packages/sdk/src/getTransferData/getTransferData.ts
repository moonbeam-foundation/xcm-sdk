/* eslint-disable @typescript-eslint/no-use-before-define */
import { IConfigService, TransferConfig } from '@moonbeam-network/xcm-config';
import { AssetAmount } from '@moonbeam-network/xcm-types';
import { convertDecimals, toBigInt } from '@moonbeam-network/xcm-utils';
import Big from 'big.js';
import { TransactionResponse } from 'ethers';
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
  const [destPolkadot, srcPolkadot] = await PolkadotService.createMulti(
    [transferConfig.destination.chain, transferConfig.source.chain],
    configService,
  );

  const destination = await getDestinationData({
    destinationAddress,
    polkadot: destPolkadot,
    transferConfig,
  });

  const destinationFee = await getDestinationFeeWithSourceDecimals(
    srcPolkadot,
    destination.fee,
  );

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
    async transfer(amount): Promise<string> {
      const bigintAmount = toBigInt(amount, source.balance.decimals);
      const {
        asset,
        source: { chain, config },
      } = transferConfig;

      const contract = config.contract?.build({
        address: destinationAddress,
        amount: bigintAmount,
        asset: chain.getAssetId(asset),
        destination: destination.chain,
        fee: destinationFee.amount,
        feeAsset: chain.getAssetId(destinationFee),
      });
      const extrinsic = config.extrinsic?.build({
        address: destinationAddress,
        amount: bigintAmount,
        asset: chain.getAssetId(asset),
        destination: destination.chain,
        fee: destinationFee.amount,
        feeAsset: chain.getAssetId(destinationFee),
        palletInstance: chain.getAssetPalletInstance(asset),
        source: chain,
      });

      if (contract) {
        if (!evmSigner) {
          throw new Error('EVM Signer must be provided');
        }

        return (
          createContract(
            contract,
            evmSigner,
            chain,
          ) as TransferContractInterface
        )
          .transfer()
          .then((tx) =>
            typeof tx === 'object' ? (tx as TransactionResponse).hash : tx,
          );
      }

      if (extrinsic) {
        if (!polkadotSigner) {
          throw new Error('Polkadot signer must be provided');
        }

        return srcPolkadot.transfer(sourceAddress, extrinsic, polkadotSigner);
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

export async function getDestinationFeeWithSourceDecimals(
  sourcePolkadot: PolkadotService,
  destinationFee: AssetAmount,
): Promise<AssetAmount> {
  const destinationFeeDecimals =
    await sourcePolkadot.getAssetDecimals(destinationFee);
  const destinationFeeAsset =
    destinationFee.decimals === destinationFeeDecimals
      ? destinationFee
      : destinationFee.copyWith({
          amount: convertDecimals(
            destinationFee.amount,
            destinationFee.decimals,
            destinationFeeDecimals,
          ),
          decimals: destinationFeeDecimals,
        });

  return destinationFeeAsset;
}
