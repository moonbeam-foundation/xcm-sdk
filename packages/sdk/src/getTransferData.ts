/* eslint-disable @typescript-eslint/no-use-before-define */
import { TransferConfig } from '@moonbeam-network/xcm-config';
import { toBigInt } from '@moonbeam-network/xcm-utils';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import Big from 'big.js';
import { Signer as EthersSigner } from 'ethers';
import { getDestinationData } from './getDestinationData';
import { getSourceData } from './getSourceData';
import { PolkadotService } from './polkadot';
import { TransferData } from './sdk.interfaces';

export interface GetTransferDataParams {
  transferConfig: TransferConfig;
  destinationAddress: string;
  ethersSigner: EthersSigner;
  polkadotSigner: PolkadotSigner;
  sourceAddress: string;
}

export async function getTransferData({
  transferConfig,
  destinationAddress,
  ethersSigner,
  polkadotSigner,
  sourceAddress,
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
  const source = await getSourceData({
    destinationAddress,
    destinationFee: destination.fee,
    ethersSigner,
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
        source.balance.isSame(destination.fee)
          ? destination.fee.toBig()
          : Big(0),
      );

      return source.balance.copyWith({
        amount: result.lt(0) ? 0n : BigInt(result.toString()),
      });
    },
    /**
     * Right not it will be always true
     * because all current asset can be sent both directions
     * and our configuration need destination config.
     */
    isSwapPossible: true,
    max: source.max,
    min: destination.min,
    source,
    swap() {
      return getTransferData({
        destinationAddress: sourceAddress,
        ethersSigner,
        polkadotSigner,
        sourceAddress: destinationAddress,
        transferConfig: {
          ...transferConfig,
          destination: transferConfig.source,
          source: transferConfig.destination,
        },
      });
    },
    transfer(amount: number | string): Promise<string> {},
  };
}
