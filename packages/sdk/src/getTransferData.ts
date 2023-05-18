/* eslint-disable @typescript-eslint/no-use-before-define */
import { TransferConfig } from '@moonbeam-network/xcm-config';
import type { Signer as PolkadotSigner } from '@polkadot/api/types';
import { Signer as EthersSigner } from 'ethers';
import { getSourceData } from './getSourceData';
import { PolkadotService } from './polkadot';
import { TransferData } from './sdk.interfaces';

export interface GetTransferDataParams {
  config: TransferConfig;
  destinationAddress: string;
  ethersSigner: EthersSigner;
  polkadotSigner: PolkadotSigner;
  sourceAddress: string;
}

export async function getTransferData({
  config,
  destinationAddress,
  ethersSigner,
  polkadotSigner,
  sourceAddress,
}: GetTransferDataParams): Promise<TransferData> {
  const [destPolkadot, srcPolkadot] = await PolkadotService.createMulti([
    config.destination.chain.ws,
    config.source.chain.ws,
  ]);

  const source = await getSourceData({
    config,
    destinationAddress,
    destinationFee,
    ethersSigner,
    polkadot: srcPolkadot,
    sourceAddress,
  });

  return {
    // destination: {} as any,
    // getEstimate(amount: number | string) {
    //   amount;
    //   return {} as any;
    // },
    // isSwapPossible: true,
    // source,
    // swap() {
    //   return {} as any;
    // },
    // transfer(amount: number | string) {
    //   amount;
    //   return '' as any;
    // },
  } as any;
}
